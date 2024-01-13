import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
const Rentdetailspart2 = ({ data, onInputChange, onPrevious, onSubmit }) => {
	return (
		<>
			<FormControl isRequired>
				<FormLabel>Advance Deposit</FormLabel>
				<Input
					type="number"
					placeholder="Deposit"
					name="advancedeposit"
					onChange={onInputChange}
					value={data.advancedeposit}
				/>
			</FormControl>
			;
			<FormControl isRequired>
				<FormLabel>Monthly rent to charge</FormLabel>
				<Input
					type="number"
					name="mrate"
					placeholder="Monthly rent"
					onChange={onInputChange}
					value={data.mrate}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Miscellaneous</FormLabel>
				<Input
					type="number"
					name="miscellaneous"
					placeholder="Miscellaneous"
					onChange={onInputChange}
					value={data.miscellaneous}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Remark</FormLabel>
				<Input
					type="text"
					name="remark"
					placeholder="Add Remark"
					onChange={onInputChange}
					value={data.remark}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Booking Paid Amount</FormLabel>
				<Input
					type="number"
					name="bookingAmount"
					placeholder="Booking Amount"
					onChange={onInputChange}
					value={data.bookingAmount}
				/>
			</FormControl>
			<Button onClick={onPrevious}>Previous</Button>
			<Button type="submit" onClick={onSubmit}>
				Submit
			</Button>
		</>
	);
};

export default Rentdetailspart2;
