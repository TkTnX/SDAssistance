import { formatPrice } from '@/shared/helpers'

type Props = {
	price: number
	currentPrice: null | number
	lotId: string
}

export const SellerLot = ({ price, currentPrice, lotId }: Props) => {
	return (
		<>
			<div className='flex flex-col gap-2.5'>
				<p className='text-xs text-[#4e5766]'>Текущая цена: </p>
				<p className='text-osnovnoy text-2xl font-bold'>
					{currentPrice ? (
						<>
							{formatPrice(currentPrice)}
							<span className='text-xl line-through opacity-50'>
								{formatPrice(price)}
							</span>
						</>
					) : (
						formatPrice(price)
					)}
				</p>
			</div>
			{/* TODO: Получать bets и выводить их тут */}
			<div className='mt-9'>
				<p className='border-b pb-3 text-xs text-[#4e5766]'>
					Последние ставки:{' '}
				</p>

				<div className='mt-5 flex flex-col gap-4'>
					<div className='flex flex-wrap gap-2 border-b border-dashed vsm:border-0 pb-2 vsm:pb-0 items-center justify-between text-xs'>
						<p className='text-[#4e5766]'>Участник 8</p>
						<p>18.12.2021 18:44</p>
						<p className='font-bold'>{formatPrice(1405000)}</p>
					</div>
					<div className='flex flex-wrap gap-2 border-b border-dashed vsm:border-0 pb-2 vsm:pb-0 items-center justify-between text-xs'>
						<p className='text-[#4e5766]'>Участник 7</p>
						<p>18.12.2021 18:44</p>
						<p className='font-bold'>{formatPrice(1405000)}</p>
					</div>
					<div className='flex flex-wrap gap-2 border-b border-dashed vsm:border-0 pb-2 vsm:pb-0 items-center justify-between text-xs'>
						<p className='text-[#4e5766]'>Участник 6</p>
						<p>18.12.2021 18:44</p>
						<p className='font-bold'>{formatPrice(1405000)}</p>
					</div>
				</div>
				<button className='border-osnovnoy hover:bg-osnovnoy mt-6 w-full rounded-lg border py-3.5 text-center text-sm hover:text-white'>
					Посмотреть все ставки
				</button>
			</div>
		</>
	)
}
