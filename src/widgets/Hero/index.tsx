'use client'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Hero = () => {
	return (
		<section>
			<Swiper
				modules={[Navigation]}
				navigation
				spaceBetween={20}
				slidesPerView={1}
			>
				{/* TODO: Получать лоты с БД */}
				<SwiperSlide>
					<div className='flex flex-col items-stretch lg:flex-row'>
						<div className='vsm:h-[300px] relative h-[200px] w-full sm:h-[460px] lg:h-[330px] lg:max-w-[930px] lg:flex-2/3 xl:h-[440px]'>
							<Image src={'/images/hero.jpg'} fill alt='Машина' />
						</div>
						<div className='to-gray-1000 flex flex-col justify-center bg-gradient-to-r from-gray-300 p-5 sm:p-10 lg:flex-1/3 lg:pl-10'>
							<h2 className='text-osno text-xl font-bold sm:text-2xl'>
								Hyundai Tucson, 2017г
							</h2>
							<ul className='mt-8 flex flex-col gap-4 text-sm sm:text-base'>
								<li>
									Лот:{' '}
									<span className='font-bold'>
										№2112-0806
									</span>
								</li>
								<li>
									Текущая цена:{' '}
									<span className='font-bold'>
										1 405 000.00
									</span>
								</li>
								<li>
									Начальная цена:{' '}
									<span className='font-bold'>
										1 005 000.00
									</span>
								</li>
								<li>
									Начало торгов:{' '}
									<span className='font-bold'>
										08.12.2021 18:44
									</span>
								</li>
								<li>
									Завершение торгов:{' '}
									<span className='font-bold'>
										17.12.2021 12:40
									</span>
								</li>
							</ul>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='flex flex-col items-stretch lg:flex-row'>
						<div className='vsm:h-[300px] relative h-[200px] w-full md:h-[400px] lg:h-auto lg:max-w-[930px] lg:flex-2/3 xl:h-[440px]'>
							<Image src={'/images/hero.jpg'} fill alt='Машина' />
						</div>
						<div className='to-gray-1000 flex flex-col justify-center bg-gradient-to-r from-gray-300 p-5 sm:p-10 lg:flex-1/3 lg:pl-10'>
							<h2 className='text-osno text-xl font-bold sm:text-2xl'>
								Hyundai Tucson, 2017г
							</h2>
							<ul className='mt-8 flex flex-col gap-4 text-sm sm:text-base'>
								<li>
									Лот:{' '}
									<span className='font-bold'>
										№2112-0806
									</span>
								</li>
								<li>
									Текущая цена:{' '}
									<span className='font-bold'>
										1 405 000.00
									</span>
								</li>
								<li>
									Начальная цена:{' '}
									<span className='font-bold'>
										1 005 000.00
									</span>
								</li>
								<li>
									Начало торгов:{' '}
									<span className='font-bold'>
										08.12.2021 18:44
									</span>
								</li>
								<li>
									Завершение торгов:{' '}
									<span className='font-bold'>
										17.12.2021 12:40
									</span>
								</li>
							</ul>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</section>
	)
}
