import Link from 'next/link'

import { cn } from '@/shared/lib/utils'

interface Props extends React.ComponentProps<'a'> {
	text: string
	href: string
	className?: string
}

export const LinkMain = ({ text, href, className, ...props }: Props) => {
	return (
		<Link
			className={cn(
				'bg-osnovnoy flex h-[60px] w-[180px] items-center justify-center text-center font-bold text-white hover:opacity-80',
				className
			)}
			href={href}
			{...props}
		>
			{text}
		</Link>
	)
}
