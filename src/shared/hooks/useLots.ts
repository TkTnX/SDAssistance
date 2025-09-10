import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';



import { axiosInstance } from '@/shared/lib';
import { ErrorType, ILot } from '@/shared/types';





type lotsData = {
	data: ILot[]
	page: number
	totalPages: number
}

export function useLots() {
	const [isLoading, setIsLoading] = useState(false)
	const [lots, setLots] = useState<lotsData | null>(null)
	const [error, setError] = useState<null | string>(null)

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

	return {
		lots,
		isLoading,
		error
	}
}