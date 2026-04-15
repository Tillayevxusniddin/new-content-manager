'use client'
import { useRouter } from 'next/navigation'
/* eslint-disable react-refresh/only-export-components */
// filepath: /home/xusniddin/Development/new-content-manager/frontend/src/lib/auth-context.tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type Role = 'admin' | 'user'

export type SessionUser = {
	id: string
	name: string
	email: string
	role: Role
}

type LoginResult = { ok: true } | { ok: false; error: string }

type AuthContextValue = {
	user: SessionUser | null
	isAuthenticated: boolean
	isLoading: boolean
	login: (email: string, password: string) => Promise<LoginResult>
	logout: () => void
	hasRole: (roles: Role | Role[]) => boolean
}

export const DEMO_ACCOUNTS = [
	{
		role: 'admin' as const,
		email: 'admin@example.com',
		password: 'admin123',
		label: '管理者アカウント'
	},
	{
		role: 'user' as const,
		email: 'mina.sato@company.com',
		password: 'user123',
		label: 'Mina Sato'
	}
	// { role: 'user' as const, email: 'yuki.yamamoto@company.com', password: 'user123', label: 'Yuki Yamamoto' },
	// { role: 'user' as const, email: 'hiroshi.nakamura@company.com', password: 'user123', label: 'Hiroshi Nakamura' },
	// { role: 'user' as const, email: 'sakura.kobayashi@company.com', password: 'user123', label: 'Sakura Kobayashi' }
] as const

const SESSION_KEY = 'ncm.session.v1'
const FIRST_LOGIN_NOTICE_PREFIX = 'ncm.first-login-notice.v1'
const LEGACY_KEYS = [
	'role',
	'userRole',
	'uiMode',
	'viewMode',
	'isAdminView',
	'adminView',
	'auth',
	'session',
	'token'
]

function getNoticeKey(email: string) {
	return `${FIRST_LOGIN_NOTICE_PREFIX}:${email.trim().toLowerCase()}`
}

export function hasAcceptedFirstLoginNotice(email: string) {
	if (typeof window === 'undefined') return false
	return localStorage.getItem(getNoticeKey(email)) === 'true'
}

export function markFirstLoginNoticeAccepted(email: string) {
	localStorage.setItem(getNoticeKey(email), 'true')
}

export function getPostLoginPath(user: SessionUser) {
	return hasAcceptedFirstLoginNotice(user.email)
		? user.role === 'admin'
			? '/admin'
			: '/'
		: '/first-login'
}

const FRONTEND_USERS: Array<SessionUser & { password: string; aliases?: string[] }> = [
	{
		id: 'u-admin-1',
		name: 'Admin',
		email: DEMO_ACCOUNTS[0].email,
		password: DEMO_ACCOUNTS[0].password,
		role: 'admin',
		aliases: ['admin', 'admin@local']
	},
	{
		id: 'u-user-1',
		name: 'Mina Sato',
		email: DEMO_ACCOUNTS[1].email,
		password: DEMO_ACCOUNTS[1].password,
		role: 'user',
		aliases: ['mina', 'mina@local']
	}
	// {
	// 	id: 'u-user-2',
	// 	name: 'Yuki Yamamoto',
	// 	email: DEMO_ACCOUNTS[2].email,
	// 	password: DEMO_ACCOUNTS[2].password,
	// 	role: 'user',
	// 	aliases: ['yuki', 'yuki@local']
	// },
	// {
	// 	id: 'u-user-3',
	// 	name: 'Hiroshi Nakamura',
	// 	email: DEMO_ACCOUNTS[3].email,
	// 	password: DEMO_ACCOUNTS[3].password,
	// 	role: 'user',
	// 	aliases: ['hiroshi', 'hiroshi@local']
	// },
	// {
	// 	id: 'u-user-4',
	// 	name: 'Sakura Kobayashi',
	// 	email: DEMO_ACCOUNTS[4].email,
	// 	password: DEMO_ACCOUNTS[4].password,
	// 	role: 'user',
	// 	aliases: ['sakura', 'sakura@local']
	// }
]

const AuthContext = createContext<AuthContextValue | null>(null)

function clearLegacyStorage() {
	LEGACY_KEYS.forEach(k => {
		localStorage.removeItem(k)
		sessionStorage.removeItem(k)
	})
}

function saveSession(user: SessionUser | null) {
	if (!user) {
		localStorage.removeItem(SESSION_KEY)
		return
	}
	localStorage.setItem(SESSION_KEY, JSON.stringify({ user }))
}

function readSession(): SessionUser | null {
	const raw = localStorage.getItem(SESSION_KEY)
	if (!raw) return null
	try {
		const parsed = JSON.parse(raw) as { user?: SessionUser }
		if (!parsed?.user?.role) return null
		return parsed.user
	} catch {
		return null
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<SessionUser | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	useEffect(() => {
		clearLegacyStorage()
		const restored = readSession()
		setUser(restored)
		setIsLoading(false)
	}, [])

	const login = useCallback(
		async (email: string, password: string): Promise<LoginResult> => {
			const normalized = email.trim().toLowerCase()

			const found = FRONTEND_USERS.find(u => {
				const emails = [
					u.email.toLowerCase(),
					...(u.aliases ?? []).map(a => a.toLowerCase())
				]
				return emails.includes(normalized) && u.password === password
			})

			if (!found) return { ok: false, error: 'Invalid credentials' }

			const sessionUser: SessionUser = {
				id: found.id,
				name: found.name,
				email: found.email,
				role: found.role
			}

			clearLegacyStorage()
			setUser(sessionUser)
			saveSession(sessionUser)

			router.push(getPostLoginPath(sessionUser))
			return { ok: true }
		},
		[router]
	)

	const logout = useCallback(() => {
		setUser(null)
		saveSession(null)
		clearLegacyStorage()
		sessionStorage.clear()
		router.push('/login')
	}, [])

	const hasRole = useCallback(
		(roles: Role | Role[]) => {
			if (!user) return false
			const arr = Array.isArray(roles) ? roles : [roles]
			return arr.includes(user.role)
		},
		[user]
	)

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			isAuthenticated: !!user,
			isLoading,
			login,
			logout,
			hasRole
		}),
		[user, isLoading, login, logout, hasRole]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider')
	return ctx
}
