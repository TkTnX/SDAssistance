import { CopyButton } from '@/features'
import { ILot } from '@/shared/types'

export const BigLotTop = ({ lot }: { lot: ILot }) => {
	return (
		<div className='container mt-3.5 flex items-center justify-between'>
			<h1 className='text-3xl font-bold text-black'>
				Лот № {lot.id.split('-')[0]}
			</h1>
			<CopyButton id={lot.id} />
		</div>
	)
}
