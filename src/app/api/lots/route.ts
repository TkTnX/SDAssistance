import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/shared/lib'

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams

		const page = Number(query.get('page') || 1)
		const limit = Number(query.get('limit') || 9)
		const lots = await prisma.lot.findMany({
			take: limit,
			skip: (page - 1) * limit,
			orderBy: {
				createdAt: 'desc'
			}
		})

		if (!lots)
			return NextResponse.json(
				{ message: 'Lots not found' },
				{ status: 404 }
			)

		return NextResponse.json(lots)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Server error' }, { status: 500 })
	}
}
