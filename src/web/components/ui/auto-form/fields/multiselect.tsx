import * as React from 'react';
import {SetStateAction, useCallback} from 'react';
import {AutoFormInputComponentProps} from '@/components/ui/auto-form/types';
import {FormControl, FormItem, FormMessage} from '@/components/ui/form';
import AutoFormLabel from '@/components/ui/auto-form/common/label';
import AutoFormTooltip from '@/components/ui/auto-form/common/tooltip';
import {Multiselect} from '@/components/ui/multiselect';

export function AutoformMultiselect({
										label,
										isRequired,
										field,
										fieldConfigItem,
										fieldProps
									}: AutoFormInputComponentProps) {
	const {showLabel: _showLabel} = fieldProps;
	const showLabel = _showLabel === undefined ? true : _showLabel;

	const toggleItem = (value: string) => {
		const curr = Array.isArray(field.value) ? field.value : [];
		field.onChange(curr.includes(value) ? curr.filter((item) => item !== value) : [...curr, value]);
	};

	const setSelectedValues = useCallback((f: SetStateAction<string[]>) => {
		if (typeof f === 'function') {
			field.onChange(f(field.value));
		} else {
			field.onChange(f);
		}
	}, [field.value]);

	return <FormItem className="flex w-full flex-col justify-start pt-2">
		{showLabel && (
			<AutoFormLabel
				label={fieldConfigItem?.label || label}
				isRequired={isRequired}
			/>
		)}
		<FormControl>
			<Multiselect
				name={fieldConfigItem?.label || label}
				values={fieldConfigItem?.multiselectValues || {}}
				selectedValues={Array.isArray(field.value) ? field.value : []}
				setSelectedValues={setSelectedValues}
				toggleValue={toggleItem}/>
		</FormControl>
		<AutoFormTooltip fieldConfigItem={fieldConfigItem}/>
		<FormMessage/>
	</FormItem>;
}