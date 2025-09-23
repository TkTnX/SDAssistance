import { BetItem } from './BetItem'
import { SeeAllBets, SubmitModal } from '@/shared/components/modals'
import { formatPrice } from '@/shared/helpers'
import { useLots } from '@/shared/hooks'
import { IBet } from '@/shared/types'

type Props = {
	price: number
	currentPrice: null | number
	lotId: string
	bets: IBet[] | null
}

export const SellerLot = ({ price, currentPrice, lotId, bets }: Props) => {
	const { onFinish } = useLots()

	return (
		<>
			<div className='flex flex-col gap-2.5'>
				<p className='text-xs text-[#4e5766]'>Текущая цена: </p>
				<p className='text-osnovnoy text-2xl font-bold'>
					{currentPrice ? (
						<>
							{formatPrice(currentPrice)}{' '}
							<span className='text-xl line-through opacity-50'>
								{formatPrice(price)}
							</span>
						</>
					) : (
						formatPrice(price)
					)}
				</p>
			</div>
			<div className='mt-9'>
				<p className='border-b pb-3 text-xs text-[#4e5766]'>
					Последние ставки:{' '}
				</p>

				<div className='mt-5 flex flex-col gap-4'>
					{bets ? (
						bets.map(bet => <BetItem key={bet.id} bet={bet} />)
					) : (
						<p>Ставок нет</p>
					)}
				</div>
				{bets && bets.length > 3 && (
					<SeeAllBets
						currentPrice={currentPrice || price}
						defaultPrice={price}
						bets={bets}
					>
						<button className='border-osnovnoy hover:bg-osnovnoy mt-6 w-full rounded-lg border py-3.5 text-center text-sm hover:text-white'>
							Посмотреть все ставки
						</button>
					</SeeAllBets>
				)}
				{bets && (
					<SubmitModal
						title='Завершить лот?'
						onConfirm={() => onFinish(lotId, bets[0].userId)}
					>
						<button className='border-osnovnoy hover:bg-osnovnoy mt-6 w-full rounded-lg border px-4 py-3.5 text-center text-sm hover:text-white'>
							Завершить лот
							<span className='block font-bold'>
								Лидер: {bets[0].user?.name}
							</span>
						</button>
					</SubmitModal>
				)}
			</div>
		</>
	)
}
