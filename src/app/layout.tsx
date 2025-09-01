import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'
import { Footer, Header } from '@/widgets'

const GothamPro = localFont({
	src: [
		{
			path: '../shared/fonts/gotham/gothampro_black.ttf',
			weight: '900',
			style: 'normal'
		},
		{
			path: '../shared/fonts/gotham/gothampro_bold.ttf',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../shared/fonts/gotham/gothampro_black.ttf',
			weight: '900',
			style: 'normal'
		},
		{
			path: '../shared/fonts/gotham/gothampro_light.ttf',
			weight: '300',
			style: 'normal'
		},
		{
			path: '../shared/fonts/gotham/gothampro_medium.ttf',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../shared/fonts/gotham/gothampro.ttf',
			weight: '400',
			style: 'normal'
		}
	]
})

export const metadata: Metadata = {
	title: 'SDAssistance - Торги за автомобили'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning={true} lang='en'>
			<body className={`${GothamPro.className} antialiased`}>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
