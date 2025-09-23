import { BetItem } from '@/features/LotBet/components/BetItem'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/shared/components/ui'
import { formatPrice } from '@/shared/helpers'
import { IBet } from '@/shared/types'

type Props = {
	children: React.ReactNode
	currentPrice: number
	defaultPrice: number
	bets: IBet[]
}

export const SeeAllBets = ({
	children,
	currentPrice,
	defaultPrice,
	bets
}: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						<p className='text-xs'>Текущая цена</p>
						<div className='mt-5 flex items-end gap-2'>
							{formatPrice(currentPrice)}{' '}
							<span className='text-xl line-through opacity-50'>
								{formatPrice(defaultPrice)}
							</span>
						</div>
					</AlertDialogTitle>
				</AlertDialogHeader>

				<div>
					<p className='border-b pb-3 text-xs text-[#4e5766]'>
						Последние ставки:
					</p>
					<div className='mt-6 flex flex-col gap-3.5'>
						{bets.map(bet => (
							<BetItem key={bet.id} bet={bet} />
						))}
					</div>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
