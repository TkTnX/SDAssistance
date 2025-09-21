import Link from 'next/link'

type Props = {
	items: { name: string; href?: string }[]
}

export const Breadcrumbs = ({ items }: Props) => {
	return (
		<div className='text-text-2 container mt-7 flex items-center gap-2 text-sm flex-wrap'>
			<Link href={'/'}>Главная</Link>
			{items.map((item, index) => (
				<div className='flex items-center gap-2' key={index}>
					<span className='last:hidden'>-</span>

					{item.href ? (
						<Link href={item.href}>{item.name}</Link>
					) : (
						<p>{item.name}</p>
					)}
				</div>
			))}
		</div>
	)
}
