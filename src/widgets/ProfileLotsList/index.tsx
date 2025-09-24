'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ELotStatuses } from '@/generated/prisma'
import { BigLotItem } from '@/shared/components'
import { cn } from '@/shared/lib'
import { useUserStore } from '@/shared/stores'

export const ProfileLotsList = () => {
	const [filterBy, setFilterBy] = useState<null | string>(null)
	const router = useRouter()
	const { user, isLoading } = useUserStore()

	useEffect(() => {
		if (!isLoading && !user) {
			return router.push('/')
		}
	}, [isLoading, router, user])

	if (!user) return null

	return (
		<div className='mt-10'>
			<div className='flex items-center gap-4'>
				<button
					className={cn('rounded-2xl border px-4 py-2', {
						'bg-osnovnoy text-white': filterBy === null
					})}
					onClick={() => setFilterBy(null)}
				>
					Все
				</button>
				<button
					className={cn('rounded-2xl border px-4 py-2', {
						'bg-osnovnoy text-white':
							filterBy === ELotStatuses.finished
					})}
					onClick={() => setFilterBy(ELotStatuses.finished)}
				>
					Завершённые
				</button>
				<button
					className={cn('rounded-2xl border px-4 py-2', {
						'bg-osnovnoy text-white':
							filterBy === ELotStatuses.available
					})}
					onClick={() => setFilterBy(ELotStatuses.available)}
				>
					Активные
				</button>
			</div>
			<div className='mt-5 flex flex-col gap-10'>
				{user.lots.length > 0 ? (
					filterBy === null ? (
						user.lots.map(lot => (
							<BigLotItem key={lot.id} lot={lot} />
						))
					) : (
						user.lots
							.filter(lot => lot.status === filterBy)
							.map(lot => <BigLotItem key={lot.id} lot={lot} />)
					)
				) : (
					<p className='py-5 text-center font-bold'>
						У вас нет ставок
					</p>
				)}
			</div>
		</div>
	)
}
