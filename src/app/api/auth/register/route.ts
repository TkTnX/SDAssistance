import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/shared/lib'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()

		if (!body)
			return NextResponse.json({
				message: 'Данные не получены',
				code: 404
            })
        

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [{ email: body.email }, { phone: body.phone }]
			}
		})

		if (existingUser)
			return NextResponse.json({
				message: 'Пользователь уже существует!',
				code: 501
			})

		const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password, salt)
        
        const formattedPhone = body.phone.split('')
        console.log(formattedPhone)

		const newUser = await prisma.user.create({
			data: {
				...body,
				password: hashedPassword
			}
		})

		if (!newUser)
			return NextResponse.json({
				message: 'Ошибка при регистрации',
				code: 500
			})

		return NextResponse.json({
			message: 'Успешная регистрация!',
			code: 201
		})
	} catch (error) {
		console.log(error)
	}
}
