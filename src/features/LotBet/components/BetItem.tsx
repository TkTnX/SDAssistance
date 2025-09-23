import { formatPrice } from "@/shared/helpers"
import { IBet } from "@/shared/types"

export const BetItem = ({bet}: {bet: IBet}) => {
	return (
		<div
			className='vsm:border-0 vsm:pb-0 flex flex-wrap items-center justify-between gap-2 border-b border-dashed pb-2 text-xs'
		>
			<p className='text-[#4e5766]'>{bet.user?.name}</p>
			<p>
				{new Date(bet.createdAt).toLocaleDateString('ru-RU', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				})}{' '}
				{new Date(bet.createdAt).toLocaleTimeString('ru-RU', {
					minute: '2-digit',
					hour: '2-digit'
				})}
			</p>
			<p className='font-bold'>{formatPrice(bet.bet)}</p>
		</div>
	)
}
