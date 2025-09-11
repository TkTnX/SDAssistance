'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';



import { Button, Form, FormInput } from '@/shared/components';
import { LoginSchema, loginSchema } from '@/shared/schemas';
import { isAxiosError } from 'axios';





export const LoginForm = () => {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = async (data: LoginSchema) => {
		try {
			const res = await signIn('credentials', {
				...data,
				redirect: false,
				callbackUrl: '/'
			})

			if (res?.status === 200) {
				console.log('Успешный вход!')
			} else {
				console.log('Ошибка при входе')
			}
		} catch (error) {
			console.log(error)
			if (isAxiosError(error)) {
				if (error.response) {
					console.log(error.response.data)
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

				<Button className='mt-9' type='submit' text='Войти' />
			</form>
		</Form>
	)
}