'use client'

import { Button } from '@/shared/components'
import { cn } from '@/shared/lib'
import { useLotStore } from '@/shared/stores'

type Props = {
	action: 'prev' | 'next'
}

export const LotStepButton = ({ action }: Props) => {
	const { step, setStep } = useLotStore()
	return (
		<Button
			className={cn(' flex-1 rounded-sm px-3.5 py-5  h-12', {
				'border border-osnovnoy text-osnovnoy bg-white': action === 'prev'
			})}
			text={action === 'prev' ? 'Назад' : 'Далее'}
			onClick={() => setStep(action === 'prev' ? step - 1 : step + 1)}
		/>
	)
}
