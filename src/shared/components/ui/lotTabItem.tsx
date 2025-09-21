import { findSettings } from '@/shared/helpers'

type Props = {
	label: string
	arr?: { value: string; name: string }[]
	value: string
}

export const LotTabItem = ({ label, arr, value }: Props) => {
	return (
		<p className='flex items-center justify-between text-sm text-[#4e5766] py-4 border-b border-dashed'>
			{label}:{' '}
			<span className='text-text-1 block font-medium'>
				{arr ? findSettings(arr, value) : value}
			</span>
		</p>
	)
}
