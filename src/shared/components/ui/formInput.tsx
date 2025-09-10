import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '.'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface Props<TFormValues extends FieldValues> {
	form: UseFormReturn<TFormValues>
	name: Path<TFormValues>
	label: string
	className?: string
	placeholder?: string
	type?: string
}

export const FormInput = <TFormValues extends FieldValues>({
	form,
	name,
	label,
	className,
	placeholder,
	type = 'text'
}: Props<TFormValues>) => {
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							type={type}
							className={className}
							placeholder={placeholder}
							{...field}
							value={field.value ?? ''}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
