'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SORT_BY } from '@/shared/constants'
import { cn } from '@/shared/lib'



export const LotsSort = () => {
	const pathname = usePathname()

	return (
		<ul className='container flex flex-wrap items-center gap-y-3 lg:h-[60px]'>
			{SORT_BY.map(item => (
				<li
					className='border-osnovnoy not-last:border-r'
					key={item.value}
				>
					<Link
						className={cn('block h-full px-7 text-sm', {
							'font-bold':
								pathname.includes(item.value) ||
								(pathname === '/' && item.value === 'popular')
						})}
						href={`/lots?sortBy=${item.value}`}
					>
						{item.name}
					</Link>
				</li>
			))}
		</ul>
	)
}
