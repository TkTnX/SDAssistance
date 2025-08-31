import { LinkMain } from '@/shared/components'
import { Hero, LotsList } from '@/widgets'

export default function Home() {
	return (
		<>
			<Hero />
			<div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-6'>
				<h2 className='text-2xl font-bold'>Приступим к торгам?</h2>
				<LinkMain
					className='w-auto px-12'
					href='/auth/register'
					text='Зарегистрироваться'
				/>
			</div>
			<LotsList />
		</>
	)
}
