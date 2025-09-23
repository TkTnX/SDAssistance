import { ELotStatuses } from '@/generated/prisma'
import { prisma } from '@/shared/lib'

export const HeaderTotal = async () => {
	const total = await prisma.lot.count({
		where: { status: ELotStatuses.finished }
    })
    console.log(total)

	return (
		<p className='text-text-2 hidden sm:block'>
			Проведено торгов:{' '}
			<span className='text-osnovnoy font-bold'>{total}</span>
		</p>
	)
}
