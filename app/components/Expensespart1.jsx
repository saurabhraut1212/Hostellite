import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Expensespart1 = ({ data, onInputChange, onNext }) => {
	return (
		<>
			<FormControl>
				<FormLabel>Electricity Bill</FormLabel>
				<Input
					type="number"
					name="ebill"
					onChange={onInputChange}
					value={data.ebill}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Water Bill</FormLabel>
				<Input
					type="number"
					name="wbill"
					onChange={onInputChange}
					value={data.wbill}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Municipal Tax</FormLabel>
				<Input
					type="number"
					name="tax"
					onChange={onInputChange}
					value={data.tax}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Bank EMI</FormLabel>
				<Input
					type="number"
					name="emi"
					onChange={onInputChange}
					value={data.emi}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Salary</FormLabel>
				<Input
					type="number"
					name="salary"
					onChange={onInputChange}
					value={data.salary}
				/>
			</FormControl>
			<Button onClick={onNext}>Next</Button>
		</>
	);
};

export default Expensespart1;
