'use client';

import {ReactNode} from 'react';
import NiceModal from '@ebay/nice-modal-react';

export function ModalProvider({children}: Readonly<{ children: ReactNode; }>) {
	return <NiceModal.Provider>
		{children}
	</NiceModal.Provider>;
}