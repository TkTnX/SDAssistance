import { LotsList } from '@/widgets'
import { Suspense } from 'react'

const LotsPage = () => {
	return (
		<>
			<h2 className='text-2xl font-bold container'>Активные лоты</h2>
			<Suspense>
				<LotsList />
			</Suspense>
		</>
	)
}

export default LotsPage
