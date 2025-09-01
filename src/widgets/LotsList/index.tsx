'use client'

import { LotsFilters } from './components'
import { Lot } from '@/entities'
import { LinkMain, Skeleton } from '@/shared/components'
import { useLots } from '@/shared/hooks'

export const LotsList = () => {
	const { error, isLoading, lots } = useLots()

	if (error) return <p className='error'>{error}</p>

	return (
		<section className='mt-8'>
			<LotsFilters />

			<div className='container mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
				{isLoading ? (
					[...new Array(9)].map((_, index) => (
						<Skeleton key={index} className='h-[380px] w-full' />
					))
				) : lots.length > 0 ? (
					lots.map(lot => <Lot key={lot.id} lot={lot} />)
				) : (
					<p className='col-span-3 py-10 text-center font-bold'>
						Лоты не найдены!
					</p>
				)}
			</div>

			<LinkMain
				className='mx-auto mt-5'
				href='/lots'
				text='Показать ещё'
			/>
		</section>
	)
}
