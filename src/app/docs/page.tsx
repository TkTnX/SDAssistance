import { File } from 'lucide-react'
import Link from 'next/link'

import { Breadcrumbs } from '@/shared/components'

const DocsPage = () => {
	return (
		<>
			<Breadcrumbs items={[{ name: 'Документация' }]} />
			<section className='container'>
				<h1 className='mt-4 text-2xl font-bold'>Список документов</h1>

				<div className='vsm:grid-cols-3 mt-10 grid grid-cols-2 items-center gap-5 sm:grid-cols-5 xl:grid-cols-6'>
					{[...new Array(16)].map((_, index) => (
						<Link
							className='flex w-fit flex-col gap-2 hover:opacity-80 justify-self-center'
							key={index}
							href={`/docs/${index + 1}`}
						>
							<File
								color='#757f8f'
								className='bg-[#f0f2f5] p-7 lg:h-[180px] lg:w-[180px]'
								size={96}
							/>
							<p className='text-center font-medium'>
								Документ {index + 1}
							</p>
						</Link>
					))}
				</div>
			</section>
		</>
	)
}

export default DocsPage
