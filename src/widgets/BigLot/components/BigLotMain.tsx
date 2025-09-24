import { CalendarDaysIcon, Clock } from 'lucide-react'
import Link from 'next/link'

import { BigLotImages } from './BigLotImages'
import { LotBet, Timer } from '@/features'
import { ELotStatuses } from '@/generated/prisma'
import { CAR_ENGINE_TYPES, CAR_GEARBOX } from '@/shared/constants'
import { findSettings } from '@/shared/helpers'
import { ILot } from '@/shared/types'

export const BigLotMain = ({ lot }: { lot: ILot }) => {
	return (
		<div className='bg-dopolnitelnyy container mt-9 flex flex-col items-stretch gap-7 rounded-lg !p-2 sm:!p-8 lg:flex-row'>
			<BigLotImages images={lot.photos} />
			<div>
				<div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0'>
					<h4 className='text-text-1 text-3xl font-bold'>
						{lot.name}
					</h4>
					<Timer time={lot.endsAt} />
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
				<div className='mt-7 grid grid-cols-2 gap-4 text-sm text-[#4e5766]'>
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
				{lot.status !== ELotStatuses.finished ? (
					<LotBet
						lotId={lot.id}
						price={lot.price}
						currentPrice={lot.currentPrice}
					/>
				) : (
					<div className=''>
						<p className='py-4 text-center font-bold'>
							Лот завершён
							</p>
							<p>ID победителя: {lot.winnerId}</p>
					</div>
				)}
			</div>
		</div>
	)
}
