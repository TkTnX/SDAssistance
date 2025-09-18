'use client'

import { Check } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { LotStepButton } from '@/features'
import { Button } from '@/shared/components'
import { LOT_STEPS } from '@/shared/constants'
import { cn } from '@/shared/lib'
import { useLotStore } from '@/shared/stores'

export const CreateLotMenu = () => {
	const { step, onCreate } = useLotStore(
		useShallow(state => ({
			step: state.step,
			onCreate: state.onCreate
		}))
	)
	return (
		<div className='flex h-auto flex-col justify-between gap-8 md:max-w-[226px]'>
			<div className='bg-dopolnitelnyy text-text-2 flex h-full gap-10 overflow-x-auto rounded-xl py-8 pr-8 pl-7 text-sm md:flex-col'>
				{LOT_STEPS.map((item, index) => (
					<div
						key={index}
						className='relative flex items-center gap-2'
					>
						{step > index ? (
							<div className='bg-dop-cvet-zelenyy z-10 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full opacity-100'>
								<Check color='#fff' size={12} />
							</div>
						) : (
							<div
								className={cn(
									'bg-dopolnitelnyy z-10 flex min-h-[22px] min-w-[22px] items-center justify-center rounded-full border text-xs font-medium opacity-90',
									{
										'text-osnovnoy border-osnovnoy opacity-100':
											index === step
									}
								)}
							>
								{index + 1}
							</div>
						)}

						{/* LINE */}
						{index < LOT_STEPS.length - 1 && (
							<div className='bg-osnovnoy/40 absolute top-[1px] left-2.5 mt-2 hidden h-25 w-px md:block' />
						)}

						<p
							className={cn(
								'text-nowrap opacity-90 md:text-wrap',
								{
									'text-osnovnoy': step === index,
									'text-dop-cvet-zelenyy font-medium opacity-100':
										step > index
								}
							)}
						>
							{item}
						</p>
					</div>
				))}
			</div>
			<div className='flex flex-wrap items-center gap-2'>
				{step > 0 && <LotStepButton action='prev' />}
				{step !== LOT_STEPS.length - 1 && (
					<LotStepButton action='next' />
				)}
				{step === LOT_STEPS.length - 1 && (
					<Button
						onClick={onCreate}
						className='h-12 w-full flex-1 rounded-sm px-3.5 py-5 text-sm text-nowrap'
						text='Запустить лот'
					/>
				)}
			</div>
		</div>
	)
}
