import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Expensespart2 = ({ data, onInputChange, onPrevious, onSubmit }) => {
	return (
		<>
			<FormControl>
				<FormLabel>Maintnance</FormLabel>
				<Input
					type="number"
					name="maintance"
					onChange={onInputChange}
					value={data.maintance}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Laundry</FormLabel>
				<Input
					type="number"
					name="laundry"
					onChange={onInputChange}
					value={data.laundry}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Miscellaneous</FormLabel>
				<Input
					type="number"
					name="miscellaneous"
					onChange={onInputChange}
					value={data.miscellaneous}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Remark</FormLabel>
				<Input
					type="text"
					name="remark"
					onChange={onInputChange}
					value={data.remark}
				/>
			</FormControl>

			<Button onClick={onPrevious}>Previous</Button>
			<Button type="submit" onClick={onSubmit}>
				Submit
			</Button>
		</>
	);
};

export default Expensespart2;
