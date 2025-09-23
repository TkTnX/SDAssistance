import { isAxiosError } from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { axiosInstance } from '@/shared/lib'
import { ErrorType, ILot } from '@/shared/types'

type lotsData = {
	data: ILot[]
	page: number
	totalPages: number
}

export function useLots() {
	const [isLoading, setIsLoading] = useState(false)
	const [lots, setLots] = useState<lotsData | null>(null)
	const [error, setError] = useState<null | string>(null)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const params = Object.fromEntries(searchParams)
		const fetchLots = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const data = await axiosInstance.get('/lots', { params })

				setLots(data.data)
			} catch (error) {
				console.log(error)
				setError((error as ErrorType).message)
			} finally {
				setIsLoading(false)
			}
		}

		fetchLots()
	}, [searchParams])

	async function onFinish(lotId: string, winnerId: string) {
		try {
			const res = await axiosInstance.patch(
				`/lots/${lotId}/finish`,
				winnerId
			)

			if (res.data.code !== 202) return toast.error(res.data.message)

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
		lots,
		isLoading,
		error,
		onFinish
	}
}
