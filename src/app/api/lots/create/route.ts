import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import {
	ECarBodyTypes,
	ECarTypes,
	EDrive,
	EEngineTypes,
	EGearbox,
	EInsurance
} from '@/generated/prisma'
import { authOptions, prisma, uploadFile } from '@/shared/lib'

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)

		if (!session)
			return NextResponse.json({
				message: 'Вы не авторизованы!',
				code: 401
			})

		const now = new Date()
		const endsAt = new Date()
		endsAt.setDate(now.getDate() + 7)

		const formData = await req.formData()
		const photoFiles = formData.getAll('photos') as File[]
		const photos = []

		const body = {
			insurance: formData.get('insurance') as EInsurance,
			region: formData.get('region') as string,
			city: formData.get('city') as string,
			price: Number(formData.get('price')),

			vin: formData.get('vin') as string,
			frame: formData.get('frame') as string,
			carType: formData.get('carType') as ECarTypes,
			year: Number(formData.get('year')),
			bodyType: formData.get('bodyType') as ECarBodyTypes,
			color: formData.get('color') as string,
			mileage: Number(formData.get('mileage')),
			passport: formData.get('passport') as string,
			engineType: formData.get('engineType') as EEngineTypes,
			volume: Number(formData.get('volume')),
			power: Number(formData.get('power')),
			drive: formData.get('drive') as EDrive,
			gearbox: formData.get('gearbox') as EGearbox,
			comment: formData.get('comment') as string,
			name: formData.get('name') as string,
			damages: formData.get('damages') as string,

			endsAt
		}

		console.log(photoFiles)

		for (let i = 0; i < photoFiles.length; i++) {
			const uploaded = await uploadFile(photoFiles[i])

			if ('message' in uploaded) {
				return NextResponse.json({
					message: uploaded.message,
					code: 500
				})
			}

			photos.push(uploaded.publicUrl)
		}

		const lot = await prisma.lot.create({
			data: {
				...body,
				photos,
				seller: {
					connect: {
						id: session.userId
					}
				}
			}
		})

		return NextResponse.json(lot)
	} catch (error) {
		console.log(error)
		return NextResponse.json({
			message: 'При создании лота произошла ошибка!',
			code: 500
		})
	}
}
