'use client'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { formatDate, formatPrice } from '@/shared/helpers'
import { ILot } from '@/shared/types'

type Props = {
	activeLots: ILot[]
}

export const HeroSlider = ({ activeLots }: Props) => {
	return (
		<Swiper
			modules={[Navigation]}
			navigation
			spaceBetween={20}
			slidesPerView={1}
		>
			{activeLots.map(lot => (
				<SwiperSlide key={lot.id}>
					<div className='flex flex-col items-stretch lg:flex-row'>
						<div className='relative h-[300px] w-full sm:h-[460px] lg:h-[330px] lg:max-w-[700px]'>
							<Image
								className='object-cover'
								src={lot.photos[0]}
								fill
								alt={lot.name}
							/>
						</div>
						<div className='to-gray-1000 flex flex-1 flex-col justify-center bg-gradient-to-r from-gray-300 p-5 sm:p-10 lg:flex-1/3 lg:pl-10'>
							<h2 className='text-osno text-xl font-bold sm:text-2xl'>
								{lot.name}, {lot.year}г
							</h2>
							<ul className='mt-8 flex flex-col gap-4 text-sm sm:text-base'>
								<li>
									Лот:{' '}
									<span className='font-bold'>
										№{lot.id.split('-')[0]}
									</span>
								</li>
								{lot.currentPrice && (
									<li>
										Текущая цена:{' '}
										<span className='font-bold'>
											{formatPrice(lot.currentPrice)}
										</span>
									</li>
								)}
								<li>
									Начальная цена:{' '}
									<span className='font-bold'>
										{formatPrice(lot.price)}
									</span>
								</li>
								<li>
									Начало торгов:{' '}
									<span className='font-bold'>
										{formatDate(lot.createdAt)}
									</span>
								</li>
								<li>
									Завершение торгов:{' '}
									<span className='font-bold'>
										{formatDate(lot.endsAt)}
									</span>
								</li>
							</ul>
						</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
