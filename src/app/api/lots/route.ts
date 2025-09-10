import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/shared/lib'

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams
		const params = Object.fromEntries(query)

		const { sortBy, search, ...restParams } = params

		const page = Number(query.get('page') || 1)
		const limit = Number(query.get('limit') || 9)
		console.log(sortBy)

		const allowedSortFields = ['createdAt', 'price', 'mileage']
		let orderBy = undefined

		if (sortBy) {
			const [field, dir] = sortBy.split('-')
			console.log({ [field]: dir === 'asc' ? 'asc' : 'desc' })
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
				...restParams
			}
		})

		const allLots = await prisma.lot.count({})

		if (!lots)
			return NextResponse.json(
				{ message: 'Lots not found' },
				{ status: 404 }
			)

		return NextResponse.json({
			data: lots,
			page: page,
			totalPages: allLots
		})
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: 'Server error' }, { status: 500 })
	}
}
