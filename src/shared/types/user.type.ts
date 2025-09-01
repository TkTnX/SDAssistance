import { ILot } from "."

export interface IUser {
	id: string

	name: string
	email: string
	phone: string
	birthday?: string
	avatar?: string

	role: EUserRoles

	lots: ILot[]
	bids: ILot[]
}

enum EUserRoles {
	seller,
	auctioneer
}
