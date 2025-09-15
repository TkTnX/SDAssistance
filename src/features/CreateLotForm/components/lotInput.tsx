import { Input } from '@/shared/components'

interface Props extends React.ComponentProps<'input'> {
	label: string
}

export const LotInput = ({ label, ...props }: Props) => {
	return (
		<label className='flex flex-col rounded-xl bg-white px-5 sm:flex-row sm:items-center sm:gap-12'>
			<p className='text-text-2 flex items-start border-b sm:border-none pt-4 pb-2.5 text-sm sm:pt-0 sm:pb-0'>
				{label}{' '}
				{props.required && (
					<span className='text-dop-cvet-2 font-bold'>*</span>
				)}
			</p>
			<Input
				{...props}
				className='my-4 w-auto flex-1 !py-4 shadow-none sm:mt-0 sm:border-none'
			/>
		</label>
	)
}
