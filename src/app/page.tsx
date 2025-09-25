import { Suspense } from 'react'

import { LinkMain } from '@/shared/components'
import { BiddingInfo, Hero, Instruction, LotsList } from '@/widgets'

export default function Home() {
	return (
		<>
			<Hero />
			<div className='mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row'>
				<h2 className='text-2xl font-bold'>Приступим к торгам?</h2>
				<LinkMain
					className='w-auto px-12'
					href='/auth/register'
					text='Зарегистрироваться'
				/>
			</div>
			<Suspense>
				<LotsList />
			</Suspense>
			<BiddingInfo />
			<Instruction />
		</>
	)
}
