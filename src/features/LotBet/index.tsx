'use client'

import { useState } from 'react'

import { formatPrice } from '@/shared/helpers'
import { useUserStore } from '@/shared/stores'
import { Button } from '@/shared/components'

type Props = {
	price: number
	currentPrice: null | number
	lotId: string
}

export const LotBet = ({ price, currentPrice, lotId }: Props) => {
	const [newLot, setNewLot] = useState(
		currentPrice ? currentPrice + currentPrice * 0.2 : price + price * 0.2
	)
	const user = useUserStore(state => state.user)
	const currentBet = currentPrice
		? currentPrice + currentPrice * 0.2
		: price + price * 0.2

	return (
		<div className='mt-8'>
			<div className='rounded-lg bg-white p-7'>
				<p className='text-xs text-[#4e5766]'>Ваша ставка:</p>
				<h6 className='mt-5 text-2xl font-bold opacity-50'>
					{formatPrice(
						user?.bids.find(bid => bid.id === lotId)
							?.currentPrice || 0
					)}{' '}
				</h6>
			</div>
			<div className='rounded-lg bg-white p-7 mt-2'>
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
				<div className='mt-4 flex items-center justify-between rounded-lg border py-3'>
					<button
						onClick={() => setNewLot(newLot - currentBet * 0.2)}
						disabled={currentBet === newLot}
						className='border-r px-5 text-4xl disabled:pointer-events-none disabled:opacity-50'
					>
						-
					</button>
					<p className='text-osnovnoy text-2xl font-bold opacity-30'>
						{formatPrice(newLot)}
					</p>
					<button
						onClick={() => setNewLot(newLot + currentBet * 0.2)}
						className='border-l px-5 text-4xl'
					>
						+
					</button>
        </div>
        <Button text='Сделать ставку' className='mt-3.5 w-full h-auto rounded-md py-3.5' />
			</div>
		</div>
	)
}
