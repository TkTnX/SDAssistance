import { NextRequest, NextResponse } from 'next/server'

const onlyWithoutAuth = ['/auth/register', '/auth/login']
const withAuth = ['/profile', '/lots/create']

export function middleware(request: NextRequest) {
	const token =
		request.cookies.get('next-auth.session-token') ??
		request.cookies.get('__Secure-next-auth.session-token') ??
		request.cookies.get('__Host-next-auth.session-token')

	for (const item of withAuth) {
		if (request.nextUrl.pathname.startsWith(item) && !token) {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}
	for (const item of onlyWithoutAuth) {
		if (request.nextUrl.pathname.startsWith(item) && token) {
			return NextResponse.redirect(new URL('/', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path', '/auth/:path', '/lots/create']
}
