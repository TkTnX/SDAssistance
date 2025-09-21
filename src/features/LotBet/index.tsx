'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/shared/components'
import { formatPrice } from '@/shared/helpers'
import { useUserStore } from '@/shared/stores'
import { SellerLot } from './components/SellerLot'

type Props = {
	price: number
	currentPrice: null | number
	lotId: string
}

export const LotBet = ({ price, currentPrice, lotId }: Props) => {
	const [isYoursLot, setIsYoursLot] = useState(false)
	const [newLot, setNewLot] = useState(
		currentPrice ? currentPrice + currentPrice * 0.2 : price + price * 0.2
	)
	const user = useUserStore(state => state.user)
	const currentBet = currentPrice
		? currentPrice + currentPrice * 0.2
		: price + price * 0.2

	useEffect(() => {
		if (user?.lots.find(userLot => userLot.id === lotId)) {
			setIsYoursLot(true)
		} else {
			setIsYoursLot(false)
		}
	}, [user])

	return (
		<div className='mt-8'>
			{!isYoursLot && (
				<div className='rounded-lg bg-white p-7'>
					<p className='text-xs text-[#4e5766]'>Ваша ставка:</p>
					<h6 className='mt-5 text-2xl font-bold opacity-50'>
						{formatPrice(
							user?.bids.find(bid => bid.id === lotId)
								?.currentPrice || 0
						)}{' '}
					</h6>
				</div>
			)}
			<div className='mt-2 rounded-lg bg-white p-7'>
				{!isYoursLot ? (
					<>
						<p className='text-xs text-[#4e5766]'>
							Начальная цена:{' '}
							<span className='text-osnovnoy font-bold'>
								{formatPrice(price)}
							</span>
						</p>
						<p className='text-xs text-[#4e5766]'>
							Минимальная ставка:{' '}
							<span className='text-osnovnoy font-bold'>
								{formatPrice(currentBet)}
							</span>
						</p>
						<div className='vsm:flex mt-4 grid grid-cols-2 items-center justify-between rounded-lg border py-3'>
							<button
								onClick={() =>
									setNewLot(newLot - currentBet * 0.2)
								}
								disabled={currentBet === newLot}
								className='col-[1] border-r px-5 text-2xl disabled:pointer-events-none disabled:opacity-50 sm:text-4xl'
							>
								-
							</button>
							<p className='text-osnovnoy col-[1/3] row-[1] text-center text-lg font-bold opacity-30 sm:text-2xl'>
								{formatPrice(newLot)}
							</p>
							<button
								onClick={() =>
									setNewLot(newLot + currentBet * 0.2)
								}
								className='border-l px-5 text-2xl sm:text-4xl'
							>
								+
							</button>
						</div>
						<Button
							text='Сделать ставку'
							className='mt-3.5 h-auto w-full rounded-md py-3.5'
						/>
					</>
				) : (
					<SellerLot lotId={lotId} currentPrice={currentPrice} price={price} />
				)}
			</div>
		</div>
	)
}
