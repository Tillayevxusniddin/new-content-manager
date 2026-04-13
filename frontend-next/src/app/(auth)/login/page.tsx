'use client'

import { Form } from '@/features/form-login'

import { useAuth } from '@/shared/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

export default function LoginPage() {
	const { isLoading } = useAuth()

	// useEffect(() => {
	// 	if (isLoading) return
	// 	if (!isAuthenticated || !user) return
	// 	router.push(user.role === 'admin' ? '/admin' : '/')
	// }, [isLoading, isAuthenticated, user, router])

	if (isLoading) return null
	return (
		<div className='relative mx-auto flex min-h-dvh w-full items-center justify-center overflow-hidden px-4 py-10'>
			<div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.15),transparent_35%)]' />
			<Card>
				<CardHeader>
					<p className='text-muted-foreground text-xs tracking-[0.2em]'>
						BOOK SUMMARY PLATFORM
					</p>
					<CardTitle>ログイン</CardTitle>
					<CardDescription> 権限に応じて UI が自動的に切り替わります。</CardDescription>
				</CardHeader>
				<CardContent>
					<Form />
				</CardContent>
			</Card>
		</div>
	)
}
