import { findSettings } from '@/shared/helpers'

type Props = {
	label: string
	arr?: { value: string; name: string }[]
	value: string
}

export const LotTabItem = ({ label, arr, value }: Props) => {
	return (
		<p className='vsm:flex-row vsm:gap-0 vsm:items-center flex flex-col justify-between gap-2 border-b border-dashed py-4 text-sm text-[#4e5766]'>
			{label}:{' '}
			<span className='text-text-1 block font-medium'>
				{arr ? findSettings(arr, value) : value}
			</span>
		</p>
	)
}
