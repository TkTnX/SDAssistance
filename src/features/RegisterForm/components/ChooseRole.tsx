import { Dispatch, SetStateAction } from 'react'

import { $Enums, EUserRoles } from '@/generated/prisma'
import { cn } from '@/shared/lib'

type Props = {
	setActiveRole: Dispatch<SetStateAction<$Enums.EUserRoles>>
	activeRole: EUserRoles
}

export const ChooseRole = ({ setActiveRole, activeRole }: Props) => {
	return (
		<div className='mt-12'>
			<h3 className='text-2xl font-bold'>Моя роль в аукционе</h3>
			<label className='mt-5 flex items-center gap-2'>
				<input
					hidden={true}
					type='checkbox'
					name='role'
					value={EUserRoles.seller}
				/>
				<button
					onClick={() => setActiveRole(EUserRoles.seller)}
					className='flex items-center gap-2'
					type='button'
				>
					<div
						className={cn(
							'h-6 w-6 rounded-full border-2 border-[#f0f2f5]',
							{
								'bg-osnovnoy ring-2':
									activeRole === EUserRoles.seller
							}
						)}
					/>{' '}
					Продавец имущества
				</button>
			</label>
			<label className='flex items-center gap-2'>
				<input
					hidden={true}
					type='checkbox'
					name='role'
					value={EUserRoles.auctioneer}
				/>
				<button
					onClick={() => setActiveRole(EUserRoles.auctioneer)}
					className='mt-4 flex items-center gap-2'
					type='button'
				>
					<div
						className={cn(
							'h-6 w-6 rounded-full border-2 border-[#f0f2f5]',
							{
								'bg-osnovnoy ring-2':
									activeRole === EUserRoles.auctioneer
							}
						)}
					/>{' '}
					Покупатель имущества
				</button>
			</label>
			<p className='mt-5 text-xs text-[#e52e4d]'>
				Обращаем ваше внимание, что пользователь на аукционе может быть
				либо продавцом, либо покупателем.
			</p>
		</div>
	)
}
