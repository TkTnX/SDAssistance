import { CalendarDaysIcon, Clock } from 'lucide-react'
import Link from 'next/link'

import { BigLotImages } from './BigLotImages'
import { CAR_ENGINE_TYPES, CAR_GEARBOX } from '@/shared/constants'
import { findSettings } from '@/shared/helpers'
import { ILot } from '@/shared/types'
import { LotBet } from '@/features'

export const BigLotMain = ({ lot }: { lot: ILot }) => {
	return (
		<div className='bg-dopolnitelnyy container mt-9 flex items-stretch gap-7 rounded-lg !p-8'>
			<BigLotImages images={lot.photos} />
			<div>
				<div className='flex items-center justify-between'>
					<h4 className='text-text-1 text-3xl font-bold'>
						{lot.name}
					</h4>
					{/* TODO: Сделать отcчёт */}
					<div className='text-dop-cvet-zelenyy border-dop-cvet-zelenyy flex h-7 items-center gap-1 rounded-full border px-2.5 text-sm font-bold'>
						<Clock size={14} color='var(--dop-cvet-zelenyy)' />
						0д 5ч 5мин
					</div>
				</div>
				<p className='mt-6 text-sm text-[#4e5766]'>
					Продавец:{' '}
					<Link
						className='text-text-1 font-medium'
						href={`/seller/${lot.seller?.id}`}
					>
						{lot.seller?.name}
					</Link>
				</p>
				<p className='mt-6 flex items-center gap-2 text-sm text-[#4e5766]'>
					Дата и время окончания:{' '}
					<span className='text-osnovnoy flex items-center gap-1 font-medium'>
						<CalendarDaysIcon
							size={14}
							color='var(--osnovnoy-cvet)'
						/>

						{new Date(lot.endsAt).toLocaleDateString('ru-RU', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric'
						})}
					</span>
					<span className='text-osnovnoy flex items-center gap-1 font-medium'>
						<Clock size={14} color='var(--osnovnoy-cvet)' />
						{new Date(lot.endsAt).toLocaleTimeString('ru-RU', {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</span>
				</p>
				<div className='grid grid-cols-2 gap-4 text-sm text-[#4e5766] mt-7'>
					<p>
						Год выпуска:{' '}
						<span className='text-text-1 font-bold'>
							{lot.year}
						</span>
					</p>
					<p>
						КПП:{' '}
						<span className='text-text-1 font-bold'>
							{findSettings(CAR_GEARBOX, String(lot.gearbox))}
						</span>
					</p>
					<p>
						Пробег:{' '}
						<span className='text-text-1 font-bold'>
							{lot.mileage} км
						</span>
					</p>
					<p>
						Двигатель:{' '}
						<span className='text-text-1 font-bold'>
							{lot.volume} л | {lot.power}л.с. |{' '}
							{findSettings(
								CAR_ENGINE_TYPES,
								String(lot.engineType)
							)}
						</span>
					</p>
				</div>
				<LotBet lotId={lot.id} price={lot.price} currentPrice={lot.currentPrice} />
			</div>
		</div>
	)
}
