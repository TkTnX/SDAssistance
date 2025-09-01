export const findSettings = (
	arr: { value: string; name: string }[],
	value: string
) => {
	return arr.find(item => item.value === value)?.name || value
}
