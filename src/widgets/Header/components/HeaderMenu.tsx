'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger
} from '@/shared/components'
import { NAVBAR_LINKS } from '@/shared/constants'
import { cn } from '@/shared/lib/utils'

type Props = {
	children: React.ReactNode
}

export const HeaderMenu = ({ children }: Props) => {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='h-full sm:h-auto' side='top'>
				<SheetTitle />
				<nav className='h-full'>
					<ul className='flex h-full flex-col items-center'>
						{NAVBAR_LINKS.map(item => (
							<li className='w-full' key={item.href}>
								<Link
									onClick={() => setOpen(false)}
									className={cn(
										'text-osnovnoy block w-full border-b-2 p-8 text-center hover:font-bold',
										{
											'font-bold': pathname === item.href
										}
									)}
									href={item.href}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	)
}
