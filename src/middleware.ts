import { getToken } from 'next-auth/jwt'
import { type NextRequest, NextResponse } from 'next/server'

import { EUserRoles } from '@/generated/prisma'

const onlyWithoutAuth = ['/auth/register', '/auth/login']
const withAuth = ['/profile', '/lots/create']
const onlyForSeller = ['/profile/lots', '/lots/create', '/profile/balance']

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret })

	const isSeller = token?.role === EUserRoles.seller

	for (const item of withAuth) {
		if (req.nextUrl.pathname.startsWith(item) && !token) {
			return NextResponse.redirect(new URL('/', req.url))
		}
	}
	for (const item of onlyWithoutAuth) {
		if (req.nextUrl.pathname.startsWith(item) && token) {
			return NextResponse.redirect(new URL('/', req.url))
		}
	}

	for (const item of onlyForSeller) {
		if (req.nextUrl.pathname.startsWith(item) && !isSeller) {
			return NextResponse.redirect(new URL('/', req.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path', '/auth/:path', '/lots/create']
}
