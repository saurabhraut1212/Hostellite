'use client';
import { Container } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../context/firebase';
import Expensespart1 from '../components/Expensespart1';
import Expensespart2 from '../components/Expensespart2';

const ExpencesPage = () => {
	const firebase = useContext(FirebaseContext);

	const [currentpage, setCurrentpage] = useState(1);

	const [data, setData] = useState({
		ebill: '',
		wbill: '',
		tax: '',
		emi: '',
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
				data.ebill,
				data.wbill,
				data.tax,
				data.emi,
				data.salary,
				data.maintance,
				data.laundry,
				data.miscellaneous,
				data.remark
			);
			return expense;
		} catch (error) {
			console.log(error);
		}
	};

	const onNext = () => {
		setCurrentpage(currentpage + 1);
	};

	const onPrevious = () => {
		setCurrentpage(currentpage - 1);
	};

	return (
		<Container>
			<form onSubmit={addExpense}>
				{currentpage === 1 ? (
					<Expensespart1
						data={data}
						onInputChange={onInputChange}
						onNext={onNext}
					/>
				) : (
					<Expensespart2
						data={data}
						onInputChange={onInputChange}
						onPrevious={onPrevious}
						onSubmit={addExpense}
					/>
				)}
			</form>
		</Container>
	);
};

export default ExpencesPage;
