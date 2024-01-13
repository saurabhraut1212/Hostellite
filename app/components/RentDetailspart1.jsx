import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Rentdetailspart1 = ({ name, bed, sid, startdate, duedate, onNext }) => {
	return (
		<>
			<FormControl isRequired>
				<FormLabel>Name</FormLabel>
				<Input type="text" name="name" value={name} />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>ID</FormLabel>
				<Input type="text" name="id" value={sid} />
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Bed</FormLabel>
				<Input type="text" name="bed" value={bed} />
			</FormControl>

			<FormControl isRequired>
				<FormLabel>Start Date</FormLabel>
				<Input
					type="date"
					name="startdate"
					placeholder="Start date"
					value={startdate}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>Due Date</FormLabel>
				<Input
					type="date"
					name="duedate"
					placeholder="Due date"
					value={duedate}
				/>
			</FormControl>
			<Button onClick={onNext}>Next</Button>
		</>
	);
};

export default Rentdetailspart1;
