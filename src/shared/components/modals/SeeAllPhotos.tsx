'use client'

import Image from 'next/image'
import { useState } from 'react'

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/shared/components/ui'
import { cn } from '@/shared/lib'

type Props = {
	photos: string[]
	children: React.ReactNode
}

export const SeeAllPhotos = ({ photos, children }: Props) => {
	const [currentPhoto, setCurrentPhoto] = useState(0)
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className='!w-[600px] !max-w-[100%]'>
				<AlertDialogHeader>
					<AlertDialogTitle>Фото автомобиля</AlertDialogTitle>
				</AlertDialogHeader>

				<div className='relative h-[300px] w-full'>
					<Image
						src={photos[currentPhoto]}
						alt='Big photo'
						className='object-cover'
						fill
					/>
				</div>

				<div className='flex flex-wrap items-center gap-2'>
					{photos.map((photo, index) => (
						<button
							className={cn('', {
								'rounded-lg border-2 border-black': index === currentPhoto
							})}
							onClick={() => setCurrentPhoto(index)}
							key={index}
						>
							<Image
								src={photo}
								alt={`photo-${index}`}
								width={40}
								height={40}
								className='h-10 w-10 rounded-lg object-cover'
							/>
						</button>
					))}
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}
