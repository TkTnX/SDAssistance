import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

import { authOptions, prisma } from '@/shared/lib'

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
				lots: true,
				bids: true
            },
            omit: {password: true}
		})

		return NextResponse.json(user)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Произошла ошибка', code: 500 })
	}
}
