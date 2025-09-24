'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Form, FormInput } from '@/shared/components'
import { LoginSchema, loginSchema } from '@/shared/schemas'
import { useUserStore } from '@/shared/stores'

export const LoginForm = () => {
	const fetchUser = useUserStore(state => state.fetchUser)
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	})
	const router = useRouter()

	const onSubmit = async (data: LoginSchema) => {
		try {
			const res = await signIn('credentials', {
				...data,
				redirect: false,
				callbackUrl: '/'
			})

			if (res?.status === 200) {
				toast.success('Успешный вход')
				await fetchUser()
				router.push('/profile')
			} else {
				toast.error('Ошибка при входе в аккаунт')
			}
		} catch (error) {
			console.log(error)
			if (isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data)
				}
			}
		}
	}

	return (
		<Form {...form}>
			<form
				className='mt-8 flex flex-col gap-4 sm:max-w-[380px]'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput
					placeholder='Введите ваш номер телефона'
					name='emailOrPhone'
					form={form}
					type='text'
					label='E-mail или телефон'
				/>

				<FormInput
					placeholder='******'
					name='password'
					form={form}
					type='password'
					label='Пароль'
				/>

				<Button
					disabled={!form.formState.isValid}
					className='mt-9'
					type='submit'
					text='Войти'
				/>
			</form>
		</Form>
	)
}
