import Image from 'next/image'

import { SeeAllPhotos } from '@/shared/components'

export const BigLotImages = ({ images }: { images: string[] }) => {
	return (
		<div className='flex-1 lg:max-w-[540px]'>
			<div className='relative h-80 w-full'>
				<Image
					src={images[0]}
					alt='lot image'
					className='rounded-lg object-cover'
					fill
				/>
			</div>
			<div className='mt-1 grid grid-cols-4 items-center gap-1'>
				{images.slice(1, 9).map((image, index) => (
					<div className='relative h-[74px] w-full' key={index}>
						{index === 7 && (
							<SeeAllPhotos photos={images}>
								<button className='absolute z-10 h-full w-full rounded-lg bg-[#041222]/60 text-center text-xs text-white md:text-base'>
									Ещё {images.slice(9).length} фото
								</button>
							</SeeAllPhotos>
						)}
						<Image
							src={image}
							alt={`image-${index}`}
							fill
							className='rounded-lg object-cover'
						/>
					</div>
				))}
			</div>
		</div>
	)
}
