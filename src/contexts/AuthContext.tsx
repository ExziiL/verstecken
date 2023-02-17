import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export interface IAuthProvider {
	children?: ReactNode;
}

export interface IAuthContext {
	signup: any;
	login: any;
	logout: any;
	currentUser: User | null;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
	return useContext(AuthContext);
}

// In AuthProvider wird die Firebase Authentifizierung initialisiert und gehandhabt
export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<Boolean>(true);

	async function signup(email: string, password: string) {
		try {
			return await createUserWithEmailAndPassword(auth, email, password);
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log(errorCode, errorMessage);

			if (errorCode === 'auth/weak-password') {
				alert('The password is too weak.');
			}
		}
	}

	async function login(email: string, password: string) {
		try {
			return await signInWithEmailAndPassword(auth, email, password);
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;

			console.log(errorCode, errorMessage);

			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			}
		}
	}

	function logout() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
