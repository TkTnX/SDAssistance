'use client'

import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { SellerLot } from './components/SellerLot'
import { Button } from '@/shared/components'
import { formatPrice } from '@/shared/helpers'
import { axiosInstance } from '@/shared/lib'
import { useUserStore } from '@/shared/stores'

type Props = {
	price: number
	currentPrice: null | number
	lotId: string
}

export const LotBet = ({ price, currentPrice, lotId }: Props) => {
	const [isYoursLot, setIsYoursLot] = useState(false)
	const [newBet, setNewBet] = useState(
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

	const onBet = async () => {
		try {
			const res = await axiosInstance.post(`/bets/${lotId}`, newBet)

			if (res.data.code !== 201) {
				return toast.error(res.data.message)
			}
			return toast.success(res.data.message)
		} catch (error) {
			console.log(error)
			if (isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data)
				}
			}
		}
	}

	return (
		<div className='mt-8'>
			{/* TODO: TEMP */}

			{isYoursLot && (
				<div className='rounded-lg bg-white p-7'>
					<p className='text-xs text-[#4e5766]'>Ваша ставка:</p>
					<h6 className='mt-5 text-2xl font-bold opacity-50'>
						{/* TODO: Находить последнюю ставку */}
						{formatPrice(
							user?.bets.find(bet => bet.lotId === lotId)?.bet ||
								0
						)}{' '}
					</h6>
				</div>
			)}
			<div className='mt-2 rounded-lg bg-white p-7'>
				{/* TODO: TEMP */}
				{isYoursLot ? (
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
									setNewBet(newBet - currentBet * 0.2)
								}
								disabled={currentBet === newBet}
								className='col-[1] border-r px-5 text-2xl disabled:pointer-events-none disabled:opacity-50 sm:text-4xl'
							>
								-
							</button>
							<p className='text-osnovnoy col-[1/3] row-[1] text-center text-lg font-bold opacity-30 sm:text-2xl'>
								{formatPrice(newBet)}
							</p>
							<button
								onClick={() =>
									setNewBet(newBet + currentBet * 0.2)
								}
								className='border-l px-5 text-2xl sm:text-4xl'
							>
								+
							</button>
						</div>
						<Button
							onClick={onBet}
							text='Сделать ставку'
							className='mt-3.5 h-auto w-full rounded-md py-3.5'
						/>
					</>
				) : (
					<SellerLot
						lotId={lotId}
						currentPrice={currentPrice}
						price={price}
					/>
				)}
			</div>
		</div>
	)
}
