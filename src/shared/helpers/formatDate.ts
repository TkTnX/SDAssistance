export function formatDate(date: string) {
	const startDate = new Date(date)
	const fullDate = startDate.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	})

	const time = startDate.toLocaleTimeString('ru-RU', {
		second: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	})

	return `${fullDate} ${time}`
}
