import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { axiosInstance } from '@/shared/lib'
import { IBet } from '@/shared/types'

export function useBets(lotId: string) {
	const [lotBets, setLotBets] = useState<IBet[] | null>(null)
	const router = useRouter()

	// ПОЛУЧЕНИЕ СТАВОК НА ЭТОТ ЛОТ
	useEffect(() => {
		async function getCurrBet() {
			const res = await axiosInstance.get(`/bets/${lotId}`)

			if (res.data.length === 0) {
				return
			}

			setLotBets(res.data)
		}

		getCurrBet()
	}, [lotId])

	async function onBet(newBet: number) {
		try {
			const res = await axiosInstance.post(`/bets/${lotId}`, newBet)

			if (res.data.code !== 201) {
				return toast.error(res.data.message)
			}

			router.refresh()
			return toast.success(res.data.message)
		} catch (error) {
			console.log(error)
			if (isAxiosError(error)) {
				if (error.response) {
					toast.error(error.response.data)
				}
			}
		}
	}

	return {
		lotBets,
		onBet
	}
}
