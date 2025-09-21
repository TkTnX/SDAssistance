'use client'

import { LucideShare2 } from 'lucide-react'
import { toast } from 'react-toastify'

export const CopyButton = ({ id }: { id: string }) => {
	const onClick = () => {
		navigator.clipboard.writeText(
			`${process.env.NEXT_PUBLIC_SITE_URL}/lots/${id}`
		)

		return toast.success('Лот скопирован в буфер обмена!')
	}

	return (
		<button
			onClick={onClick}
			className='flex h-[30px] w-[30px] items-center justify-center rounded-full border border-[#d0d8e0] hover:opacity-80'
		>
			<LucideShare2 size={16} color='var(--osnovnoy-cvet)' />
		</button>
	)
}
