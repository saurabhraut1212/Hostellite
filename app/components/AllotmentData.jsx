'use client';

import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Select,
	Td,
	Tr,
} from '@chakra-ui/react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../context/firebase';

const AllotMentData = ({ view }) => {
	console.log(view, 'view data');
	const firebase = useContext(FirebaseContext);
	const [modalOpen, setIsModalOpen] = useState(false);
	const [data, setData] = useState({
		id: view.id,
		bed: view.bed,
		startDate: view.startDate,
		endDate: view.endDate,
		deposit: view.deposit,
		depositMethod: view.depositMethod,
	});

	const handleUpdateClick = () => {
		setIsModalOpen(true);
	};
	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const updateModal = async () => {
		try {
			const result = await firebase.updateAllotment(view.id, data);
			console.log(result);
			onCloseModal();
		} catch (error) {
			throw new Error('Error in update the modal');
		}
	};

	return (
		<>
			<Tr>
				<Td>{view.id}</Td>
				<Td>{view.bed}</Td>
				<Td>{view.startDate}</Td>
				<Td>{view.endDate}</Td>
				<Td>{view.deposit}</Td>
				<Td>{view.depositMethod}</Td>
				<Button onClick={handleUpdateClick}>Update</Button>
			</Tr>

			<Modal onClose={onCloseModal} isOpen={modalOpen}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Allotment Update</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl>
							<FormLabel>Bed</FormLabel>
							<Select name="bed" onChange={onInputChange} value={data.bed}>
								<option>204-B(Room-204)</option>
								<option>206-E(Room-206)</option>
								<option>305-B(Room-305)</option>
								<option>401-B(Room-401)</option>
								<option>403-B(Room-403)</option>
								<option>405-B(Room-405)</option>
							</Select>
						</FormControl>
						<FormControl>
							<FormLabel>Start Date</FormLabel>
							<Input
								name="startDate"
								type="date"
								onChange={onInputChange}
								value={data.startDate}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>End Date</FormLabel>
							<Input
								name="endDate"
								type="date"
								onChange={onInputChange}
								value={data.endDate}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Deposit</FormLabel>
							<Input
								name="deposit"
								type="number"
								onChange={onInputChange}
								value={data.deposit}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>Deposit Method</FormLabel>
							<Select
								name="depositMethod"
								onChange={onInputChange}
								value={data.depositMethod}
							>
								<option>Credit Card</option>
								<option>Debit Card</option>
								<option>UPI</option>
								<option>Cash</option>
							</Select>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onCloseModal}>
							Close
						</Button>
						<Button variant="ghost" onClick={updateModal}>
							Update
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AllotMentData;
