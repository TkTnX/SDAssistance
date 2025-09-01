import Image from 'next/image'

export const BiddingInfo = () => {
	return (
		<section className='mt-16 bg-[#eceef2]'>
			<div className='container flex flex-col-reverse items-center gap-5 pb-4 lg:flex-row lg:pt-12'>
				<div className='max-w-[680px]'>
					<h2 className='text-2xl font-bold sm:text-3xl'>
						Специализированные торги
					</h2>
					<p className='mt-2.5'>
						(оценка и торги КТС по страховым случаям ОСАГО)
					</p>
					<p className='mt-7'>
						Данные торги проводятся на открытой публичной площадке в
						соответствии с требованиями: п.10.6 «Методологические
						рекомендации ФБУ РФЦСЭ при Минюсте России от
						01.01.2018.г. и п.5.4, 5.5 «Положение Банка России от
						04.03.2021 N 755-П О единой методике определения размера
						расходов на восстановительный ремонт в отношении
						поврежденного транспортного средства (Зарегистрировано в
						Минюсте России 10.06.2021 N 63845).
					</p>
				</div>
				<div className='relative h-[360px] w-full lg:h-[250px] xl:h-[300px]'>
					<Image
						className='object-cover'
						src={'/images/biddinginfo.jpg'}
						alt='Специализированные торги'
						fill
					/>
				</div>
			</div>
		</section>
	)
}
