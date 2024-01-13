import React from 'react';
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Select,
} from '@chakra-ui/react';

const HosteliteFormPart1 = ({ data, onChangeInput, onNext }) => {
	return (
		<>
			<FormControl isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					type="text"
					placeholder="name"
					name="name"
					onChange={onChangeInput}
					value={data.name}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Age</FormLabel>
				<Input
					type="number"
					placeholder="age"
					name="age"
					onChange={onChangeInput}
					value={data.age}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Contact Numbers</FormLabel>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Personal Contact</FormLabel>
				<Input
					type="tel"
					name="pcontact"
					placeholder="Phone number"
					onChange={onChangeInput}
					value={data.pcontact}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Emergency Contact</FormLabel>
				<Input
					type="tel"
					name="econtact"
					placeholder="Emergency number"
					onChange={onChangeInput}
					value={data.econtact}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					type="email"
					name="email"
					placeholder="Email"
					onChange={onChangeInput}
					value={data.email}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Select Document Type</FormLabel>
				<Select
					placeholder="Select document"
					name="dtype"
					value={data.dtype}
					onChange={onChangeInput}
				>
					<option>Adhaar Card</option>
					<option>Driving Licence</option>
					<option>College Id</option>
				</Select>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Document Number</FormLabel>
				<Input
					type="number"
					name="dno"
					placeholder="Document Number"
					onChange={onChangeInput}
					value={data.dno}
				/>
			</FormControl>

			<Button onClick={onNext}>Next</Button>
		</>
	);
};

export default HosteliteFormPart1;
