'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { DEMO_ACCOUNTS } from '@/shared/hooks/auth-context'
import { useAuth } from '@/shared/hooks/use-auth'

export default function LoginPage() {
	const router = useRouter()
	const { login, user, isAuthenticated, isLoading } = useAuth()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		if (isLoading) return
		if (!isAuthenticated || !user) return

		router.push(user.role === 'admin' ? '/admin' : '/')
	}, [isLoading, isAuthenticated, user, router])

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setError('')
		setSubmitting(true)

		try {
			const result = await login(email, password)

			const ok =
				typeof result === 'boolean'
					? result
					: typeof result === 'object' && result !== null && 'ok' in result
						? Boolean(result.ok)
						: false

			if (!ok) {
				const msg =
					typeof result === 'object' && result !== null && 'error' in result
						? String(result.error || 'Invalid credentials')
						: 'Invalid credentials'
				setError(msg)
			}
		} catch {
			setError('Login failed. Please try again.')
		} finally {
			setSubmitting(false)
		}
	}

	if (isLoading) return null

	return (
		<div className='relative mx-auto flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-10'>
			<div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.15),transparent_35%)]' />
			<form
				onSubmit={onSubmit}
				className='border-glass-border/80 bg-card/75 w-full max-w-md space-y-5 rounded-3xl border p-7 shadow-2xl backdrop-blur-xl md:p-8'
			>
				<div>
					<p className='text-muted-foreground text-xs tracking-[0.2em]'>
						BOOK SUMMARY PLATFORM
					</p>
					<h1 className='text-foreground mt-2 text-2xl font-black'>ログイン</h1>
					<p className='text-muted-foreground mt-1 text-sm'>
						権限に応じて UI が自動的に切り替わります。
					</p>
				</div>

				<div className='space-y-2'>
					<label htmlFor='email' className='text-foreground/90 text-sm font-medium'>
						メール
					</label>
					<input
						id='email'
						type='text'
						autoComplete='username'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='border-glass-border bg-background/80 focus:border-primary/50 focus:ring-primary/20 w-full rounded-xl border px-3 py-2.5 text-sm transition outline-none focus:ring-2'
						required
					/>
				</div>

				<div className='space-y-2'>
					<label htmlFor='password' className='text-foreground/90 text-sm font-medium'>
						パスワード
					</label>
					<input
						id='password'
						type='password'
						autoComplete='current-password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='border-glass-border bg-background/80 focus:border-primary/50 focus:ring-primary/20 w-full rounded-xl border px-3 py-2.5 text-sm transition outline-none focus:ring-2'
						required
					/>
				</div>

				<div className='border-glass-border/80 bg-background/45 rounded-2xl border p-3'>
					<p className='text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase'>
						Mock Accounts
					</p>
					<div className='text-foreground/90 mt-2 space-y-2 text-xs'>
						{DEMO_ACCOUNTS.map(account => (
							<button
								key={account.email}
								type='button'
								onClick={() => {
									setEmail(account.email)
									setPassword(account.password)
								}}
								className='border-glass-border/80 bg-card/70 hover:border-primary/30 hover:bg-surface-hover w-full rounded-lg border px-2.5 py-2 text-left transition'
							>
								<span className='text-foreground font-semibold'>
									{account.label}
								</span>
								<span className='text-muted-foreground ml-2'>({account.role})</span>
								<div className='text-muted-foreground mt-1'>
									email: {account.email}
								</div>
								<div className='text-muted-foreground'>
									password: {account.password}
								</div>
							</button>
						))}
					</div>
				</div>

				{error ? <p className='text-sm text-red-400'>{error}</p> : null}

				<button
					type='submit'
					disabled={submitting}
					className='bg-primary text-primary-foreground w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:opacity-95 disabled:opacity-60'
				>
					{submitting ? 'ログイン中...' : 'ログイン'}
				</button>
			</form>
		</div>
	)
}
