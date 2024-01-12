'use client';
import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Select,
} from '@chakra-ui/react';
import { FirebaseContext } from '../../context/firebase';
import { useContext, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { hostelBedData } from '../../data';

const AddAllotment = ({ params }) => {
	const firebase = useContext(FirebaseContext);

	const { id } = params;
	const userId = id;
	const router = useRouter();

	const [data, setData] = useState({
		bed: '',
		startDate: '',
		endDate: '',
		deposit: '',
		depositMethod: '',
	});

	const [selectedBeds, setSelectedBeds] = useState([]);
	const [filteredBeds, setFilteredBeds] = useState([]);
	const [availableBeds, setAvailableBeds] = useState([]);

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		const savedBeds = JSON.parse(localStorage.getItem('selectedBeds')) || [];
		setSelectedBeds(savedBeds);
	}, []);

	useEffect(() => {
		filterBeds();
	}, [data.bed, selectedBeds]);

	const filterBeds = () => {
		const allBeds = hostelBedData.flatMap((floorData) =>
			floorData.bed_nos.map((bedData) => ({
				key: `${floorData.floor}-${floorData.room}-${bedData}`,
				label: `${floorData.floor}-floor-${floorData.room}-${bedData}`,
			}))
		);

		if (!data.bed) {
			const filteredBeds = allBeds.filter(
				(bedOption) => !selectedBeds.includes(bedOption.key)
			);
			setAvailableBeds(filteredBeds);
		} else {
			const [floor, str, room, bed] = data.bed.split('-');
			const filteredBeds = allBeds.filter(
				(bedOption) =>
					bedOption.label.includes(`${floor}-floor-${room}-`) &&
					!selectedBeds.includes(bedOption.key)
			);
			setAvailableBeds(filteredBeds);
		}
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const result = await firebase.addAllotment(
				userId,
				data.bed,
				data.startDate,
				data.endDate,
				data.deposit,
				data.depositMethod
			);

			const updatedSelectedBeds = [...selectedBeds, data.bed];
			setSelectedBeds(updatedSelectedBeds);
			localStorage.setItem('selectedBeds', JSON.stringify(updatedSelectedBeds));

			setAvailableBeds((prevBeds) =>
				prevBeds.filter((bedOption) => bedOption.key !== data.bed)
			);

			router.push(`/rentDetails/${result.id}`);
		} catch (error) {
			console.log(error, 'This is error');
		}
	};

	return (
		<Container>
			<form onSubmit={submitHandler}>
				<FormControl>
					<FormLabel>UserId</FormLabel>
					<Input type="text" name="userId" value={userId} />
				</FormControl>
				<FormControl>
					<FormLabel>Select Bed</FormLabel>
					<Select
						placeholder="Select Bed No"
						name="bed"
						onChange={onInputChange}
						value={data.bed}
					>
						{availableBeds.map((bedOption) => (
							<option key={bedOption.key}>{bedOption.label}</option>
						))}
					</Select>
				</FormControl>
				<FormControl>
					<FormLabel>Start Date</FormLabel>
					<Input
						type="date"
						name="startDate"
						onChange={onInputChange}
						value={data.startDate}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>End Date</FormLabel>
					<Input
						type="date"
						name="endDate"
						onChange={onInputChange}
						value={data.endDate}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Deposit</FormLabel>
					<Input
						type="number"
						name="deposit"
						onChange={onInputChange}
						value={data.deposit}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Payment method</FormLabel>
					<Select
						placeholder="Select"
						name="depositMethod"
						onChange={onInputChange}
						value={data.depositMethod}
					>
						<option>Credit Card</option>
						<option>Debit Card</option>
						<option>UPI</option>
						<option>Cash</option>
					</Select>
				</FormControl>

				<Button type="submit">Submit</Button>
			</form>
		</Container>
	);
};

export default AddAllotment;
