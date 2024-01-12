'use client';
import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../context/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = () => {
	const firebase = useContext(FirebaseContext);
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await firebase.UserWithEmailAndPassword(email, password);
			router.push('/login');
		} catch (error) {
			throw new Error('Error in register');
		}
	};

	return (
		<Container>
			<form>
				<FormControl isRequired>
					<FormLabel>Email</FormLabel>
					<Input
						type="email"
						placeholder="Enter your email here"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</FormControl>
				<FormControl isRequired>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						placeholder="Enter your password here"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</FormControl>
				<Button onClick={handleSubmit}>Signup</Button>
				<p>
					Already have an account <Link href="/login">Login</Link>
				</p>
			</form>
		</Container>
	);
};

export default Register;
