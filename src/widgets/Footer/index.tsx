import Image from 'next/image'
import Link from 'next/link'

import { LinkMain } from '@/shared/components'
import { NAVBAR_LINKS, PAYMENT_TYPES, SOCIALS } from '@/shared/constants'

export const Footer = () => {
	return (
		<footer className='mt-8 pb-14'>
			<div className='flex items-center justify-center bg-[#edeff3] py-8'>
				<LinkMain
					href='/auth/register'
					className='text-osnovnoy w-auto bg-white px-14'
					text='Зарегистрироваться'
				/>
			</div>
			<div className='container flex flex-col-reverse gap-12 pt-10 sm:flex-row sm:gap-0'>
				<div className='flex-1'>
					<div className='flex flex-col gap-2.5'>
						{NAVBAR_LINKS.map(link => (
							<Link href={link.href} key={link.href}>
								{link.name}
							</Link>
						))}
					</div>
					<div className='mt-5 flex max-w-3xs items-center gap-5'>
						{PAYMENT_TYPES.map((image, index) => (
							<div className='relative h-12 w-full' key={index}>
								<Image fill src={image} alt='payment' />
							</div>
						))}
					</div>
					<p className='mt-7 text-xs'>
						2009 - 2025 © Все права защищены
					</p>
				</div>
				<div className='flex-1'>
					<div className='flex flex-col gap-2.5'>
						<a
							className='vsm:text-3xl flex flex-col items-start text-2xl font-medium sm:flex-row sm:items-center'
							href='tel:88005502665'
						>
							8 800 550-26-65{' '}
							<span className='text-xs'>
								Звонок по России бесплатный
							</span>
						</a>
						<a
							className='vsm:text-3xl text-2xl font-medium'
							href='mailto:assist@sd-assist.ru'
						>
							assist@sd-assist.ru
						</a>
						<a
							className='vsm:text-3xl text-2xl font-medium'
							href='mailto:auction@sd-assist.ru '
						>
							auction@sd-assist.ru{' '}
						</a>
					</div>
					<div className='mt-8 flex items-center gap-2.5'>
						{SOCIALS.map((image, index) => (
							<Image
								src={image}
								key={index}
								width={32}
								height={32}
								alt='social'
							/>
						))}
						<span>Мы в соцсетях</span>
					</div>
					<p className='vsm:text-base mt-8 text-sm'>
						Свидетельство о регистрации электронного СМИ ЭЛ № ФС 77
						- 76018 выдано Федеральной службой по надзору в сфере
						связи, информационных технологий и массовых коммуникаций
						24.06.2019 года
					</p>
				</div>
			</div>
		</footer>
	)
}
