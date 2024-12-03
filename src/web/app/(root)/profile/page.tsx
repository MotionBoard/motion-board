import {userCache} from '@/lib/cache';
import {twoLetters} from '@/lib/utils';
import {HeartIcon} from 'lucide-react';
import {Preferences} from '@/app/(root)/profile/_components/preferences';
import getConfig from 'next/config';
import {Container} from '@/app/(root)/_components/blocks/container';

const {publicRuntimeConfig} = getConfig();

export default async function Profile() {
	const user = await userCache();

	return <Container>
		<div className={'flex flex-col items-center text-center pb-6 w-full'}>
			<div
				className="h-32 w-32 rounded-[40px] overflow-hidden bg-muted shrink-0 flex items-center justify-center relative">
				{user?.avatar &&
                    <img src={user?.avatar} className={'absolute h-full w-full'} alt={user?.name}/>}
				<span>{twoLetters(user?.name ?? '')}</span>
			</div>
			<h1 className={'text-2xl font-bold mt-4'}>{user?.name}</h1>
			<span className={'text-sm text-muted-foreground'}>{user?.email}</span>
		</div>
		<div className={'flex flex-col gap-2 max-w-3xl w-full'}>
			<span className={'text-sm text-muted-foreground ml-1'}>Preferences</span>
			<div className={'border rounded-lg p-4 max-md:p-2 flex flex-col gap-1 max-md:gap-3'}>
				<Preferences/>
			</div>
		</div>
		<div className={'flex flex-col gap-2 max-w-3xl w-full'}>
			<span className={'text-sm text-muted-foreground ml-1'}>About</span>
			<div className={'border rounded-lg p-4 flex flex-col gap-3'}>
				<span
					className={'text-sm text-muted-foreground'}>Motion Board - version {publicRuntimeConfig.version}</span>
				<span
					className={'text-sm text-muted-foreground flex items-center gap-1.5'}>
					Made with
					<HeartIcon size={22} className={'stroke-primary fill-primary'}/>
					by
					<a href={'https://mariusbrt.com/'} target={'_blank'}
					   className={'font-medium underline text-foreground hover:text-primary'}>
						Marius Brouty
					</a>
				</span>
			</div>
		</div>
	</Container>;
}