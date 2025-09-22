'use client'

import { Clock } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/shared/lib'

type Props = {
	time: Date
}

export const Timer = ({ time }: Props) => {
	const [date, setDate] = useState({
		days: 0,
		hours: 0,
		minutes: 0
	})
	const now = new Date()
	const deadline = new Date(time)
	const diff = Date.parse(String(deadline)) - Number(now)

	useEffect(() => {
		const interval = setInterval(
			() =>
				setDate({
					days: Math.floor(diff / (1000 * 60 * 60 * 24)),
					hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
					minutes: Math.floor((diff / (1000 * 60)) % 60)
				}),
			1000
		)

		return () => clearInterval(interval)
	}, [])

	return (
		<div
			className={cn(
				'text-dop-cvet-zelenyy border-dop-cvet-zelenyy flex h-7 w-fit items-center gap-1 rounded-full border px-2.5 text-sm font-bold',
				{
					'border-red-500': diff === 0
				}
			)}
		>
			<Clock
				size={14}
				className={cn('', { 'stroke-red-500': diff === 0 })}
				color='var(--dop-cvet-zelenyy)'
			/>
			{diff === 0 ? (
				<span className='text-red-500'>Лот закончился</span>
			) : (
				`${date.days}д ${date.hours}ч ${date.minutes}мин`
			)}
		</div>
	)
}
