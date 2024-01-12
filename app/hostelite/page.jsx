'use client';

import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
	Select,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../context/firebase';
import { useRouter } from 'next/navigation';

const HostelitePage = () => {
	const firebase = useContext(FirebaseContext);
	const router = useRouter();

	const [status, setStatus] = useState('idle'); // idle, pending, success, error

	const [data, setData] = useState({
		name: '',
		age: '',
		pcontact: '',
		econtact: '',
		hno: '',
		locality: '',
		city: '',
		state: '',
		email: '',
		dtype: '',
		dno: '',
		status: 'live',
	});

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const result = await firebase.addBooking(
				data.name,
				data.age,
				data.pcontact,
				data.econtact,
				data.hno,
				data.locality,
				data.city,
				data.state,
				data.email,
				data.dtype,
				data.dno,
				data.status
			);
			console.log(result, 'This is data');

			updateStatus('success');

			router.push(`/addAllotment/${result.id}`);
		} catch (error) {
			updateStatus('error');
			throw new Error('Error in adding the booking');
		}
	};

	const updateStatus = (newStatus) => {
		setStatus(newStatus);
	};
	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel>Name</FormLabel>
					<Input
						type="text"
						placeholder="name"
						name="name"
						onChange={onChangeInput}
						value={data.name}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Age</FormLabel>
					<Input
						type="number"
						placeholder="age"
						name="age"
						onChange={onChangeInput}
						value={data.age}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Contact Numbers</FormLabel>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Personal Contact</FormLabel>
					<Input
						type="tel"
						name="pcontact"
						placeholder="Phone number"
						onChange={onChangeInput}
						value={data.pcontact}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Emergency Contact</FormLabel>
					<Input
						type="tel"
						name="econtact"
						placeholder="Emergency number"
						onChange={onChangeInput}
						value={data.econtact}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Address</FormLabel>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>House Number</FormLabel>
					<Input
						type="number"
						name="hno"
						placeholder="House Number"
						onChange={onChangeInput}
						value={data.hno}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Locality</FormLabel>
					<Input
						type="text"
						name="locality"
						placeholder="Locality"
						onChange={onChangeInput}
						value={data.locality}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>City</FormLabel>
					<Input
						type="text"
						name="city"
						placeholder="city"
						onChange={onChangeInput}
						value={data.city}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>State</FormLabel>
					<Input
						type="text"
						name="state"
						placeholder="State"
						onChange={onChangeInput}
						value={data.state}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						name="email"
						placeholder="Email"
						onChange={onChangeInput}
						value={data.email}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Select Document Type</FormLabel>
					<Select
						placeholder="Select document"
						name="dtype"
						value={data.dtype}
						onChange={onChangeInput}
					>
						<option>Adhaar Card</option>
						<option>Driving Licence</option>
						<option>College Id</option>
					</Select>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Document Number</FormLabel>
					<Input
						type="number"
						name="dno"
						placeholder="Document Number"
						onChange={onChangeInput}
						value={data.dno}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Select Status</FormLabel>
					<Select
						placeholder="Select status"
						name="status"
						value={data.status}
						onChange={onChangeInput}
					>
						<option value="live">Live</option>
						<option value="left">Left</option>
						<option value="leftwithoutpaying">Left Without Paying</option>
					</Select>
				</FormControl>
				<Button type="submit">Submit</Button>
			</form>
		</Container>
	);
};

export default HostelitePage;
