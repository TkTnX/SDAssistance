type Props = {
	step: number
	currentStep: number
}

export const CreateLotStepThree = ({ step, currentStep }: Props) => {
	if (step !== currentStep) return null
	return (
		<div>
			<h4 className='text-text-1 text-2xl font-medium'>Фотографии</h4>
			<p className='text-text-2 mt-5 text-sm'>
				Разрешение загружаемых фото не должно превышать 6000x6000
				пикселей, размер — 5 MB. Допустимые форматы фото: jpeg, bmp, png
			</p>
			<label className='text-text-2 mt-9 flex h-[230px] w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-white px-4 text-center'>
				<p>Добавить фото</p>
				<input
					hidden
					type='file'
					accept='image/png, image/jpeg, image/bmp'
				/>
			</label>
		</div>
	)
}
