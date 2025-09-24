/* eslint-disable @next/next/no-img-element */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, useMask } from '@react-input/mask'
import { isAxiosError } from 'axios'
import { User2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Form, FormInput } from '@/shared/components'
import { axiosInstance } from '@/shared/lib'
import { ProfileSchema, profileSchema } from '@/shared/schemas'
import { useUserStore } from '@/shared/stores'

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

export const ProfileForm = () => {
	const [avatar, setAvatar] = useState<FileList | null>(null)
	const phoneRef = useMask({
		mask: '+7 (___) ___-__-__',
		replacement: { _: /\d/ }
	})

	const { isLoading, user } = useUserStore()
	const formattedPhone = user?.phone
		? format(user.phone, {
				mask: '+_ (___) ___-__-__',
				replacement: { _: /\d/ }
			})
		: ''
	const form = useForm<ProfileSchema>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user?.name,
			email: user?.email,
			phone: formattedPhone,
			birthday: user?.birthday
		}
	})
	const router = useRouter()
	useEffect(() => {
		if (!isLoading && !user) {
			router.push('/')
		}

		return
	}, [isLoading, router, user])

	const onSubmit = async (data: ProfileSchema) => {
		try {
			const formData = new FormData()

			Object.entries(data).forEach(([key, value]) => {
				if (value !== null && value !== undefined) {
					formData.append(key, String(value))
				}
			})

			if (avatar) {
				formData.append('avatar', avatar[0])
			}

			const res = await axiosInstance.patch('/users', formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})

			if (res.data.code !== 200) return toast.error(res.data.message)

			router.refresh()
			return toast.success(res.data.message)
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
		<div className='mt-10'>
			<h2 className='text-2xl font-bold'>Основные данные</h2>

			<Form {...form}>
				<form
					className='mt-10 flex max-w-[570px] flex-col gap-7'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{avatar && (
						<div className='mt-4 flex flex-wrap items-center gap-3'>
							Новое изображение
							<img
								alt='new avatar'
								src={URL.createObjectURL(avatar[0])}
								className='h-10 w-10 rounded-lg object-cover'
							/>
						</div>
					)}
					<label className='w-fit cursor-pointer'>
						{user?.avatar ? (
							<Image
								width={180}
								height={180}
								className='h-[180px] w-[180px] rounded-full object-cover'
								src={user?.avatar}
								alt={user?.name}
							/>
						) : (
							<div className='flex h-[180px] w-[180px] items-center justify-center rounded-full border border-[#d9d9d9]'>
								<User2 size={96} />
							</div>
						)}

						<input
							onChange={e => setAvatar(e.target.files)}
							accept='image/*'
							type='file'
							hidden
							name='avatar'
						/>
					</label>

					<FormInput
						placeholder='Имя'
						name='name'
						form={form}
						type='text'
						label='Имя'
					/>

					<FormInput
						ref={phoneRef}
						placeholder='Введите ваш номер телефона'
						name='phone'
						form={form}
						type='tel'
						label='Телефон'
					/>
					<FormInput
						placeholder='example@example.ru'
						name='email'
						form={form}
						type='email'
						label='Почта'
					/>

					<div className='mt-16 mb-10 h-[1px] w-full bg-[#f0f2f5]' />

					<h2 className='text-2xl font-bold'>
						Дополнительные данные
					</h2>

					<FormInput
						placeholder='__.__.____'
						name='birthday'
						form={form}
						type='date'
						label='День рождения'
						className='block cursor-pointer'
					/>

					<Button type='submit' text='Сохранить' />
				</form>
			</Form>
		</div>
	)
}
