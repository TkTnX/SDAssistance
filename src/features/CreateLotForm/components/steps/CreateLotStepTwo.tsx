import { LotInput } from '../lotInput'
import { LotSelect } from '../lotSelect'

import { Textarea } from '@/shared/components'
import {
	CAR_BODY_TYPES,
	CAR_DRIVE,
	CAR_ENGINE_TYPES,
	CAR_GEARBOX
} from '@/shared/constants'
import { useLotStore } from '@/shared/stores'

type Props = {
	step: number
	currentStep: number
}

export const CreateLotStepTwo = ({ step, currentStep }: Props) => {
	const setLotInfo = useLotStore(state => state.setLotInfo)
	if (step !== currentStep) return null
	return (
		<>
			
			<LotSelect name='bodyType' label='Кузов' required={true} items={CAR_BODY_TYPES} />
			{/* todo: в будущем добавить возможность выбирать цвет  */}
			<LotInput name='color' required={true} label='Цвет' type='text' />
			<LotInput
				name='mileage'
				required={true}
				label='Пробег, км'
				type='number'
			/>
			<LotInput name='damages' label='Повреждения' type='text' />
			<LotInput
				name='passport'
				required={true}
				label='Паспорт ПТС'
				type='text'
			/>
			<LotSelect
				name='engineType'
				label='Тип двигателя'
				required={true}
				items={CAR_ENGINE_TYPES}
			/>
			<LotInput
				name='volume'
				required={true}
				label='Объем двигателя'
				type='number'
			/>
			<LotSelect name='drive' label='Привод' required={true} items={CAR_DRIVE} />
			<LotSelect
				name='gearbox'
				label='Коробка передач'
				required={true}
				items={CAR_GEARBOX}
			/>
			

			<Textarea
				onChange={e => setLotInfo('comment', e.target.value)}
				className='min-h-52 w-full bg-white p-5'
				placeholder='Комментарий'
			/>
		</>
	)
}
