import { LotInput } from '../lotInput'
import { LotSelect } from '../lotSelect'

import { Textarea } from '@/shared/components'
import {
	CAR_BODY_TYPES,
	CAR_DRIVE,
	CAR_ENGINE_TYPES,
	CAR_GEARBOX
} from '@/shared/constants'

type Props = {
	step: number
	currentStep: number
}

export const CreateLotStepTwo = ({ step, currentStep }: Props) => {
	if (step !== currentStep) return null
	return (
		<>
			<LotSelect label='Кузов' required={true} items={CAR_BODY_TYPES} />
			{/* todo: в будущем добавить возможность выбирать цвет  */}
			<LotInput required={true} label='Цвет' type='text' />
			<LotInput required={true} label='Пробег, км' type='number' />
			<LotInput label='Повреждения' type='text' />
			<LotInput required={true} label='Паспорт ПТС' type='text' />
			<LotSelect
				label='Тип двигателя'
				required={true}
				items={CAR_ENGINE_TYPES}
			/>
			<LotInput required={true} label='Объем двигателя' type='number' />
			<LotSelect label='Привод' required={true} items={CAR_DRIVE} />
			<LotSelect
				label='Коробка передач'
				required={true}
				items={CAR_GEARBOX}
			/>
			<Textarea
				className='min-h-52 w-full bg-white p-5'
				placeholder='Комментарий'
			/>
		</>
	)
}
