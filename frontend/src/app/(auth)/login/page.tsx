'use client'

import { ArrowRight, BookOpenText } from 'lucide-react'
import Link from 'next/link'

import { Form } from '@/features/form-login'

import { useAuth } from '@/shared/hooks/use-auth'
import { books } from '@/shared/lib/mock-data'
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

export default function LoginPage() {
	const { isLoading } = useAuth()

	// useEffect(() => {
	// 	if (isLoading) return
	// 	if (!isAuthenticated || !user) return
	// 	router.push(user.role === 'admin' ? '/admin' : '/')
	// }, [isLoading, isAuthenticated, user, router])

	if (isLoading) return null
	return (
		<div className='relative min-h-dvh overflow-hidden bg-[#05070d] text-white'>
			<div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.24),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.22),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.18),transparent_30%)]' />
			<div className='absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_18%,transparent_82%,rgba(255,255,255,0.03)_100%)]' />

			<div className='relative mx-auto grid min-h-dvh max-w-7xl gap-6 px-4 py-5 lg:grid-cols-[1.08fr_0.92fr] lg:px-6 lg:py-6'>
				<section className='border-white/10 bg-white/5 relative overflow-hidden rounded-[2rem] border p-6 shadow-2xl backdrop-blur-2xl lg:p-10'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_22%)]' />
					<div className='relative flex h-full flex-col justify-between gap-8'>
						<div className='space-y-6'>
							<div className='flex items-center justify-between gap-4'>
								<Link href='/' className='flex items-center gap-3 font-bold'>
									<span className='bg-primary/20 text-primary glow-soft flex h-12 w-12 items-center justify-center rounded-2xl'>
										<BookOpenText className='h-6 w-6' />
									</span>
									<div>
										<div className='text-lg'>Book Summary App</div>
										<div className='text-white/60 text-xs font-normal'>社員向け要約プラットフォーム</div>
									</div>
								</Link>
										<Badge className='border-white/15 bg-white/10 text-white/85'>Sign In</Badge>
							</div>

							<div className='max-w-2xl space-y-4'>
										<h1 className='text-4xl leading-none font-black tracking-tight text-white md:text-6xl'>
											Book Summary App
										</h1>
							</div>
						</div>

						<div className='space-y-4'>
							<div className='flex items-center gap-3'>
								<div className='bg-white/10 h-px flex-1' />
								<span className='text-white/50 text-xs uppercase tracking-[0.28em]'>Featured books</span>
								<div className='bg-white/10 h-px flex-1' />
							</div>
							<div className='grid gap-3 sm:grid-cols-3'>
								{books.slice(0, 3).map(book => (
									<div
										key={book.id}
										className='group border-white/10 bg-black/20 overflow-hidden rounded-[1.5rem] border p-3 transition hover:-translate-y-1'
									>
										<div
											className={`aspect-[3/4] rounded-[1.1rem] bg-linear-to-br ${book.coverTone} relative overflow-hidden`}
										>
											<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_28%)]' />
											<div className='absolute inset-x-3 bottom-3 rounded-2xl bg-black/35 p-3 backdrop-blur-sm'>
												<div className='text-[10px] tracking-[0.26em] text-white/55 uppercase'>
													{book.categoryName}
												</div>
												<div className='mt-1 text-sm font-semibold'>{book.title}</div>
											</div>
										</div>
										<div className='mt-3 flex items-center justify-between gap-2 text-xs text-white/60'>
											<span>{book.author}</span>
											<span>{book.progress}%</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className='flex items-center justify-center'>
					<Card className='border-white/10 bg-black/40 w-full max-w-md shadow-[0_24px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl'>
						<CardHeader className='space-y-3 p-6 pb-0 md:p-8 md:pb-0'>
							<Badge className='w-fit border-white/10 bg-white/10 text-white/80'>
								ログイン
							</Badge>
							<CardTitle className='text-3xl text-white'>
								アカウントにサインイン
							</CardTitle>
							<CardDescription className='text-white/60'>
								下のデモアカウントでログインできます。
							</CardDescription>
						</CardHeader>
						<CardContent className='p-6 pt-5 md:p-8'>
							<Form />
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	)
}
