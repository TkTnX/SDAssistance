import { cn } from '@/shared/lib/utils'

interface Props extends React.ComponentProps<'button'> {
	text: string
}

export const Button = ({ className, text, ...props }: Props) => {
	return (
		<button
			className={cn(
				'bg-osnovnoy h-[60px] text-center font-bold text-white hover:opacity-80',
				className
			)}
			{...props}
		>
			{text}
		</button>
	)
}
