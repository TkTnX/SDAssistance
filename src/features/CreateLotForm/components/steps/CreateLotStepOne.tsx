import { LotInput } from '../lotInput'
import { LotSelect } from '../lotSelect'

import { CAR_TYPES } from '@/shared/constants'

type Props = {
	step: number
	currentStep: number
}

export const CreateLotStepOne = ({ step, currentStep }: Props) => {
	if (step !== currentStep) return null
	return (
		<>
			<LotInput label='VIN номер' required={true} />
			<LotInput label='Frame номер' />
			<LotSelect label='Тип авто' required={true} items={CAR_TYPES} />
			<LotInput required={true} label='Год выпуска' type='number' />
		</>
	)
}
