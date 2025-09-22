import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '.'

type Props = {
	children: React.ReactNode
	title: string
	onConfirm: () => void
}

export const SubmitModal = ({ children, title, onConfirm }: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter className='flex items-center justify-between'>
					<AlertDialogCancel className='border-osnovnoy flex-1 rounded-lg border py-2'>
						Отмена
					</AlertDialogCancel>
					<AlertDialogAction
						className='bg-osnovnoy flex-1 rounded-lg py-2 text-white'
						onClick={onConfirm}
					>
						Подтвердить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
