import { Input } from '@/shared/components';
import { useLotStore } from '@/shared/stores';





interface Props extends React.ComponentProps<'input'> {
	label: string,
	name: string
}

export const LotInput = ({ label, name, ...props }: Props) => {
	const setLotInfo = useLotStore(state => state.setLotInfo)

	return (
		<label className='flex flex-col rounded-xl bg-white px-5 sm:flex-row sm:items-center sm:gap-12'>
			<p className='text-text-2 flex items-start border-b pt-4 pb-2.5 text-sm sm:border-none sm:pt-0 sm:pb-0'>
				{label}{' '}
				{props.required && (
					<span className='text-dop-cvet-2 font-bold'>*</span>
				)}
			</p>
			<Input
			onChange={(e) => setLotInfo(name, e.target.value)}
				{...props}
				className='h-12 w-auto flex-1 !py-4 shadow-none sm:mt-0 sm:border-none'
			/>
		</label>
	)
}