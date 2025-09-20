import { LotInput } from '../lotInput'
import { LotSelect } from '../lotSelect'

import { CAR_INSURANCE } from '@/shared/constants'

type Props = {
	step: number
	currentStep: number
}

export const CreateLotDocsInfo = ({ step, currentStep }: Props) => {
	if (step !== currentStep) return null
	return (
		<>
			<LotInput required name='region' label='Регион' />
			<LotInput required name='city' label='Город' />
			<LotSelect
				required
				items={CAR_INSURANCE}
				label='Вид страховки'
				name='insurance'
			/>
			<LotInput
				name='price'
				required={true}
				label='Начальная цена'
				type='number'
			/>
		</>
	)
}
