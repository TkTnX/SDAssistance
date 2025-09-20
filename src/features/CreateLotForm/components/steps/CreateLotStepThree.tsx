/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useState } from 'react'

import { useLotStore } from '@/shared/stores'

type Props = {
	step: number
	currentStep: number
}

export const CreateLotStepThree = ({ step, currentStep }: Props) => {
	const [loadedPhotos, setLoadedPhotos] = useState<FileList | null>(null)
	const setLotInfo = useLotStore(state => state.setLotInfo)
	if (step !== currentStep) return null

	const onAddPhotos = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return
		setLotInfo('photos', e.target.files as unknown as string)
		setLoadedPhotos(e.target.files)
	}

	return (
		<div>
			<h4 className='text-text-1 text-2xl font-medium'>Фотографии</h4>
			<p className='text-text-2 mt-5 text-sm'>
				Разрешение загружаемых фото не должно превышать 6000x6000
				пикселей, размер — 5 MB. Допустимые форматы фото: jpeg, bmp, png
			</p>
			{loadedPhotos && (
				<div className='mt-4 flex flex-wrap items-center gap-3'>
					{Array.from(loadedPhotos).map((file, index) => (
						<div className='max-w-[200px]' key={index}>
							<img
								src={URL.createObjectURL(file)}
								alt={`preview-${index}`}
								className='h-full w-full rounded-lg object-cover'
							/>
						</div>
					))}
				</div>
			)}
			<label className='text-text-2 mt-9 flex h-[230px] w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-white px-4 text-center'>
				<p>Добавить фото</p>
				<input
					onChange={onAddPhotos}
					hidden
					multiple
					type='file'
					accept='image/png, image/jpeg, image/bmp'
				/>
			</label>
		</div>
	)
}
