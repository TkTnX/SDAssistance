import { BigBetItem } from '@/shared/components';
import { IBet } from '@/shared/types';





type Props = {
	bets: IBet[]
	userId: string
}

export const BetsList = ({ bets, userId }: Props) => {
	return (
		<div className='flex flex-col gap-10 mt-5'>
			{bets.length > 0 ? (
				bets.map(bet => (
					<BigBetItem userId={userId} key={bet.id} bet={bet} />
				))
			) : (
				<p className='py-5 text-center font-bold'>У вас нет ставок</p>
			)}
		</div>
	)
}