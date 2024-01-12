'use client';

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
import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase';

const Nonliving = () => {
	const [item, setItem] = useState([]);
	//const firebase = useContext(FirebaseContext);

	console.log(item, 'closed student data ');

	useEffect(() => {
		const localStorageData =
			JSON.parse(localStorage.getItem('closedData')) || [];
		setItem(localStorageData);
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
						</Tr>
					</Thead>
					<Tbody>
						{item.map((data) => (
							<Tr key={data.id}>
								<Td>{data.id}</Td>
								<Td>{data.bed}</Td>
								<Td>{data.startDate}</Td>
								<Td>{data.endDate}</Td>
								<Td>{data.deposit}</Td>
								<Td>{data.depositMethod}</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default Nonliving;
