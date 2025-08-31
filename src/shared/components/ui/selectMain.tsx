'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '.'
import { useRouter } from 'next/navigation'

type Props = {
	items: { name: string; value: string }[]
	placeholder: string
}

export const SelectMain = ({ items, placeholder }: Props) => {
	const router = useRouter()

	const onChange = (value: string) => {
		router.push(
			placeholder.toLowerCase() === 'сортировка'
				? `/lots?sortBy=${value}`
				: `/lots?carType=${value}`
		)
	}

	return (
		<Select onValueChange={onChange}>
			<SelectTrigger className='!text-osnovnoy flex-1 rounded-none bg-[#f0f2f5] !font-bold'>
				<SelectValue
					className='text-osnovnoy text-sm'
					placeholder={placeholder}
				/>
			</SelectTrigger>
			<SelectContent >
				{items.map(item => (
					<SelectItem
						value={item.value ? item.value : 'null'}
						key={item.value}
					>
						{item.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
