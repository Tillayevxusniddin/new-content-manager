'use client'

import { BookOpenText } from 'lucide-react'
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
		<div className='bg-background text-foreground min-h-dvh'>
			<div className='relative mx-auto grid min-h-dvh max-w-7xl gap-6 px-4 py-5 lg:grid-cols-[1.08fr_0.92fr] lg:px-6 lg:py-6'>
				<section className='border-border bg-card/70 relative h-full rounded-[2rem] border p-6 shadow-2xl lg:p-10'>
					<div className='relative flex h-full flex-col justify-between gap-8'>
						<div className='space-y-6'>
							<div className='flex items-center justify-between gap-4'>
								<Link href='/' className='flex items-center gap-3 font-bold'>
									<span className='bg-primary/20 text-primary glow-soft flex h-12 w-12 items-center justify-center rounded-2xl'>
										<BookOpenText className='h-6 w-6' />
									</span>
									<div>
										<div className='text-lg'>Book Summary App</div>
										<div className='text-muted-foreground text-xs font-normal'>
											社員向け要約プラットフォーム
										</div>
									</div>
								</Link>
								<Badge className='border-border bg-surface text-foreground'>
									Sign In
								</Badge>
							</div>

							<div className='max-w-2xl space-y-4'>
								<h1 className='text-4xl leading-none font-black tracking-tight md:text-6xl'>
									Book Summary App
								</h1>
							</div>
						</div>

						<div className='space-y-4'>
							<div className='flex items-center gap-3'>
								<div className='bg-border h-px flex-1' />
								<span className='text-muted-foreground text-xs tracking-[0.28em] uppercase'>
									Featured books
								</span>
								<div className='bg-border h-px flex-1' />
							</div>
							<div className='grid gap-3 sm:grid-cols-3'>
								{books.slice(0, 3).map(book => (
									<div
										key={book.id}
										className='border-border bg-surface group overflow-hidden rounded-[1.5rem] border p-3 transition hover:-translate-y-1'
									>
										<div
											className={`aspect-3/4 rounded-[1.1rem] bg-linear-to-br ${book.coverTone} relative overflow-hidden`}
										>
											<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_28%)]' />
											<div className='bg-card/75 absolute inset-x-3 bottom-3 rounded-2xl p-3 backdrop-blur-sm'>
												<div className='text-muted-foreground text-[10px] tracking-[0.26em] uppercase'>
													{book.categoryName}
												</div>
												<div className='mt-1 text-sm font-semibold'>
													{book.title}
												</div>
											</div>
										</div>
										<div className='text-muted-foreground mt-3 flex items-center justify-between gap-2 text-xs'>
											<span>{book.author}</span>
											<span>{book.progress}%</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className='flex h-full items-center justify-center'>
					<Card className='h-full w-full max-w-md'>
						<CardHeader className='space-y-3 p-6 pb-0 md:p-8 md:pb-0'>
							<Badge className='border-border bg-surface text-foreground w-fit'>
								ログイン
							</Badge>
							<CardTitle className='text-foreground text-3xl'>
								アカウントにサインイン
							</CardTitle>
							<CardDescription className='text-muted-foreground'>
								下のデモアカウントでログインできます。
							</CardDescription>
						</CardHeader>
						<CardContent className='p-6 md:p-8 md:pt-0'>
							<Form />
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	)
}
