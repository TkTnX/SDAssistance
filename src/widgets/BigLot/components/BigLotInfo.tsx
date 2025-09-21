'use client'

import { useState } from 'react'

import { DescriptionTab } from './tabs'
import { cn } from '@/shared/lib'
import { ILot } from '@/shared/types'

type Props = {
	lot: ILot
}

export const BigLotInfo = ({ lot }: Props) => {
	return (
		<div className='container mt-14'>
			<p className={'text-2xl font-bold'}>Описание</p>

			<DescriptionTab lot={lot} />
		</div>
	)
}
