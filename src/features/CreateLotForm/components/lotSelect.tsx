import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { useLotStore } from '@/shared/stores';

interface Props extends React.ComponentProps<'select'> {
	label: string
	items: { value: string; name: string }[]
	name: string
}

export const LotSelect = ({ label, items, name, ...props }: Props) => {
		const setLotInfo = useLotStore(state => state.setLotInfo)
	
	return (
		<label className='flex h-12 flex-col rounded-xl bg-white px-5 md:flex-row md:items-center md:gap-12'>
			<p className='text-text-2 flex items-start border-b pt-4 pb-2.5 text-sm sm:border-none sm:pt-0 sm:pb-0'>
				{label}{' '}
				{props.required && (
					<span className='text-dop-cvet-2 font-bold'>*</span>
				)}
			</p>
			<Select onValueChange={(value) => setLotInfo(name, value)}>
				<SelectTrigger className='my-4 w-full flex-1 py-4 shadow-none sm:my-0 md:w-auto md:border-none'>
					<SelectValue
						placeholder='Не выбрано'
						className='text-osnovnoy text-sm'
					/>
				</SelectTrigger>
				<SelectContent>
					{items.map(item => (
						<SelectItem key={item.value} value={item.value}>
							{item.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</label>
	)
}
