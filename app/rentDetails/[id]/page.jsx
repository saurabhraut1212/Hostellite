'use client';

import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Select,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../context/firebase';
import { useRouter } from 'next/navigation';

const RentDetails = ({ params }) => {
	const router = useRouter();
	const firebase = useContext(FirebaseContext);

	const { id } = params;
	const allotmentId = id;
	const [name, setName] = useState('');
	const [bed, setBed] = useState('');
	const [startdate, setStartDate] = useState('');
	const [duedate, setDuedate] = useState('');
	const [sid, setSId] = useState('');

	const [data, setData] = useState({
		advancedeposit: '',
		mrate: '',
		miscellaneous: '',
		remark: '',
		bookingAmount: '',
	});

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			if (allotmentId) {
				try {
					const allotmentResult = await firebase.getAllotment(allotmentId);
					const obtainedUserId = allotmentResult.userId;
					const userResult = await firebase.getBookingDoc(obtainedUserId);

					setName(userResult.name);
					setBed(allotmentResult.bed);
					setDuedate(allotmentResult.endDate);
					setSId(allotmentResult.userId);
					setStartDate(allotmentResult.startDate);
				} catch (error) {
					console.error('Error fetching allotment data:', error);
				}
			} else {
				console.log('Not getting allotment id');
			}
		};

		fetchData();
	}, [allotmentId, firebase]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await firebase.addRentDetails(
				name,
				sid,
				bed,
				data.advancedeposit,
				startdate,
				duedate,
				data.mrate,
				data.miscellaneous,
				data.remark,
				data.bookingAmount
			);
			router.push('/');
		} catch (error) {
			throw new Error('Error in adding rent details');
		}
	};
	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel>Name</FormLabel>
					<Input type="text" name="name" value={name} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>ID</FormLabel>
					<Input type="text" name="id" value={sid} />
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Bed</FormLabel>
					<Input type="text" name="bed" value={bed} />
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Advance Deposit</FormLabel>
					<Input
						type="number"
						placeholder="Deposit"
						name="advancedeposit"
						onChange={onInputChange}
						value={data.advancedeposit}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Start Date</FormLabel>
					<Input
						type="date"
						name="startdate"
						placeholder="Start date"
						value={startdate}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Due Date</FormLabel>
					<Input
						type="date"
						name="duedate"
						placeholder="Due date"
						value={duedate}
					/>
				</FormControl>

				<FormControl isRequired>
					<FormLabel>Monthly rent to charge</FormLabel>
					<Input
						type="number"
						name="mrate"
						placeholder="Monthly rent"
						onChange={onInputChange}
						value={data.mrate}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Miscellaneous</FormLabel>
					<Input
						type="number"
						name="miscellaneous"
						placeholder="Miscellaneous"
						onChange={onInputChange}
						value={data.miscellaneous}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Remark</FormLabel>
					<Input
						type="text"
						name="remark"
						placeholder="Add Remark"
						onChange={onInputChange}
						value={data.remark}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Booking Paid Amount</FormLabel>
					<Input
						type="number"
						name="bookingAmount"
						placeholder="Booking Amount"
						onChange={onInputChange}
						value={data.bookingAmount}
					/>
				</FormControl>

				<Button type="submit">Submit</Button>
			</form>
		</Container>
	);
};

export default RentDetails;
