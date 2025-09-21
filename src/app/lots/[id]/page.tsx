import { Breadcrumbs } from '@/shared/components'
import { axiosInstance } from '@/shared/lib'
import { BigLot } from '@/widgets'
import { redirect } from 'next/navigation'

const LotPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id

	const lot = await axiosInstance.get(`/lots/${id}`)

	if ('message' in lot.data) return redirect('/')

	return (
		<>
			<Breadcrumbs
				items={[{ name: 'Активные лоты' }, { name: `Лот № ${id}` }]}
			/>
			<BigLot lot={lot.data} />
		</>
	)
}

export default LotPage
