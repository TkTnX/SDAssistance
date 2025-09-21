type Props = {
	id: string
}

export const StopLotButton = ({ id }: Props) => {
	// TODO: Возможность остановки лота
	return (
		<button className='flex h-[30px] items-center justify-center rounded-full border border-[#d0d8e0] px-4 text-sm hover:opacity-80'>
			Остановить лот
		</button>
	)
}
