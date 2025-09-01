import Image from 'next/image'

import { LinkMain } from '@/shared/components'
import { INSTRUCTION_LIST } from '@/shared/constants'

export const Instruction = () => {
	return (
		<section className='container mt-10'>
			<h2 className='text-center text-3xl font-bold'>
				Краткая инструкция
			</h2>
			<div className='vsm:gap-0 mt-2.5 flex flex-col items-center justify-center gap-4 overflow-hidden'>
				{INSTRUCTION_LIST.map((item, index) => (
					<div
						className='vsm:flex-row vsm:bg-transparent vsm:py-0 vsm:text-left flex w-full max-w-[780px] flex-1 flex-col items-center bg-[#f0f2f5] py-2 text-center not-first:-mt-1 even:max-w-[725px] md:even:ml-13'
						key={index}
					>
						<div className='relative h-[95px] w-[110px]'>
							<Image src={item.image} alt={item.label} fill />
						</div>
						<p className='-ml-1 vsm:justify-start flex h-[60px] flex-1 items-center justify-center bg-[#f0f2f5] px-5 font-medium'>
							{item.label}
						</p>
					</div>
				))}
			</div>
			<LinkMain
				className='mx-auto mt-3 w-fit px-9'
				text='Скачать полные правила'
				href='/docs'
			/>
		</section>
	)
}
