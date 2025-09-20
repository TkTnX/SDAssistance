import { HeroSlider } from './components/HeroSlider'
import { prisma } from '@/shared/lib'
import { ILot } from '@/shared/types'

export const Hero = async () => {
	const activeLots = await prisma.lot.findMany({
		take: 3,
		where: { endsAt: { gt: new Date() } }
	})
	return (
		<section>
			<HeroSlider activeLots={activeLots as unknown as ILot[]} />
		</section>
	)
}
