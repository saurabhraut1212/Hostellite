'use client';

import {
	Button,
	Container,
	Flex,
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
import { hostelBedData } from '../data';
import { useState } from 'react';

const CheckAvailability = () => {
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [bed, setBed] = useState('');

	const handleBedChange = (selectedBed) => {
		setBed(selectedBed);
		alert(`${bed} is selected on ${startDate}`);
	};

	return (
		<>
			<Flex flex alignItems={'center'} justifyContent={'space-between'}>
				<Container centerContent>
					<FormControl>
						<Input
							type="date"
							onChange={(e) => setStartDate(e.target.value)}
							value={startDate}
						/>
					</FormControl>

					<FormControl>
						<Input
							type="date"
							onChange={(e) => setEndDate(e.target.value)}
							value={endDate}
						/>
					</FormControl>
				</Container>
			</Flex>
			<TableContainer padding="20px">
				<Table>
					<Thead>
						<Tr>
							<Th>Floor No</Th>
							<Th>Room No</Th>
							<Th>Bed No</Th>
						</Tr>
					</Thead>
					<Tbody>
						{hostelBedData.map(({ floor, room, bed_nos }) => (
							<Tr key={`${floor}-${room}`}>
								<Td>{floor}</Td>
								<Td>{room}</Td>
								{bed_nos.map((bed) => (
									<Td key={`${floor}-${room}-${bed}`}>
										<Button
											onClick={() => handleBedChange(`${room}-${bed}`)}
										>{`${room}-${bed}`}</Button>
									</Td>
								))}
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	);
};

export default CheckAvailability;
