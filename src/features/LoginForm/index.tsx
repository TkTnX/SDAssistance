'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, Form, FormInput } from '@/shared/components'
import { LoginSchema, loginSchema } from '@/shared/schemas'

export const LoginForm = () => {
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema)
	})

	const onSubmit = async (data: LoginSchema) => {
		console.log(data)
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
