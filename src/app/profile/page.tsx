import { ProfileForm } from '@/features'
import { Breadcrumbs } from '@/shared/components'

const ProfilePage = () => {
	return (
		<>
			<Breadcrumbs items={[{ name: 'Профиль' }]} />
			<section className='container'>
				<ProfileForm /> 
			</section>
		</>
	)
}

export default ProfilePage
