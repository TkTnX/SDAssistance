import { prisma } from "@/shared/lib/prismaClient";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";




export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
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
				token.userId = user.id
			}
			return token
		},
		async session({ session, token }) {
			session.userId = token.userId as string

			return session
		}
	},
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register'
	}
}