'use client'

import { HeaderMenuItem } from '.'
import { useState } from 'react'

import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger
} from '@/shared/components'
import { NAVBAR_LINKS } from '@/shared/constants'
import { useUserStore } from '@/shared/stores'

type Props = {
	children: React.ReactNode
}


export const HeaderMenu = ({ children }: Props) => {
	const [open, setOpen] = useState(false)
	const user = useUserStore(state => state.user)
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='h-full sm:h-auto' side='top'>
				<SheetTitle />
				<nav className='h-full'>
					<ul className='flex h-full flex-col items-center'>
						{NAVBAR_LINKS.map(item => (
							<HeaderMenuItem
								setOpen={setOpen}
								item={item}
								key={item.href}
							/>
						))}
						{user ? (
							<HeaderMenuItem
								setOpen={setOpen}
								item={{ name: 'Профиль', href: '/profile' }}
							/>
						) : (
							<>
								<HeaderMenuItem
									setOpen={setOpen}
									item={{
										name: 'Логин',
										href: '/auth/login'
									}}
								/>

								<HeaderMenuItem
									setOpen={setOpen}
									item={{
										name: 'Регистрация',
										href: '/auth/register'
									}}
								/>
							</>
						)}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	)
}
