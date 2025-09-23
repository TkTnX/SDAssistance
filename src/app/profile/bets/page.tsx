import { getServerSession } from 'next-auth'

import { Breadcrumbs } from '@/shared/components'
import { authOptions, prisma } from '@/shared/lib'
import { IBet } from '@/shared/types'
import { BetsList } from '@/widgets'

const ProfileBetsPage = async () => {
	const session = await getServerSession(authOptions)

	const bets = await prisma.bet.findMany({
		where: {
			userId: session?.userId
		},
		include: {
			lot: {
				include: {
					seller: {
						omit: { password: true }
					}
				}
			}
		}
	})

	return (
		<>
			<Breadcrumbs
				items={[
					{ name: 'Профиль', href: '/profile' },
					{ name: 'Ставки' }
				]}
			/>
			<section className='container'>
				<BetsList
					userId={session?.userId || ''}
					bets={bets as unknown as IBet[]}
				/>
			</section>
		</>
	)
}

export default ProfileBetsPage
