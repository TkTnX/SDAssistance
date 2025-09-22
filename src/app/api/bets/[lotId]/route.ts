import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import { authOptions, prisma } from '@/shared/lib'

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ lotId: string }> }
) {
	try {
		const lotId = (await params).lotId
		const newBet = await req.json()
		const session = await getServerSession(authOptions)

		if (!session)
			return NextResponse.json({
				message: 'Вы не авторизованы',
				code: 401
			})

		const lot = await prisma.lot.findUnique({ where: { id: lotId } })

		if (!lot)
			return NextResponse.json({ message: 'Лот не найден', code: 404 })

        // Обновление currentPrice лота
		await prisma.lot.update({
			where: { id: lot.id },
			data: {
				currentPrice: newBet
			}
		})

        // Создание новой ставки
		await prisma.bet.create({
			data: {
				bet: newBet,
				lotId: lot.id,
				userId: session.userId
			}
		})

		return NextResponse.json({ message: 'Ставка установлена!', code: 201 })
	} catch (error) {
		console.log(error)
		return NextResponse.json({
			message: 'Произошла ошибка при создании лота',
			code: 500
		})
	}
}
