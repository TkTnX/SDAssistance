import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/shared/lib'

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = (await params).id

		const lot = await prisma.lot.findUnique({
			where: { id, endsAt: { gt: new Date() } },
			include: { seller: { omit: { password: true } } }
		})

		if (!lot)
			return NextResponse.json({
				message: 'Лот не найден или уже закончен',
				code: 404
			})

		return NextResponse.json(lot)
	} catch (error) {
		console.log(error)
		return NextResponse.json({
			message: 'Ошибка при получении лота',
			code: 500
		})
	}
}
