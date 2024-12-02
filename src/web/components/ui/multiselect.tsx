import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {beautifySelectLabel} from '@/components/ui/auto-form/utils';
import * as React from 'react';
import {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {Separator} from '@/components/ui/separator';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command';
import {cn} from '@/lib/utils';
import {CheckIcon, Minus, PlusCircleIcon} from 'lucide-react';
import {useCommandState} from 'cmdk';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';


function CommandValue({value, checked, toggleItem, noPadding}: {
	value: string
	checked: boolean
	noPadding?: boolean
	toggleItem: (value: string) => void
}) {
	const search = useCommandState((state) => state.search);

	return <CommandItem
		className={(search === '' && !noPadding) ? 'pl-6' : 'mx-1'}
		onSelect={() => {
			toggleItem(value);
		}}
	>
		<div
			className={cn(
				'mr-2 flex h-4 w-4 items-center justify-center rounded-[5px] border border-primary',
				checked
					? 'bg-primary text-primary-foreground'
					: 'opacity-50 [&_svg]:invisible'
			)}
		>
			<CheckIcon className={cn('h-4 w-4')}/>
		</div>
		<span>{beautifySelectLabel(value)}</span>
	</CommandItem>;
}

function CommandCategory({values, name, selectedValues, setSelectedValues, toggleValue}: {
	name: string
	values: string[]
	selectedValues: string[]
	setSelectedValues: Dispatch<SetStateAction<string[]>>
	toggleValue: (value: string) => void
}) {
	const isChecked = useMemo(() => {
		const selected = values.filter((v) => selectedValues.includes(v));
		if (selected.length === 0) return -1;
		if (selected.length === values.length) return 1;
		return 0;
	}, [values, selectedValues]);

	const toggleAll = () => {
		setSelectedValues(prev => {
			if (!prev) {
				prev = [];
			}
			if (isChecked === -1) return [...prev, ...values];
			if (isChecked === 1) return prev.filter(v => !values.includes(v));
			return [...prev, ...values.filter(v => !prev.includes(v))];
		});
	};
	const search = useCommandState((state) => state.search);


	return <CommandGroup heading={beautifySelectLabel(name)}>
		{search === '' && <div
            className={'flex items-center select-none gap-1 text-sm pl-2 pb-1 cursor-pointer'}
            onClick={toggleAll}
        >
            <div
                className={cn(
					'mr-2 flex h-4 w-4 items-center justify-center rounded-[5px] border border-primary',
					isChecked !== -1
						? 'bg-primary text-primary-foreground'
						: 'opacity-50 [&_svg]:invisible'
				)}
            >
				{isChecked === 1 ? <CheckIcon className={'h-4 w-4'}/> : <Minus className={'h-4 w-4'}/>}
            </div>
            <span>Select all</span>
        </div>}
		{values.map((v) => (
			<CommandValue
				key={'cat' + name + v}
				value={v}
				checked={selectedValues.includes(v)}
				toggleItem={toggleValue}
			/>
		))}
	</CommandGroup>;
}

export type MultiselectValuesType = Record<string, string[] | string>

export function Multiselect({name, values, selectedValues, setSelectedValues, toggleValue, className}: {
	name: string
	values: MultiselectValuesType
	selectedValues: string[]
	setSelectedValues: Dispatch<SetStateAction<string[]>>
	toggleValue: (value: string) => void,
	className?: string
}) {
	const [open, setOpen] = useState(false);

	return <DropdownMenu open={open} onOpenChange={setOpen}>
		<DropdownMenuTrigger asChild>
			<Button variant="outline"
					className={cn('flex items-center justify-start gap-1 py-2 pl-3 pr-2 hover:bg-accent/30 w-full', className)}>
				<PlusCircleIcon className="mr-2 h-4 w-4"/>
				{name}
				{selectedValues.length > 0 && (
					<>
						<Separator orientation="vertical" className="mx-2 h-4"/>
						<div className="space-x-1 flex">
							{selectedValues.length > 2 ? (
								<Badge
									variant="secondary"
									className="rounded-sm font-normal"
								>
									{selectedValues.length} selected
								</Badge>
							) : (
								selectedValues.map((v) => (
									<Badge
										variant="secondary"
										key={v}
										className="rounded-sm font-normal"
									>
										{beautifySelectLabel(v)}
									</Badge>
								))
							)}
						</div>
					</>
				)}
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] p-0">
			<Command className={'pb-1'}>
				<CommandInput placeholder={name}/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{Object.entries(values).map(([key, value]) => {
						if (typeof value === 'string') {
							return <CommandValue
								key={key}
								value={value}
								noPadding
								checked={selectedValues.includes(value)}
								toggleItem={toggleValue}
							/>;
						}
						return <CommandCategory
							key={key}
							name={key}
							values={value}
							selectedValues={selectedValues}
							setSelectedValues={setSelectedValues}
							toggleValue={toggleValue}
						/>;
					})}
				</CommandList>
			</Command>
		</DropdownMenuContent>
	</DropdownMenu>;
}