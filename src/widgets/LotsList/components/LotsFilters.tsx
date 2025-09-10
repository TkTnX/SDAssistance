'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LotsSort } from '@/features'
import { SelectMain } from '@/shared/components'
import { CAR_TYPES, SORT_BY } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'


export const LotsFilters = () => {
	const pathname = usePathname()
	return (
		<>
			<div className='hidden sm:block'>
				<div className='flex items-center justify-center bg-[#f0f2f5] py-4 lg:h-[60px] lg:py-0'>
					<ul className='container flex flex-wrap items-center justify-center gap-y-3'>
						{CAR_TYPES.map(item => (
							<li
								className='border-osnovnoy not-last:border-r'
								key={item.value}
							>
								<Link
									className={cn('block h-full px-7 text-sm', {
										'font-bold': pathname.includes(
											item.value
										)
									})}
									href={`${item.value ? `/lots?carType=${item.value}` : '/lots'}`}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className='mt-3 border-b lg:mt-0'>
					<LotsSort  />
				</div>
			</div>

			<div className='flex sm:hidden'>
				<SelectMain items={CAR_TYPES} placeholder='Вид' />
				<SelectMain items={SORT_BY} placeholder='Сортировка' />
			</div>
		</>
	)
}
