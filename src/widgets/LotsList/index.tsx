import { LotsFilters } from './components'
import { Lot } from '@/entities'
import { LinkMain } from '@/shared/components'

export const LotsList = () => {
	// TODO: Получать автомобили с БД

	return (
		<section className='mt-8'>
			<LotsFilters />

			<div className='container mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3'>
				<Lot />
				<Lot />
				<Lot />
				<Lot />
				<Lot />
				<Lot />
			</div>

			<LinkMain
				className='mx-auto mt-5'
				href='/lots'
				text='Показать ещё'
			/>
		</section>
	)
}
