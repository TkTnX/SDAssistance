import { HeroSlider } from './components/HeroSlider'
import { ELotStatuses } from '@/generated/prisma'
import { prisma } from '@/shared/lib'
import { ILot } from '@/shared/types'

export const Hero = async () => {
	const activeLots = await prisma.lot.findMany({
		take: 3,
		where: { endsAt: { gt: new Date() }, status: ELotStatuses.available }
	})
	return (
		<section>
			<HeroSlider activeLots={activeLots as unknown as ILot[]} />
		</section>
	)
}
