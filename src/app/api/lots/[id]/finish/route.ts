import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';



import { ELotStatuses } from '@/generated/prisma';
import { authOptions, prisma } from '@/shared/lib';





export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = (await params).id
		const winnerId = await req.json()

		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({
				message: 'Вы не авторизованы',
				code: 401
			})
		}

		const lot = await prisma.lot.findUnique({
			where: {
				id
			}
		})

		if (!lot)
			return NextResponse.json({ message: 'Лот не найден!', code: 404 })
		if (lot.sellerId !== session.userId)
            return NextResponse.json({ message: 'Это не ваш лот!', code: 401 })
        
        await prisma.lot.update({
			where: {
				id: lot.id
			},
			data: {
				status: ELotStatuses.finished,
				winnerId
			}
        })
        
        return NextResponse.json({message: 'Лот успешно завершён!', code:202 })

	} catch (error) {
		console.log(error)
		return NextResponse.json({
			message: 'Произошла ошибка при остановки лота!',
			code: 500
		})
	}
}