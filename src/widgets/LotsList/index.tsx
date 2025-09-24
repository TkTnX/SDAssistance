'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { LotsFilters } from './components'
import { Lot } from '@/entities'
import { Pagination } from '@/features'
import { Button, LinkMain, Skeleton } from '@/shared/components'
import { useLots } from '@/shared/hooks'

export const LotsList = () => {
	const pathname = usePathname()
	const isLotsPage = pathname.includes('lots')
	const { error, isLoading, lots, fetchLots } = useLots()
	const searchParams = useSearchParams()
	useEffect(() => {
		const getData = async () => {
			fetchLots()
		}

		getData()
	}, [searchParams])

	if (error) return <p className='error'>{error}</p>

	return (
		<section className='mt-8'>
			<LotsFilters />

			<div className='container mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
				{isLoading && !lots && !error
					? [...new Array(9)].map((_, index) => (
							<Skeleton
								key={index}
								className='h-[380px] w-full'
							/>
						))
					: lots && lots.data.length > 0
						? lots?.data.map(lot => <Lot key={lot.id} lot={lot} />)
						: !isLoading &&
							lots?.data.length === 0 && (
								<p className='col-span-3 py-10 text-center font-bold'>
									Лоты не найдены!
								</p>
							)}
			</div>

			{lots?.page !== lots?.totalPages &&
				(isLotsPage ? (
					<Button
						className='mx-auto mt-5 w-[180px]'
						text='Показать ещё'
					/>
				) : (
					lots?.data.length && (
						<LinkMain
							className='mx-auto mt-5'
							href='/lots'
							text='Показать ещё'
						/>
					)
				))}
			{lots && (
				<Pagination page={lots.page} totalPages={lots.totalPages} />
			)}
		</section>
	)
}
