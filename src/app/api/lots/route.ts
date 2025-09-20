import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/shared/lib'

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams
		const params = Object.fromEntries(query)

		const { sortBy, search, ...restParams } = params

		const page = Number(query.get('page') || 1)
		const limit = Number(query.get('limit') || 9)

		const allowedSortFields = ['createdAt', 'price', 'mileage']
		let orderBy = undefined

		if (sortBy) {
			const [field, dir] = sortBy.split('-')
			if (allowedSortFields.includes(field)) {
				orderBy = { [field]: dir === 'asc' ? 'asc' : 'desc' }
			}
		}

		const lots = await prisma.lot.findMany({
			take: limit,
			skip: (page - 1) * limit,
			orderBy,
			where: {
				name: search,
				endsAt: { gt: new Date() },
				...restParams
			}
		})

		const allLots = await prisma.lot.count({})

		if (!lots)
			return NextResponse.json(
				{ message: 'Lots not found' },
				{ status: 404 }
			)

		const totalPages = allLots / limit
		return NextResponse.json({
			data: lots,
			page: page,
			totalPages: Math.floor(totalPages < 1 ? 1 : totalPages)
		})
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Server error' }, { status: 500 })
	}
}
