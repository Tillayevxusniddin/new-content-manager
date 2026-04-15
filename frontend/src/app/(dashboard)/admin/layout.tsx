'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/shared/hooks/use-auth'

export default function AdminLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const { user, isLoading } = useAuth()
	const router = useRouter()
	const isAdmin = user?.role === 'admin'

	useEffect(() => {
		if (!isLoading && !isAdmin) {
			router.replace('/')
		}
	}, [isAdmin, isLoading, router])

	if (isLoading) {
		return (
			<div className='flex min-h-[50vh] items-center justify-center px-4'>
				<div className='rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-4 text-sm text-zinc-400'>
					Loading...
				</div>
			</div>
		)
	}

	if (!isAdmin) {
		return (
			<div className='flex min-h-[50vh] items-center justify-center px-4'>
				<div className='rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-5 text-center'>
					<div className='text-lg font-semibold text-zinc-100'>403 Forbidden</div>
					<p className='mt-2 text-sm text-zinc-400'>Access denied.</p>
				</div>
			</div>
		)
	}

	return <>{children}</>
}
