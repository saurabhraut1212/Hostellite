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
import HosteliteFormPart1 from '../components/Hostelitepart1';
import HosteliteFormPart2 from '../components/Hostelitepart2';

const HostelitePage = () => {
	const firebase = useContext(FirebaseContext);
	const router = useRouter();

	const [status, setStatus] = useState('idle'); // idle, pending, success, error
	const [currentPart, setCurrentPart] = useState(1);

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

	const handleNext = () => {
		setCurrentPart(currentPart + 1);
	};

	const handlePrevious = () => {
		setCurrentPart(currentPart - 1);
	};
	return (
		<Container>
			<form onSubmit={handleSubmit}>
				{currentPart === 1 ? (
					<HosteliteFormPart1
						data={data}
						onChangeInput={onChangeInput}
						onNext={handleNext}
					/>
				) : (
					<HosteliteFormPart2
						data={data}
						onPrevious={handlePrevious}
						onChangeInput={onChangeInput}
						onSubmit={handleSubmit}
					/>
				)}
			</form>
		</Container>
	);
};

export default HostelitePage;
