import {twoLetters} from '@/lib/utils';
import {userCache} from '@/lib/cache';

export async function UserAvatar() {
	const user = await userCache();

	return <div
		className="h-8 w-8 rounded-md overflow-hidden bg-muted shrink-0 flex items-center justify-center relative">
		{user?.avatar && <img src={user?.avatar} className={'absolute h-full w-full'} alt={user?.name}/>}
		<span>{twoLetters(user?.name ?? '')}</span>
	</div>;
}