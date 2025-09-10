type Props = {
	page: number
	totalPages: number
}

export const Pagination = ({ page, totalPages }: Props) => {
	return (
		<div className='flex items-center gap-2 mt-5 justify-center'>
			<p>Страницы:</p>
			<div className="flex items-center flex-wrap">
				{page !== 1 && <button className="py-2 px-3.5 flex items-center justify-center">{page - 1}</button>}
				<p className="py-2 px-3.5 flex items-center justify-center bg-[#f0f2f5] text-sm font-bold">{page}</p>
				{page !== totalPages && <button className="py-2 px-3.5 flex items-center justify-center">{page + 1}</button>}
				{page !== totalPages && <div >| ... |</div>}
				{page !== totalPages && <p className=" py-2 flex items-center justify-center pl-3.5">{totalPages}</p>}
			</div>
		</div>
	)
}
