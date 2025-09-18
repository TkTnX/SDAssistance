'use client';

import {
	CreateLotDocsInfo,
	CreateLotStepOne,
	CreateLotStepThree,
	CreateLotStepTwo
} from './components/steps'
import { useLotStore } from '@/shared/stores';





export const CreateLotForm = () => {
	const step = useLotStore(state => state.step)
	return (
		<div className='flex flex-col gap-3'>
			<CreateLotDocsInfo step={0} currentStep={step} />
			<CreateLotStepOne step={1} currentStep={step} />
			<CreateLotStepTwo step={2} currentStep={step} />
			<CreateLotStepThree step={3} currentStep={step} />
		</div>
	)
}