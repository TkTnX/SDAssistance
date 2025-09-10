export function formatPrice(price: number) {
    const formatted = new Intl.NumberFormat('ru-RU', {
        style: "currency",
        currency: 'RUB'
    })

    return formatted.format(price)
}