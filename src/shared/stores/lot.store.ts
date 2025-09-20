import { toast } from 'react-toastify'
import { create } from 'zustand'

import {
	ECarBodyTypes,
	ECarTypes,
	EDrive,
	EEngineTypes,
	EGearbox,
	EInsurance
} from '@/generated/prisma'
import { axiosInstance } from '@/shared/lib'

type LotInfoType = {
	region: null | string
	city: null | string
	price: null | number
	insurance: EInsurance | null

	name: string | null
	power: string | null
	vin: string | null
	frame?: string | null
	carType: ECarTypes | null
	year: number | null

	bodyType: ECarBodyTypes | null
	color: string | null
	mileage: number | null
	damages?: string | null
	passport: number | null
	engineType: EEngineTypes | null
	volume: number | null
	drive: EDrive | null
	gearbox: EGearbox | null
	comment?: string | null

	photos: File[]
}

type State = {
	step: number

	lotInfo: LotInfoType
}

type Actions = {
	setStep: (newStep: number) => void
	setLotInfo: (key: string, value: string) => void
	onCreate: () => Promise<void>
}

export const useLotStore = create<State & Actions>((set, get) => ({
	step: 0,
	lotInfo: {
		region: null,
		city: null,
		price: null,
		insurance: null,

		name: null,
		power: null,
		vin: null,
		frame: undefined,
		carType: null,
		year: null,

		bodyType: null,
		color: null,
		mileage: null,
		damages: undefined,
		passport: null,
		engineType: null,
		volume: null,
		drive: null,
		gearbox: null,
		comment: undefined,

		photos: []
	},
	setStep: newStep => {
		set({ step: newStep })
	},

	setLotInfo: (key, value) => {
		set({
			lotInfo: {
				...get().lotInfo,
				[key]: value
			}
		})
	},

	onCreate: async () => {
		try {
			const lotInfo = get().lotInfo
			const formData = new FormData()

			if (Object.values(lotInfo).includes(null)) {
				Object.entries(lotInfo).find(([key, value]) => {
					if (value === null) {
						toast.error(`Заполните поле ${key}`)
					}
				})
				return toast.error(
					'Все обязательные поля должны быть заполнены! '
				)
			}

			Object.entries(lotInfo).forEach(([key, value]) => {
				if (value !== null && value !== undefined && key !== 'photos') {
					formData.append(key, String(value))
				}
			})

			console.log(lotInfo.photos)
			for (let i = 0; i < lotInfo.photos.length; i++) {
				formData.append('photos', lotInfo.photos[i])
			}

			const { data } = await axiosInstance.post(
				'/lots/create',
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' }
				}
			)
			toast.success('Лот успешно создан')
			location.href = `/lots/${data.id}`
			return data
		} catch (error) {
			console.log(error)
		}
	}
}))
