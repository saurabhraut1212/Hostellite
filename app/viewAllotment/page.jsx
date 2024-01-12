'use client';
import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase';
import {
	TableContainer,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
} from '@chakra-ui/react';
import AllotMentData from '../components/AllotmentData';

const viewAllotment = () => {
	const [viewrs, setViewrs] = useState([]);
	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await firebase.viewAllAllotment();
				setViewrs(data);
			} catch (error) {
				throw new Error('Failed to fetch viewrs');
			}
		};
		fetchData();
	}, [firebase]);

	return (
		<TableContainer padding="20px">
			<Table>
				<Thead>
					<Tr>
						<Th>ID NO</Th>
						<Th>Bed No</Th>
						<Th>Start Date</Th>
						<Th>End Date</Th>
						<Th>Deposit</Th>
						<Th>Deposit Method</Th>
						<Th>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{viewrs.map((view) => (
						<AllotMentData key={view.id} view={view} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default viewAllotment;
