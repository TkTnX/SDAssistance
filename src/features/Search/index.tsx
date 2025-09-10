'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Input } from '@/shared/components'
import { FormEvent } from 'react'

export const Search = () => {
	const router = useRouter()
	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const search = formData.get('search')
console.log(search)
		router.push(`/lots?search=${search}`)

	}

	return (
		<form onSubmit={(e) => onSubmit(e)} className='flex h-[60px] items-center border-2'>
			<Input
				name='search'
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
