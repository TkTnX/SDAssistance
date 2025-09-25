import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma } from '@/shared/lib/prismaClient'

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			type: 'credentials',
			name: 'Credentials',
			credentials: {
				emailOrPhone: {
					label: 'E-mail или телефон',
					type: 'text'
				},
				password: {
					label: 'Пароль',
					type: 'password',
					placeholder: '******'
				}
			},
			async authorize(credentials) {
				if (!credentials) return null
				const isEmail = credentials.emailOrPhone.includes('@')

				const existingUser = await prisma.user.findFirst({
					where: {
						[isEmail ? 'email' : 'phone']: isEmail
							? credentials.emailOrPhone
							: credentials.emailOrPhone.replace(/\D/g, '')
					}
				})

				if (!existingUser) return null

				const isValidPassword = await bcrypt.compare(
					credentials.password,
					existingUser.password
				)

				if (existingUser && isValidPassword) return existingUser

				return null
			}
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				console.log(user)
				token.userId = user.id
				token.role = user.role
			}
			return token
		},
		async session({ session, token }) {
			session.userId = token.userId as string
			session.role = token.role as string

			return session
		}
	},
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register'
	}
}
