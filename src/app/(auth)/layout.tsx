import Link from 'next/link'

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<div className='border-y py-5'>
				<div className='container flex flex-wrap gap-2 sm:items-center sm:gap-0'>
					<Link
						className='px-5 text-sm font-semibold hover:opacity-80'
						href={'/auth/register'}
					>
						Регистрация
					</Link>
					<Link
						className='border-osnovnoy border-x px-5 text-sm font-semibold hover:opacity-80'
						href={'/auth/login'}
					>
						Авторизация
					</Link>
					<Link
						className='px-5 text-sm font-semibold hover:opacity-80'
						href={'/auth/recovery'}
					>
						Восстановление пароля
					</Link>
				</div>
			</div>
			<main className='container'>{children}</main>
		</>
	)
}
