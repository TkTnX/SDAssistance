'use client'

import { Button } from '@/shared/components'
import { formatPrice } from '@/shared/helpers'
import { useUserStore } from '@/shared/stores'

export const ProfileBalance = () => {
	const user = useUserStore(state => state.user)
	return (
		<div className='mt-5 bg-[#f0f2f5] p-7'>
			<h4 className='text-2xl font-bold'>Баланс</h4>
			<p className='mt-2.5 text-xs text-[#757f8f]'>
				Неизрасходованная часть средств будет возвращена в случае
				расторжения договора
			</p>

			<div className='mt-10 flex flex-wrap items-center justify-between gap-4'>
				<p className='text-2xl font-bold text-[#757f8f] md:text-7xl'>
					{formatPrice(user?.balance || 0)}
				</p>
				<Button text='Скачать счёт на оплату' className='px-4' />
			</div>
		</div>
	)
}
