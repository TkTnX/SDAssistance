import { ILot } from '@/shared/types'
import { BigLotInfo, BigLotMain, BigLotTop } from './components'

export const BigLot = ({ lot }: { lot: ILot }) => {
	return <div className=''>
		<BigLotTop lot={lot} />
		<BigLotMain lot={lot} />
		<BigLotInfo lot={lot} />
	</div>
}
