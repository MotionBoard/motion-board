import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {ArrowRightIcon} from 'lucide-react';

export default function NotFound() {
	return (
		<div
			className="flex flex-col items-center justify-center min-h-[100dvh] bg-background p-4">
			<div className="max-w-md w-full flex gap-6 flex-col items-center text-center">
				<div className="space-y-2 max-md:max-w-[80%]">
					<h1 className="text-4xl max-md:text-xl font-bold">Oops! Page not found.</h1>
					<p className="text-muted-foreground max-md:text-sm">The page you're looking for doesn't exist or has
						been moved.</p>
				</div>
				<Link
					href="/"
					prefetch={false}
				>
					<Button>Go back home<ArrowRightIcon size={14}/></Button>
				</Link>
			</div>
		</div>
	);
}