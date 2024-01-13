import React from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	Select,
	Button,
} from '@chakra-ui/react';

const HosteliteFormPart2 = ({ data, onChangeInput, onPrevious, onSubmit }) => {
	return (
		<>
			<FormControl isRequired>
				<FormLabel>Address</FormLabel>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>House Number</FormLabel>
				<Input
					type="number"
					name="hno"
					placeholder="House Number"
					onChange={onChangeInput}
					value={data.hno}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Locality</FormLabel>
				<Input
					type="text"
					name="locality"
					placeholder="Locality"
					onChange={onChangeInput}
					value={data.locality}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>City</FormLabel>
				<Input
					type="text"
					name="city"
					placeholder="city"
					onChange={onChangeInput}
					value={data.city}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>State</FormLabel>
				<Input
					type="text"
					name="state"
					placeholder="State"
					onChange={onChangeInput}
					value={data.state}
				/>
			</FormControl>

			<FormControl isRequired>
				<FormLabel>Select Status</FormLabel>
				<Select
					placeholder="Select status"
					name="status"
					value={data.status}
					onChange={onChangeInput}
				>
					<option value="live">Live</option>
					<option value="left">Left</option>
					<option value="leftwithoutpaying">Left Without Paying</option>
				</Select>
			</FormControl>
			<Button onClick={onPrevious}>Previous</Button>
			<Button type="submit" onClick={onSubmit}>
				Submit
			</Button>
		</>
	);
};

export default HosteliteFormPart2;
