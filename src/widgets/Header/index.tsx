
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { HeaderMenu, UserButton } from './components'
import { Search } from '@/features'

export const Header = () => {
	return (
		<header className='relative z-10 container flex h-[120px] items-center justify-center bg-white sm:justify-between'>
			<div className='flex flex-1 items-center justify-between gap-10 sm:flex-none sm:justify-start'>
				<HeaderMenu>
					<button className='hover:opacity-80'>
						<Menu
							size={30}
							strokeWidth={3}
							color='var(--osnovnoy-cvet)'
						/>
					</button>
				</HeaderMenu>
				<Link href={'/'}>
					<Image src='/logo.svg' alt='Лого' width={220} height={28} />
				</Link>
			</div>
			<p className='text-text-2 hidden sm:block'>
				Проведено торгов:{' '}
				<span className='text-osnovnoy font-bold'>0</span>
			</p>
			<div className='hidden items-center gap-5 lg:flex'>
				<Search />

				<UserButton />
			</div>
		</header>
	)
}
