'use client';
import {Form} from '@/components/ui/form';
import React, {ReactNode, useState} from 'react';
import {DefaultValues, FormState, useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {zodResolver} from '@hookform/resolvers/zod';

import AutoFormObject from './fields/object';
import {Dependency, FieldConfig, SubmitOptions} from './types';
import {getDefaultValues, getObjectFormSchema, ZodObjectOrWrapped} from './utils';

export function AutoFormSubmit({
								   children,
								   className,
								   disabled
							   }: {
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
}) {
	return (
		<Button type="submit" disabled={disabled} className={className}>
			{children ?? 'Submit'}
		</Button>
	);
}

function AutoForm<SchemaType extends ZodObjectOrWrapped>({
															 submitText,
															 formSchema,
															 values: valuesProp,
															 onValuesChange: onValuesChangeProp,
															 onParsedValuesChange,
															 onSubmit: onSubmitProp,
															 fieldConfig,
															 children,
															 className,
															 dependencies,
															 defaultFormValues
														 }: {
	formSchema: SchemaType;
	submitText: string | ReactNode
	values?: Partial<z.infer<SchemaType>>;
	onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
	onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
	onSubmit?: (
		values: z.infer<SchemaType>,
		options: SubmitOptions<z.infer<SchemaType>>
	) => Promise<void>;
	fieldConfig?: FieldConfig<z.infer<SchemaType>>;
	children?:
		| React.ReactNode
		| ((formState: FormState<z.infer<SchemaType>>) => React.ReactNode);
	className?: string;
	dependencies?: Dependency<z.infer<SchemaType>>[];
	defaultFormValues?: DefaultValues<z.infer<SchemaType>>;
}) {
	const [loading, setLoading] = useState(false);
	const objectFormSchema = getObjectFormSchema(formSchema);
	const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
		getDefaultValues(objectFormSchema, fieldConfig);

	const form = useForm<z.infer<typeof objectFormSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultFormValues ?? defaultValues ?? undefined,
		values: valuesProp
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		const parsedValues = formSchema.safeParse(values);
		if (parsedValues.success) {
			await onSubmitProp?.(parsedValues.data, {
				setError: form.setError
			});
		}
		setLoading(false);
	}

	React.useEffect(() => {
		const subscription = form.watch((values) => {
			onValuesChangeProp?.(values);
			const parsedValues = formSchema.safeParse(values);
			if (parsedValues.success) {
				onParsedValuesChange?.(parsedValues.data);
			}
		});

		return () => subscription.unsubscribe();
	}, [form, formSchema, onValuesChangeProp, onParsedValuesChange]);

	const renderChildren =
		typeof children === 'function'
			? children(form.formState as FormState<z.infer<SchemaType>>)
			: children;

	return (
		<div className="w-full">
			<Form {...form}>
				<form
					onSubmit={(e) => {
						console.log('uifdshfiu');
						form.handleSubmit(onSubmit, (er) => {
							console.log('error', er);
						})(e);
					}}
					className={cn('flex flex-col gap-3', className)}
				>
					<AutoFormObject
						schema={objectFormSchema}
						form={form}
						dependencies={dependencies}
						fieldConfig={fieldConfig}
					/>

					{renderChildren}
					<span className={'text-destructive text-sm'}>
						{form.formState.errors['']?.message.toString()}
					</span>
					<Button type="submit" loading={loading} className={'w-full mt-2'}>
						{submitText}
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default AutoForm;
