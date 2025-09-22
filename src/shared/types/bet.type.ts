import { ILot, IUser } from "."

export interface IBet {
    id: string

    bet: number
    lot?: ILot
    lotId: string

    user?: IUser
    userId: string

    createdAt: string
}