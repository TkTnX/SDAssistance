import { ELotStatuses } from '@/generated/prisma'
import { IBet, IUser } from '.'

export interface ILot {
	id: string

	// DOCS INFO
	insurance: string
	region: string
	city: string
	price: number
	currentPrice: null | number
	// CAR INFO
	vin: string
	frame: string
	carType: string
	year: number
	bodyType: string
	color: string
	mileage: number
	passport: string
	engineType: string
	volume: number
	power: number
	drive: string
	gearbox: string
	comment: string | null
	photos: string[]
	name: string
	damages: string | null

	bets?: IBet[]
	status: string
	winnerId: string | null

	seller?: IUser
	sellerId: string


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
