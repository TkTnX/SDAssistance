import { Breadcrumbs } from '@/shared/components'
import { ProfileLotsList } from '@/widgets'

const ProfileLotsPage = () => {
	return (
		<>
			<Breadcrumbs
				items={[
					{ name: 'Профиль', href: '/profile' },
					{ name: 'Ваши лоты' }
				]}
			/>

			<section className='container'>
				<ProfileLotsList />
			</section>
		</>
	)
}

export default ProfileLotsPage
