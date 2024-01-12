'use client';

import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../context/firebase';
import { getRecevaibleAmountForRow } from '../utils/rentUtils';
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';

const ViewAllExpences = () => {
	const firebase = useContext(FirebaseContext);
	const [rent, setRent] = useState([]);
	const [totalDeposit, setTotalDeposit] = useState('');
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
	const [selectedRentId, setSelectedRentId] = useState('');

	const [updateData, setUpdateData] = useState({
		bookingAmount: '',
		miscellaneous: '',
		remark: '',
	});

	const handleUpdateModalClose = () => {
		setIsUpdateModalOpen(false);
		setSelectedRentId(false);
	};

	const handleUpdateModalOpen = async (rentId) => {
		setSelectedRentId(rentId);

		const selectedRent = rent.find((rent) => rent.id === rentId);
		if (selectedRent) {
			try {
				const allotedDoc = await firebase.getAllotmentByQuery(selectedRent.sid);
				console.log(allotedDoc, 'This is alloted doc');
				setTotalDeposit(allotedDoc.deposit);
				setUpdateData({
					bookingAmount: selectedRent.bookingAmount,
					miscellaneous: selectedRent.miscellaneous,
					remark: selectedRent.remark,
				});
				setIsUpdateModalOpen(true);
			} catch (error) {
				throw new Error('Error in getting doc');
			}
		}
	};

	const handleUpdateInputChange = (e) => {
		const { name, value } = e.target;
		setUpdateData((prevdata) => ({
			...prevdata,
			[name]: value,
		}));
	};

	const updateModal = async (id) => {
		try {
			await firebase.updateRentModel(id, updateData);
			handleUpdateModalClose();
		} catch (error) {
			throw new Error('Error in update', error);
		}
	};

	useEffect(() => {
		const getRentDetails = async () => {
			try {
				const data = await firebase.getAllRentDetails();

				setRent(data);
			} catch (error) {
				throw new Error('Error in getting expences');
			}
		};
		getRentDetails();
	}, [selectedRentId]);

	const generateMessage = (rent) => {
		try {
			const receivableAmount = getRecevaibleAmountForRow(rent, totalDeposit);
			const message = `Dear ${rent.name} your receivable amount is ${receivableAmount}`;
			alert(message);
		} catch (error) {
			throw new Error('Error in generating message', error);
		}
	};

	return (
		<>
			<TableContainer padding="20px">
				<Table>
					<Thead>
						<Tr>
							<Th>Name</Th>
							<Th>ID</Th>
							<Th>Bed </Th>
							<Th>Start Date</Th>
							<Th>Due Date</Th>
							<Th>Monthly Rent </Th>
							<Th>Advance Deposit</Th>
							<Th>Amount Paid</Th>
							<Th>Miscellaneous </Th>
							<Th>Remark</Th>
							<Th>Receivable</Th>
							<Th>Update Payment</Th>
							<Th>Payment Reminders</Th>
							<Th>Details</Th>
						</Tr>
					</Thead>
					<Tbody>
						{rent.map((rent) => (
							<Tr key={rent.id}>
								<Td>{rent.name}</Td>
								<Td>{rent.sid}</Td>
								<Td>{rent.bed}</Td>
								<Td>{rent.startdate}</Td>
								<Td>{rent.duedate}</Td>
								<Td>{rent.mrate}</Td>
								<Td>{rent.advancedeposit}</Td>
								<Td>{rent.bookingAmount}</Td>
								<Td>{rent.miscellaneous}</Td>
								<Td>{rent.remark}</Td>
								<Td>{getRecevaibleAmountForRow(rent, totalDeposit)}</Td>

								<Td>
									<Button onClick={() => handleUpdateModalOpen(rent.id)}>
										Edit
									</Button>
								</Td>
								<Td>
									<Button onClick={() => generateMessage(rent)}>
										Generate Message
									</Button>
								</Td>
								<Td>
									<Button>Details</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
			<Modal isOpen={isUpdateModalOpen} onClose={handleUpdateModalClose}>
				<ModalContent>
					<ModalHeader>Edit Rent Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel>Miscellaneous</FormLabel>
							<Input
								name="miscellaneous"
								type="number"
								onChange={handleUpdateInputChange}
								value={updateData.miscellaneous}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Amount Paid</FormLabel>
							<Input
								name="bookingAmount"
								type="number"
								onChange={handleUpdateInputChange}
								value={updateData.bookingAmount}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Remark</FormLabel>
							<Input
								name="remark"
								type="text"
								onChange={handleUpdateInputChange}
								value={updateData.remark}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleUpdateModalClose}>
							Close
						</Button>
						<Button variant="ghost" onClick={() => updateModal(selectedRentId)}>
							Update
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ViewAllExpences;
