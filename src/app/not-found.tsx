import Link from 'next/link'

const NotFoundPage = () => {
	return (
		<div className='flex h-[calc(100vh-200px)] flex-col items-center justify-center text-center'>
			<h1 className='vsm:text-[160px] text-7xl leading-[100%] font-bold text-[#f0f2f5]'>
				404
			</h1>
			<p className='vsm:text-2xl text-lg font-bold'>
				Запрашиваемая страница не найдена
			</p>
			<p className='vsm:text-base mt-2.5 text-sm font-medium text-[#757f8f]'>
				Перейдите на{' '}
				<Link href={'/'} className='text-osnovnoy font-bold underline'>
					главную страницу
				</Link>{' '}
				или воспользуйтесь поиском по сайту
			</p>
		</div>
	)
}

export default NotFoundPage
