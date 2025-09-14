'use client'

import { User2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { EUserRoles } from '@/generated/prisma'
import { LinkMain } from '@/shared/components'
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
			<Link
				className='flex h-12 w-12 items-center justify-center rounded-full border border-[#d9d9d9]'
				href={'/profile'}
			>
				<User2 />
			</Link>
		</>
	)
}
