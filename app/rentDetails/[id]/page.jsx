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
import Rentdetailspart1 from '../../components/RentDetailspart1';
import Rentdetailspart2 from '../../components/Rentdetailspart2';

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

	const [currentPage, setCurrentPage] = useState(1);

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

	const onNext = () => {
		setCurrentPage(currentPage + 1);
	};

	const onPrevious = () => {
		setCurrentPage(currentPage - 1);
	};
	return (
		<Container>
			<form>
				{currentPage === 1 ? (
					<Rentdetailspart1
						name={name}
						bed={bed}
						sid={sid}
						startdate={startdate}
						duedate={duedate}
						onNext={onNext}
					/>
				) : (
					<Rentdetailspart2
						data={data}
						onInputChange={onInputChange}
						onPrevious={onPrevious}
						onSubmit={handleSubmit}
					/>
				)}
			</form>
		</Container>
	);
};

export default RentDetails;
