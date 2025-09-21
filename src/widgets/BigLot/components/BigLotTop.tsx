'use client'

import { CopyButton, StopLotButton } from '@/features'
import { useUserStore } from '@/shared/stores'
import { ILot } from '@/shared/types'

export const BigLotTop = ({ lot }: { lot: ILot }) => {
	const user = useUserStore(state => state.user)
	return (
		<div className='container mt-3.5 flex items-center justify-between'>
			<h1 className='text-3xl font-bold text-black'>
				Лот № {lot.id.split('-')[0]}
			</h1>
			<div className='flex items-center gap-2'>
				<CopyButton id={lot.id} />
				{user?.lots.find(userLot => userLot.id === lot.id) && (
					<StopLotButton id={lot.id} />
				)}
			</div>
		</div>
	)
}
