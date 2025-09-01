import Image from 'next/image'
import Link from 'next/link'

export const Lot = () => {
	return (
		<Link href={'/lots/2112-0806'} className=''>
			<div className='relative h-[185px] w-full lg:h-[205px]'>
				<Image
					className='object-cover'
					src={'/images/lot.jpg'}
					alt='Lot'
					fill
				/>
				<p className='px-2.5 py-1.5 font-bold'>1 405 000.00</p>
			</div>
			<div className='bg-[#f0f2f5] px-5 py-4'>
				<h4 className='font-bold'>Hyundai Tucson, 2017 г</h4>
				<ul className='mt-2 text-xs'>
					<li>
						Лот: <span className='font-bold'>№2112-0806</span>
					</li>
					<li>
						Начальная цена:{' '}
						<span className='font-bold'>1 405 000.00</span>
					</li>
				</ul>
				<ul className='mt-2 flex flex-col flex-wrap gap-y-2 text-xs lg:flex-row lg:items-center lg:justify-center xl:flex-nowrap'>
					<li className='border-r-osnovnoy border-b text-nowrap lg:border-r lg:border-b-0 lg:pr-6'>
						12468 км
					</li>
					<li className='border-r-osnovnoy border-b text-nowrap lg:border-r lg:border-b-0 lg:px-6'>
						АКПП
					</li>
					<li className='border-r-osnovnoy border-b text-nowrap lg:border-r lg:border-b-0 lg:px-6'>
						Передний
					</li>
					<li className='border-b text-nowrap lg:border-b-0 lg:pl-6'>
						Дизель
					</li>
				</ul>
			</div>
		</Link>
	)
}
