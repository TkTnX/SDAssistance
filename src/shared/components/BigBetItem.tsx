import Image from 'next/image'
import Link from 'next/link'

import { Timer } from '@/features'
import { ELotStatuses } from '@/generated/prisma'
import { formatDate } from '@/shared/helpers'
import { IBet } from '@/shared/types'

type Props = { bet: IBet; userId: string }

export const BigBetItem = ({ bet, userId }: Props) => {
	if (!bet.lot) return null
	return (
		<div className='grid grid-cols-1 items-start gap-5 border-b pb-5 sm:grid-cols-2 sm:border-b-0 sm:pb-0 lg:flex'>
			<Link
				href={`/lots/${bet.lotId}`}
				className='relative h-[300px] w-full sm:h-[260px] sm:w-[280px]'
			>
				<Image
					className='object-cover'
					src={bet.lot?.photos[0]}
					alt={bet.lot?.name}
					fill
				/>
			</Link>
			<div className='flex-1 lg:border-r'>
				<h6 className='flex flex-col text-2xl font-bold'>
					<span className='block text-xs font-normal'>лот:</span>№{' '}
					{bet.lotId.split('-')[0]}
				</h6>
				<p className='mt-4 font-bold'>
					{bet.lot.name}, {bet.lot.year} г
				</p>
				<p className='mt-4 text-sm'>Продавец: {bet.lot.seller?.name}</p>
				<div className='mt-4 text-sm'>
					<p>
						Начальная цена:{' '}
						<span className='font-bold'>{bet.lot.price}</span>
					</p>
					<p>
						Текущая цена:{' '}
						<span className='font-bold'>
							{bet.lot.currentPrice}
						</span>
					</p>
				</div>
				<div className='mt-4'>
					<p>
						Начало торгов: {formatDate(String(bet.lot.createdAt))}
					</p>
					<p>
						Завершение торгов: {formatDate(String(bet.lot.endsAt))}
					</p>
				</div>
			</div>
			{bet.lot.status === ELotStatuses.available ? (
				<p>
					До конца лота: <Timer time={bet.lot.endsAt} />
				</p>
			) : (
				<div className='flex flex-wrap gap-2 sm:col-span-2 lg:flex-col'>
					<p className='text-dop-cvet-zelenyy justify-center border-dop-cvet-zelenyy flex h-7 items-center gap-1 rounded-full border px-2.5 text-sm font-bold'>
						Лот завершён
					</p>
					<p className='text-dop-cvet-2 justify-center border-dop-cvet-2 flex h-7 items-center gap-1 rounded-full border px-2.5 text-sm font-bold'>
						Вы{' '}
						{bet.lot.winnerId === userId
							? 'выиграли лот'
							: 'не выиграли лот'}
					</p>
					{bet.lot.winnerId === userId && (
						<div className='flex flex-col'>
							<p>Связаться с продавцом: </p>
							<a
								href={`mailto:${bet.lot.seller?.email}`}
								className='hover:opacity-80'
							>
								Почта
							</a>
							<a
								href={`mailto:${bet.lot.seller?.phone}`}
								className='hover:opacity-80'
							>
								Телефон
							</a>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
