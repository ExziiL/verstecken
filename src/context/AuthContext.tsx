import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export interface IAuthProvider {
	children?: ReactNode;
}

export interface IAuthContext {
	signup: any;
	currentUser: User | null;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<Boolean>(true);

	function signup(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
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
		signup,
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
