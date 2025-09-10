import z from 'zod'

export const loginSchema = z.object({
	emailOrPhone: z
		.string('Телефон или почта должны быть строкой')
		.nonempty('Телефон или почта не могут быть пустыми'),
	password: z
		.string()
		.nonempty('Пароль обязателен!')
		.min(6, 'Минимальная длина пароля - 6 символов')
})

export type LoginSchema = z.infer<typeof loginSchema>
