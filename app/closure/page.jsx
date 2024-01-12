'use client';

import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase';
import {
	Button,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';

const Closure = () => {
	const firebase = useContext(FirebaseContext);
	const [data, setData] = useState([]);

	const handleClose = async (id, studentdata) => {
		const closedData = JSON.parse(localStorage.getItem('closedData')) || [];
		localStorage.setItem(
			'closedData',
			JSON.stringify([...closedData, studentdata])
		);
	};

	useEffect(() => {
		const closedDatafromlocalstorage = localStorage.getItem('closedData') || [];
		const filteredData = data.filter(
			(item) => !closedDatafromlocalstorage.includes(item.id)
		);
		setData(filteredData);
	}, [data]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await firebase.viewAllAllotment();
				setData(result);
			} catch (error) {
				throw new Error('Error in fetching allotments');
			}
		};
		fetchData();
	}, []);
	return (
		<>
			<TableContainer padding="20px">
				<Table>
					<Thead>
						<Tr>
							<Th>ID</Th>
							<Th>Bed No</Th>
							<Th>Start Date</Th>
							<Th>End Date</Th>
							<Th>Deposit</Th>
							<Th>Deposit Method</Th>
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map((data) => (
							<Tr key={data.id}>
								<Td>{data.id}</Td>
								<Td>{data.bed}</Td>
								<Td>{data.startDate}</Td>
								<Td>{data.endDate}</Td>
								<Td>{data.deposit}</Td>
								<Td>{data.depositMethod}</Td>

								<Td>
									<Button onClick={() => handleClose(data.id, data)}>
										Close
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Closure;
