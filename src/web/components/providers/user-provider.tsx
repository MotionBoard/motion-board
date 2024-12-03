'use client';

import {createContext, ReactNode, useContext} from 'react';
import {Prisma} from '@prisma/client';

const UserContext = createContext<Prisma.UserGetPayload<{}>>({} as Prisma.UserGetPayload<{}>);

export function UserProvider({children, user}: Readonly<{ children: ReactNode, user: Prisma.UserGetPayload<{}> }>) {
	return <UserContext.Provider value={user}>
		{children}
	</UserContext.Provider>;
}

export const useUser = () => {
	if (!UserContext) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return useContext(UserContext);
};