import { ILot } from '@/shared/types'
import { HeroSlider } from './components/HeroSlider'
import { prisma } from '@/shared/lib'

export const Hero = async () => {
	const activeLots = await prisma.lot.findMany({
		take: 3
	})
	return (
		<section>
			<HeroSlider activeLots={activeLots as unknown as ILot[]} />
		</section>
	)
}
