'use client'

import Image from 'next/image'
import Link from 'next/link'

import { StopLotButton, Timer } from '@/features'
import { BetItem } from '@/features/LotBet/components/BetItem'
import { ELotStatuses } from '@/generated/prisma'
import { SubmitModal } from '@/shared/components/modals'
import { formatDate } from '@/shared/helpers'
import { useLots } from '@/shared/hooks'
import { ILot } from '@/shared/types'

type Props = { lot: ILot }

export const BigLotItem = ({ lot }: Props) => {
	const { onFinish } = useLots()
	if (!lot) return null
	return (
		<div className='grid grid-cols-1 items-start gap-5 border-b pb-5 sm:grid-cols-2 sm:border-b-0 sm:pb-0 lg:flex'>
			<Link
				href={`/lots/${lot.id}`}
				className='relative h-[300px] w-full sm:h-[260px] sm:w-[280px]'
			>
				<Image
					className='object-cover'
					src={lot?.photos[0]}
					alt={lot?.name}
					fill
				/>
			</Link>
			<div className='flex-1 lg:border-r'>
				<h6 className='flex flex-col text-2xl font-bold'>
					<span className='block text-xs font-normal'>лот:</span>№{' '}
					{lot.id.split('-')[0]}
				</h6>
				<p className='mt-4 font-bold'>
					{lot.name}, {lot.year} г
				</p>
				<div className='mt-4 text-sm'>
					<p>
						Начальная цена:{' '}
						<span className='font-bold'>{lot.price}</span>
					</p>
					<p>
						Текущая цена:{' '}
						<span className='font-bold'>{lot.currentPrice}</span>
					</p>
				</div>
				<div className='mt-4'>
					<p>Начало торгов: {formatDate(String(lot.createdAt))}</p>
					<p>Завершение торгов: {formatDate(String(lot.endsAt))}</p>
				</div>
			</div>
			<div className='w-[400px]'>
				{lot.status === ELotStatuses.available &&
				new Date(lot.endsAt).getTime() > new Date().getTime() ? (
					<Timer time={lot.endsAt} />
				) : (
					<div className='flex flex-wrap gap-2 sm:col-span-2 lg:flex-col'>
						<p className='text-dop-cvet-zelenyy border-dop-cvet-zelenyy flex h-7 items-center justify-center gap-1 rounded-full border px-2.5 text-sm font-bold'>
							Лот завершён
						</p>
					</div>
				)}

				<div className='mt-5 flex flex-col gap-4'>
					{lot.bets && lot.bets.length ? (
						lot.bets.map(bet => <BetItem key={bet.id} bet={bet} />)
					) : (
						<p>Ставок нет</p>
					)}
				</div>
				{lot.status !== ELotStatuses.finished ? (
					<div className='mt-4 flex flex-col items-center justify-between'>
						<StopLotButton id={lot.id} />
						{lot.bets && lot.bets.length ? (
							<SubmitModal
								title='Завершить лот?'
								onConfirm={() =>
									onFinish(lot.id, lot.bets![0].userId)
								}
							>
								<button className='border-osnovnoy hover:bg-osnovnoy mt-6 w-full rounded-lg border px-4 py-3.5 text-center text-sm hover:text-white'>
									Завершить лот
									<span className='block font-bold'>
										Лидер:{' '}
										{lot.bets[0]?.user?.name || 'нет'}
									</span>
								</button>
							</SubmitModal>
						) : (
							''
						)}
					</div>
				) : (
					<p className='mt-10 text-xs'>
						ID победителя: {lot.winnerId}
					</p>
				)}
			</div>
		</div>
	)
}
