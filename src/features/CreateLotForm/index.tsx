'use client';

import {
	CreateLotStepOne,
	CreateLotStepThree,
	CreateLotStepTwo
} from './components/steps'
import { useLotStore } from '@/shared/stores';





export const CreateLotForm = () => {
	const step = useLotStore(state => state.step)
	return (
		<div className='flex flex-col gap-3'>
			<CreateLotStepOne step={0} currentStep={step} />
			<CreateLotStepTwo step={1} currentStep={step} />
			<CreateLotStepThree step={2} currentStep={step} />
		</div>
	)
}