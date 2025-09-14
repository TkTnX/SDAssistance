'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Button, Form, FormInput } from '@/shared/components'
import { RecoverySchema, recoverySchema } from '@/shared/schemas'

export const RecoveryForm = () => {
	const form = useForm<RecoverySchema>({
		resolver: zodResolver(recoverySchema)
	})
	const router = useRouter()

	const onSubmit = async (data: RecoverySchema) => {
		try {
			// TODO: Сделать password recovery
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
					placeholder='Введите вашу почту'
					name='email'
					form={form}
					type='text'
					label='E-mail'
				/>

				<Button
					disabled={!form.formState.isValid}
					className='mt-9'
					type='submit'
					text='Восстановить'
				/>
			</form>
		</Form>
	)
}
