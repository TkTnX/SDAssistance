import z from 'zod';





export const registerSchema = z.object({
	name: z
		.string('Имя должно быть строкой')
		.nonempty('Имя не может быть пустым')
		.min(2, 'Имя должно быть не менее 2 символов кириллицей'),
	phone: z
		.string('Телефон должен быть строкой')
		.nonempty('Телефон не может быть пустым'),
	email: z.email('Укажите почту!').nonempty('Почта не может быть пустой'),
	password: z
		.string()
		.nonempty('Пароль обязателен!')
		.min(6, 'Минимальная длина пароля - 6 символов'),
	role: z.string().nonempty('Роль обязательна!')
})

export type RegisterSchema = z.infer<typeof registerSchema>