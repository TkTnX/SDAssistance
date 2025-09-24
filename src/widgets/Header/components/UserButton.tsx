'use client'

import { User2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { EUserRoles } from '@/generated/prisma'
import { LinkMain, UserDropdown } from '@/shared/components'
import { useUserStore } from '@/shared/stores'

export const UserButton = () => {
	const { fetchUser, user } = useUserStore(
		useShallow(state => ({
			user: state.user,
			fetchUser: state.fetchUser
		}))
	)

	useEffect(() => {
		async function getUser() {
			await fetchUser()
		}

		getUser()
	}, [])

	return !user ? (
		<LinkMain href={'/auth/login'} text='Войти' />
	) : (
		<>
			{String(user?.role) === EUserRoles.seller && (
				<LinkMain text='Добавить лот' href='/lots/create' />
			)}
			<UserDropdown user={user}>
				<button className='relative flex h-12 w-12 items-center justify-center rounded-full border border-[#d9d9d9]'>
					{user.avatar ? (
						<Image
							src={user.avatar}
							alt={user.name}
							fill
							className='h-full w-full rounded-full object-cover'
						/>
					) : (
						<User2 />
					)}
				</button>
			</UserDropdown>
		</>
	)
}
