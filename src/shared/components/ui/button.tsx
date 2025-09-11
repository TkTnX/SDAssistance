import { cn } from '@/shared/lib/utils'

interface Props extends React.ComponentProps<'button'> {
	text: string
}

export const Button = ({ className, text, ...props }: Props) => {
	return (
		<button
			className={cn(
				'bg-osnovnoy flex h-[60px] items-center justify-center text-center font-bold text-white hover:opacity-80 disabled:pointer-events-none disabled:opacity-50',
				className
			)}
			{...props}
		>
			{text}
		</button>
	)
}
