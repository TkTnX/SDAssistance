'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/lib'

type Props = {
	setOpen: (bool: boolean) => void
	item: { href: string; name: string }
}

export const HeaderMenuItem = ({ setOpen, item }: Props) => {
	const pathname = usePathname()

	return (
		<li className='w-full'>
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
	)
}
