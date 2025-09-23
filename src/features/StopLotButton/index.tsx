'use client'
import { SubmitModal } from '@/shared/components'
import { useLots } from '@/shared/hooks'

type Props = {
	id: string
}

export const StopLotButton = ({ id }: Props) => {
	const { onDelete } = useLots()

	return (
		<SubmitModal onConfirm={() => onDelete(id)} title='Вы уверены, что хотите удалить лот?'>
			<button className='flex h-[30px] items-center justify-center rounded-full border border-[#d0d8e0] px-4 text-sm hover:opacity-80'>
				Удалить лот
			</button>
		</SubmitModal>
	)
}
