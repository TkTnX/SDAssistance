import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import { authOptions, prisma, uploadFile } from '@/shared/lib'

export async function GET() {
	try {
		const session = await getServerSession(authOptions)
		if (!session)
			return NextResponse.json({
				message: 'Вы не авторизованы!',
				code: 401
			})

		const user = await prisma.user.findUnique({
			where: {
				id: session.userId
			},
			include: {
				lots: {
					include: {
						bets: {
							include: {
								user: true
							}
						}
					}
				},
				bets: true
			},
			omit: { password: true }
		})

		return NextResponse.json(user)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Произошла ошибка', code: 500 })
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		if (!session)
			return NextResponse.json({
				message: 'Вы не авторизованы!',
				code: 401
			})

		const user = await prisma.user.findUnique({
			where: {
				id: session.userId
			}
		})

		if (!user)
			return NextResponse.json({
				message: 'Пользователь не найден!',
				code: 404
			})

		const formData = await req.formData()

		const data = Object.fromEntries(formData)
		let avatar
		if (data.avatar) {
			const uploaded = await uploadFile(data.avatar as File)

			if ('message' in uploaded) {
				return NextResponse.json({
					message: uploaded.message,
					code: 500
				})
			}
			avatar = uploaded.publicUrl
		}

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				...data,
				avatar: avatar || user.avatar
			}
		})

		return NextResponse.json({
			message: 'Профиль успешно обновлён!',
			code: 200
		})
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Произошла ошибка', code: 500 })
	}
}
