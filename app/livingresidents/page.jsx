'use client';

import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase';
import {
	FormControl,
	Input,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';

const LivingResidents = () => {
	const firebase = useContext(FirebaseContext);
	const [live, SetLive] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const localStorageData =
					JSON.parse(localStorage.getItem('closedData')) || [];
				const result = await firebase.viewAllAllotment();

				const displayedData = result.filter(
					(item) =>
						!localStorageData.some((localItem) => localItem.id === item.id)
				);

				SetLive(displayedData);
			} catch (error) {
				throw new Error('Error getting');
			}
		};
		fetchData();
	}, [firebase]);

	const handleSearch = (event) => {
		const { value } = event.target;
		setSearchTerm(value);
	};

	const filteredData = live.filter((data) => {
		return data.bed.toLowerCase().includes(searchTerm.toLowerCase());
	});
	return (
		<>
			<FormControl>
				<Input
					type="search"
					placeholder="Search"
					onChange={handleSearch}
					value={searchTerm}
				/>
			</FormControl>
			<TableContainer padding="20px">
				<Table>
					<Thead>
						<Tr>
							<Th>ID NO</Th>
							<Th>Bed</Th>
							<Th>Deposit</Th>
							<Th>Deposit Method</Th>
						</Tr>
					</Thead>
					<Tbody>
						{filteredData.map((data) => (
							<Tr key={data.id}>
								<Td>{data.id}</Td>
								<Td>{data.bed}</Td>
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

export default LivingResidents;
