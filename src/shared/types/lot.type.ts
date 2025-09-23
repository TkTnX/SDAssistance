import { ELotStatuses } from '@/generated/prisma'
import { IUser } from '.'

export interface ILot {
	id: string

	// DOCS INFO
	insurance: EInsurance
	region: string
	city: string
	price: number
	currentPrice: null | number
	// CAR INFO
	vin: string
	frame: string
	carType: ECarTypes
	year: number
	bodyType: ECarBodyTypes
	color: string
	mileage: number
	passport: string
	engineType: EEngineTypes
	volume: number
	power: number
	drive: EDrive
	gearbox: EGearbox
	comment?: string
	photos: string[]
	name: string
	damages?: string

	status: ELotStatuses
	winnerId: string | null

	seller?: IUser
	sellerId: string

	auctioneer?: IUser
	auctioneerId: string

	createdAt: Date
	endsAt: Date
}

enum EInsurance {
	OSAGO,
	CASCO
}

enum ECarTypes {
	passenger,
	commercial,
	motorcycle,
	cargo,
	trailer,
	bus,
	special
}

enum ECarBodyTypes {
	jeep,
	coupe,
	hatchback,
	sedan,
	offroad,
	van,
	cabrio,
	pickup
}

enum EEngineTypes {
	petrol,
	diesel,
	electric,
	hybrid
}

enum EDrive {
	front,
	rear,
	all
}

enum EGearbox {
	automatic,
	manual
}
