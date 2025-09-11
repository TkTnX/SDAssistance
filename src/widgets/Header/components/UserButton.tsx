'use client'

import { useSession } from 'next-auth/react'

import { LinkMain } from '@/shared/components'

export const UserButton = () => {
    const { data: session } = useSession()
	return session ? (
		<LinkMain href={'/profile'} text='Профиль' />
	) : (
		<LinkMain href={'/auth/login'} text='Войти' />
	)
}
