import z from 'zod'

export const recoverySchema = z.object({
    email: z
        .string('Почта должна быть строкой')
        .nonempty('Почта не может быть пустой'),
   
})

export type RecoverySchema = z.infer<typeof recoverySchema>
