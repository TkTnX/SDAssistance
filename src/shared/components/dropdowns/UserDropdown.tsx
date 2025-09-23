'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

import { EUserRoles } from '@/generated/prisma'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/components/ui'
import { IUser } from '@/shared/types'

type Props = {
	children: React.ReactNode
	user: IUser
}

export const UserDropdown = ({ children, user }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-[240px]'>
				<DropdownMenuItem>
					<Link href='/profile/bets'>Ставки</Link>
				</DropdownMenuItem>

				<DropdownMenuItem>
					<Link href={'/profile'}>Профиль</Link>
				</DropdownMenuItem>
				{String(user.role) === EUserRoles.seller && (
					<>
						<DropdownMenuItem>
							<Link href='/profile/lots'>Ваши лоты</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={'/profile/balance'}>Финансы</Link>
						</DropdownMenuItem>
					</>
				)}
				<DropdownMenuItem>
					<button onClick={() => signOut()}>Выход</button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
