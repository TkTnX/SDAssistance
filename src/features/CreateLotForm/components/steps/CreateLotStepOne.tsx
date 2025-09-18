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
			<LotInput name='name' label='Название автомобиля' required={true} />

			<LotInput name='vin' label='VIN номер' required={true} />
			<LotInput name='frame' label='Frame номер' />
			<LotSelect
				name='carType'
				label='Тип авто'
				required={true}
				items={CAR_TYPES}
			/>
			<LotInput
				name='year'
				required={true}
				label='Год выпуска'
				type='number'
			/>
			<LotInput name='power' label='Мощность' required={true} />
		</>
	)
}
