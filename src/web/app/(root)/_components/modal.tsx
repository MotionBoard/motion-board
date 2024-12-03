import {ReactNode} from 'react';
import {Button} from '@/components/ui/button';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/drawer';
import {useMediaQuery} from '@/components/hooks/use-media-query';
import NiceModal, {useModal} from '@ebay/nice-modal-react';

type ModalProps = {
	open: boolean
	onOpenChange: (v: boolean) => void
	title: string;
	description: string;
	children: ReactNode;
}

export function DrawerDialog({title, description, children, open, onOpenChange}: ModalProps) {
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>
							{description}
						</DialogDescription>
					</DialogHeader>
					{children}
					<DialogClose asChild className={'-mt-1'}>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
				</DialogContent>
			</Dialog>
		);
	}

	return <Drawer open={open} onOpenChange={onOpenChange}>
		<DrawerContent>
			<DrawerHeader className="text-left">
				<DrawerTitle>{title}</DrawerTitle>
				<DrawerDescription>
					{description}
				</DrawerDescription>
			</DrawerHeader>
			<div className={'px-4'}>
				{children}
			</div>
			<DrawerFooter className="pt-2 pb-8">
				<DrawerClose asChild>
					<Button variant="outline">Cancel</Button>
				</DrawerClose>
			</DrawerFooter>
		</DrawerContent>
	</Drawer>;
}

export function createModal(title: string, description: string, content: (data?: any) => ReactNode) {
	return NiceModal.create((data) => {
		const modal = useModal();
		const children = content(data);
		return <DrawerDialog title={title} description={description} open={modal.visible} onOpenChange={(v) => {
			if (!v) {
				modal.hide();
			}
		}}>
			{children}
		</DrawerDialog>;
	});
}
