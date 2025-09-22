import { IBet, ILot } from "."

export interface IUser {
	id: string

	name: string
	email: string
	phone: string
	birthday?: string
	avatar?: string

	role: EUserRoles

	lots: ILot[]
	bets: IBet[]
}

enum EUserRoles {
	seller,
	auctioneer
}
