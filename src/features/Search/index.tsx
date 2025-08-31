import { SearchIcon } from 'lucide-react'

import { Input } from '@/shared/components'

export const Search = () => {
	return (
		<form className='flex h-[60px] items-center border-2'>
			<Input
				placeholder='Поиск по лотам'
				className='placeholder:text-osnovnoy text-osnovnoy h-full border-0 bg-transparent pl-4 font-medium shadow-none'
			/>
			<button className='pr-4'>
				<SearchIcon
					color='var(--osnovnoy-cvet)'
					strokeWidth={2}
					size={24}
				/>
			</button>
		</form>
	)
}
