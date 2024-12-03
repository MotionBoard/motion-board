'use client';

import {createContext, ReactNode, useContext, useState} from 'react';

type ProviderProps = {
	draggable: boolean,
	toggleDraggable: () => void
}

const LayoutContext = createContext<ProviderProps>({
	draggable: false,
	toggleDraggable: () => {
	}
});

export function LayoutProvider({children}: Readonly<{ children: ReactNode }>) {
	const [draggable, setDraggable] = useState(false);

	const toggleDraggable = () => {
		setDraggable(d => !d);
	};
	return <LayoutContext.Provider value={{draggable, toggleDraggable}}>
		{children}
	</LayoutContext.Provider>;
}

export const useLayout = () => {
	if (!LayoutContext) {
		throw new Error('useLayout must be used within a LayoutProvider');
	}
	return useContext(LayoutContext);
};