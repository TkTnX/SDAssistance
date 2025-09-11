'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMask } from '@react-input/mask'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ChooseRole } from './components/ChooseRole'
import { EUserRoles } from '@/generated/prisma'
import { Button, Form, FormInput } from '@/shared/components'
import { axiosInstance } from '@/shared/lib'
import { RegisterSchema, registerSchema } from '@/shared/schemas'

export const RegisterForm = () => {
	const phoneRef = useMask({
		mask: '+7 (___) ___-__-__',
		replacement: { _: /\d/ }
	})
	const router = useRouter()
	const [isAgree, setIsAgree] = useState(false)
	const [activeRole, setActiveRole] = useState<EUserRoles>(
		EUserRoles.auctioneer
	)

	const form = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			role: EUserRoles.auctioneer
		}
	})

	const onSubmit = async (data: RegisterSchema) => {
		const formattedPhone = data.phone.replace(/\D/g, '')

		const res = await axiosInstance.post('/auth/register', {
			...data,
			phone: formattedPhone,
			role: activeRole
		})

		if (res.data.code === 201) {
			toast.success(res.data.message)
			router.push('/auth/login')
		}

		if (res.data.code !== 201) toast.error(res.data.message)
	}

	return (
		<Form {...form}>
			<form
				className='mt-8 flex flex-col gap-4 sm:max-w-[380px]'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput
					placeholder={'Введите ваше имя'}
					name='name'
					form={form}
					label='Имя'
				/>
				{/* todo: маска для номера */}
				<FormInput
					ref={phoneRef}
					placeholder='Введите ваш номер телефона'
					name='phone'
					form={form}
					type='tel'
					label='Телефон'
				/>
				<FormInput
					placeholder='testbox@mail.com'
					name='email'
					form={form}
					type='email'
					label='E-mail'
				/>
				<FormInput
					placeholder='******'
					name='password'
					form={form}
					type='password'
					label='Пароль'
				/>
				<ChooseRole
					activeRole={activeRole}
					setActiveRole={setActiveRole}
				/>

				<label className='mt-9 flex items-center gap-4'>
					<input
						onClick={() => setIsAgree(!isAgree)}
						className='accent-osnovnoy h-8 w-8'
						type='checkbox'
					/>
					<p className='text-sm text-[#757f8f]'>
						Я согласен на обработку персональных данных
					</p>
				</label>

				<Button
					disabled={!isAgree}
					className='mt-9'
					type='submit'
					text='Регистрация'
				/>
			</form>
		</Form>
	)
}
