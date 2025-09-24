import z from 'zod'

export const profileSchema = z.object({
	avatar: z.file().optional(),
	name: z.string('Имя должно быть строкой').optional(),
	phone: z.string('Телефон должен быть строкой').optional(),
	email: z.email('Укажите почту!').optional(),

	birthday: z.string('Дата рождения должна быть строкой').optional()
})

export type ProfileSchema = z.infer<typeof profileSchema>
