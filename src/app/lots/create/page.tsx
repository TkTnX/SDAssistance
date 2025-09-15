import { CreateLotForm } from '@/features'
import { Breadcrumbs } from '@/shared/components'
import { CreateLotMenu } from '@/widgets'

const CreateLotPage = () => {
	return (
		<>
			<Breadcrumbs items={[{ name: 'Создание лота' }]} />
			<section className='container mt-6'>
				<h2 className='text-text-1 text-3xl font-bold'>
					Размещение лота
				</h2>
				<div className='mt-8 flex flex-col-reverse items-stretch gap-3 md:flex-row'>
					<div className='bg-dopolnitelnyy flex-1 rounded-xl p-2.5 md:p-10'>
						<CreateLotForm />
					</div>
					<CreateLotMenu />
				</div>
			</section>
		</>
	)
}

export default CreateLotPage
