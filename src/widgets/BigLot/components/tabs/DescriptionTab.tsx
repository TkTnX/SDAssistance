import { LotTabItem } from '@/shared/components'
import { CAR_DRIVE, CAR_INSURANCE, CAR_TYPES } from '@/shared/constants'
import { ILot } from '@/shared/types'

type Props = {
	lot: ILot
}

export const DescriptionTab = ({ lot }: Props) => {
	return (
		<div className='mt-9 grid grid-cols-2 gap-11'>
			<div>
				<LotTabItem
					label='Вид страхования'
					arr={CAR_INSURANCE}
					value={String(lot.insurance)}
				/>
				<LotTabItem
					label='Начало торгов'
					value={`${new Date(lot.createdAt).toLocaleDateString(
						'ru-RU',
						{
							day: '2-digit',
							month: 'short',
							year: 'numeric'
						}
					)} ${new Date(lot.createdAt).toLocaleTimeString('ru-RU')}`}
				/>
				<LotTabItem
					label='Вид страхования'
					value={`${new Date(lot.endsAt).toLocaleDateString('ru-RU', {
						day: '2-digit',
						month: 'short',
						year: 'numeric'
					})} ${new Date(lot.endsAt).toLocaleTimeString('ru-RU')}`}
				/>
			</div>
			<div>
				<LotTabItem label='Регион' value={String(lot.region)} />
				<LotTabItem label='Город' value={String(lot.city)} />
			</div>
			<div>
				<LotTabItem label='VIN номер' value={String(lot.vin)} />
				{lot.frame && (
					<LotTabItem label='Frame номер' value={String(lot.frame)} />
				)}

				<LotTabItem
					label='Тип авто'
					arr={CAR_TYPES}
					value={String(lot.carType)}
				/>
				<LotTabItem label='Паспорт' value={String(lot.passport)} />
			</div>
			<div>
				<LotTabItem
					label='Привод'
					arr={CAR_DRIVE}
					value={String(lot.drive)}
				/>
				<LotTabItem
					label='Вид страхования'
					arr={CAR_INSURANCE}
					value={String(lot.insurance)}
				/>
			</div>
			{lot.comment && (
				<div>
					<h6 className='text-xl font-bold'>Комментарий</h6>
					<p className='text-text-1 mt-4'>{lot.comment}</p>
				</div>
			)}
			{lot.damages && (
				<div>
					<h6 className='text-xl font-bold'>Повреждения</h6>
					<p className='text-text-1 mt-4'>{lot.damages}</p>
				</div>
			)}
		</div>
	)
}
