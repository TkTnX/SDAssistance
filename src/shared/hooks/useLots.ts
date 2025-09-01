import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { axiosInstance } from '@/shared/lib'
import { ErrorType, ILot } from '@/shared/types'

export function useLots() {
	const [searchParams] = useSearchParams()
	const [isLoading, setIsLoading] = useState(false)
	const [lots, setLots] = useState<ILot[]>([])
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		const fetchLots = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const data = await axiosInstance.get('/lots', {
					params: {}
				})

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

	return {
		lots,
		isLoading,
		error
	}
}
