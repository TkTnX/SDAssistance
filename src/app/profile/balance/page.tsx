import { Breadcrumbs } from '@/shared/components'
import { ProfileBalance } from '@/widgets'

const ProfileBalancePage = () => {
	return (
		<>
			<Breadcrumbs
				items={[
					{ name: 'Профиль', href: '/profile' },
					{ name: 'Финансы' }
				]}
			/>
			<section className='container'>
				<ProfileBalance />
			</section>
		</>
	)
}

export default ProfileBalancePage
