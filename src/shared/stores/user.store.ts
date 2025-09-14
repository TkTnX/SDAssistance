import { isAxiosError } from 'axios'
import { create } from 'zustand'

import { axiosInstance } from '@/shared/lib'
import { IUser } from '@/shared/types'

type State = {
	user: null | IUser
	isLoading: boolean
	error: null | string
}

type Actions = {
	fetchUser: () => Promise<void>
}

export const useUserStore = create<State & Actions>(set => ({
	user: null,
	isLoading: false,
	error: null,

	fetchUser: async () => {
		try {
			set({ isLoading: true, error: null })

			const {data: user} = await axiosInstance.get<
				IUser | { message: string; code: number }
			>('/users')

			if (!user) {
				return set({ error: 'Не удалось получить пользователя!' })
			}

			if ("message" in user) {
				return set({ error: user.message })
			}

			set({ user: user })
		} catch (error) {
			if (isAxiosError(error)) {
				if (error.response) {
					set({ error: error.response.data })
				}
			}
		} finally {
			set({ isLoading: false })
		}
	}
}))
