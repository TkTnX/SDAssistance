import Image from 'next/image'
import Link from 'next/link'

import { CAR_DRIVE, CAR_ENGINE_TYPES, CAR_GEARBOX } from '@/shared/constants'
import { findSettings, formatPrice } from '@/shared/helpers'
import { ILot } from '@/shared/types'

type Props = {
	lot: ILot
}

export const Lot = ({ lot }: Props) => {
	return (
		<Link href={`/lots/${lot.id}`} className=''>
			<div className='relative h-[185px] w-full lg:h-[205px]'>
				<Image
					className='object-cover'
					src={lot.photos[0]}
					
					alt={lot.name}
					fill
				/>
				<p className='px-2.5 py-1.5 font-bold'>{formatPrice(lot.price)}</p>
			</div>
			<div className='bg-[#f0f2f5] px-5 py-4'>
				<h4 className='font-bold'>
					{lot.name}, {lot.year} г
				</h4>
				<ul className='mt-2 text-xs'>
					<li>
						Лот: <span className='font-bold'>№{lot.id.split('-')[0]}</span>
					</li>
					<li>
						Начальная цена:{' '}
						<span className='font-bold'>{formatPrice(lot.price)}</span>
					</li>
				</ul>
				<ul className='mt-2 flex flex-col flex-wrap gap-y-2 text-xs lg:flex-row lg:items-center lg:justify-center'>
					<li className='border-r-osnovnoy border-b text-nowrap lg:border-r lg:border-b-0 lg:pr-6'>
						{lot.mileage} км
					</li>
					<li className='border-r-osnovnoy border-b text-nowrap lg:border-r lg:border-b-0 lg:px-6'>
						{findSettings(
							CAR_GEARBOX,
							lot.gearbox as unknown as string
						)}
					</li>
					<li className='border-r-osnovnoy border-b text-nowrap lg:border-r lg:border-b-0 lg:px-6'>
						{findSettings(
							CAR_DRIVE,
							lot.drive as unknown as string
						)}
					</li>
					<li className='border-b text-nowrap lg:border-b-0 lg:pl-6'>
						{findSettings(
							CAR_ENGINE_TYPES,
							lot.engineType as unknown as string
						)}
					</li>
				</ul>
			</div>
		</Link>
	)
}
