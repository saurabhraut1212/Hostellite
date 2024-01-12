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

const ExpencesPage = () => {
	const firebase = useContext(FirebaseContext);
	const [data, setData] = useState({
		ebill: '',
		wbill: '',
		tax: '',
		salary: '',
		maintance: '',
		laundry: '',
		miscellaneous: '',
		remark: '',
	});

	const onInputChange = (e) => {
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const addExpense = async (e) => {
		e.preventDefault();
		try {
			const expense = await firebase.addExpences(
				ebill,
				wbill,
				tax,
				emi,
				salary,

				maintance,
				laundry,
				miscellaneous,
				remark
			);
			return expense;
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<form onSubmit={addExpense}>
				<FormControl>
					<FormLabel>Electricity Bill</FormLabel>
					<Input type="number" onChange={onInputChange} value={data.ebill} />
				</FormControl>
				<FormControl>
					<FormLabel>Water Bill</FormLabel>
					<Input type="number" onChange={onInputChange} value={data.wbill} />
				</FormControl>
				<FormControl>
					<FormLabel>Municipal Tax</FormLabel>
					<Input type="number" onChange={onInputChange} value={data.tax} />
				</FormControl>
				<FormControl>
					<FormLabel>Bank EMI</FormLabel>
					<Input type="number" onChange={onInputChange} value={data.emi} />
				</FormControl>
				<FormControl>
					<FormLabel>Salary</FormLabel>
					<Input type="number" onChange={onInputChange} value={data.salary} />
				</FormControl>
				<FormControl>
					<FormLabel>Address</FormLabel>
				</FormControl>
				<FormControl>
					<FormLabel>Maintnance</FormLabel>
					<Input
						type="number"
						onChange={onInputChange}
						value={data.maintance}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Laundry</FormLabel>
					<Input type="number" onChange={onInputChange} value={data.laundry} />
				</FormControl>
				<FormControl>
					<FormLabel>Miscellaneous</FormLabel>
					<Input
						type="number"
						onChange={onInputChange}
						value={data.miscellaneous}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>Remark</FormLabel>
					<Input type="text" onChange={onInputChange} value={data.remark} />
				</FormControl>

				<Button type="submit">Submit</Button>
			</form>
		</Container>
	);
};

export default ExpencesPage;
