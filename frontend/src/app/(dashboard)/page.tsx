'use client'
import {
	ArrowRight,
	BookOpenText,
	BookMarked,
	Clock3,
	FileText,
	FolderOpen,
	Headphones,
	Play,
	Sparkles,
	TrendingUp,
	Users,
	Video
} from 'lucide-react'
import Link from 'next/link'

import { useAuth } from '@/shared/hooks/use-auth'
import { BookSummary, books, categories, dashboardStats } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { Badge, Button } from '@/shared/ui'

export function Progress({ value = 0, className }: { value?: number; className?: string }) {
	return (
		<div className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10', className)}>
			<div
				className='from-primary h-full rounded-full bg-linear-to-r to-cyan-400 transition-all'
				style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
			/>
		</div>
	)
}

const iconMap = { BookMarked, Clock3, FolderOpen, Users, Sparkles, TrendingUp, FileText, Headphones, Video }

interface BookCardProps {
	book: BookSummary
	variant?: 'default' | 'large'
}

export function BookCard({ book, variant = 'default' }: BookCardProps) {
	const isLarge = variant === 'large'

	return (
		<Link
			href={`/books/${book.id}`}
			className={cn(
				'group block overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/90 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-[0_20px_80px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/8 dark:hover:shadow-[0_20px_80px_rgba(0,0,0,0.28)]',
				isLarge && 'md:col-span-2'
			)}
		>
			<div
				className={cn(
					'grid h-full',
					isLarge ? 'md:grid-cols-[220px_minmax(0,1fr)]' : 'grid-rows-[320px_minmax(0,1fr)]'
				)}
			>
				<div className={cn('relative overflow-hidden', isLarge ? 'min-h-72' : 'min-h-[20rem]')}>
					<div className={cn('absolute inset-0 bg-linear-to-br', book.coverTone)} />
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_20%)]' />
					<div className='absolute inset-x-4 top-4 flex items-start justify-between gap-2'>
						<Badge className='border-white/10 bg-black/20 text-white/90 backdrop-blur'>
							{book.categoryName}
						</Badge>
						<span className='rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] tracking-[0.2em] text-white/75 uppercase backdrop-blur'>
							{book.progress}%
						</span>
					</div>
					<div className='relative flex h-full flex-col justify-between p-5 text-white'>
						<div className='pt-8'>
							<div className='text-[10px] tracking-[0.28em] text-white/55 uppercase'>
								Book Summary
							</div>
							<div className={cn('mt-4 leading-none font-black', isLarge ? 'text-4xl' : 'text-3xl')}>
								{book.title}
							</div>
							<div className='mt-2 max-w-[16rem] text-sm text-white/72'>{book.author}</div>
						</div>
						<div className='space-y-2'>
							<div className='flex items-center gap-2 text-white/80'>
								{book.hasText && <FileText className='h-4 w-4' />}
								{book.hasAudio && <Headphones className='h-4 w-4' />}
								{book.hasVideo && <Video className='h-4 w-4' />}
							</div>
							<Progress value={book.progress} className='h-1.5 bg-white/15' />
						</div>
					</div>
				</div>

				<div className={cn('p-4', isLarge ? 'flex flex-col justify-between md:p-5' : '')}>
					<div className='space-y-3'>
						<div className='flex items-center justify-between gap-3'>
							<Badge className='border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80'>
								{book.duration}
							</Badge>
							<span className='text-muted-foreground text-xs'>{book.updatedAt}</span>
						</div>
						<h3
							className={cn(
								'text-foreground group-hover:text-primary line-clamp-2 font-bold transition-colors',
								isLarge ? 'text-xl' : 'text-base'
							)}
						>
							{book.title}
						</h3>
						<p className='text-muted-foreground text-sm leading-6'>
							{book.description}
						</p>
						{isLarge && (
							<div className='grid gap-2 sm:grid-cols-2'>
								{book.keyPoints.slice(0, 2).map(point => (
									<div key={point} className='rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/75'>
										{point}
									</div>
								))}
							</div>
						)}
					</div>
					<div className='mt-5 space-y-2'>
						<div className='text-muted-foreground flex items-center justify-between text-[11px]'>
							<span>{book.categoryName}</span>
							<span>{book.progress}% 完了</span>
						</div>
						<Progress value={book.progress} className='h-1.5' />
					</div>
				</div>
			</div>
		</Link>
	)
}

export default function Page() {
	const { user } = useAuth()
	const isAdmin = user?.role === 'admin'
	const featured = books.find(book => book.featured) ?? books[0]
	const continueReading = books.filter(book => book.progress > 0).slice(0, 3)
	const highlightedBooks = books.slice(0, 6)

	return (
		<div className='space-y-8'>
			<section className='relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-[linear-gradient(135deg,#f8fafc,#eef2ff,#ecfeff)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(59,130,246,0.18),rgba(168,85,247,0.16),rgba(16,185,129,0.12))] dark:shadow-[0_30px_120px_rgba(0,0,0,0.32)]'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_24%)]' />
				<div className='relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
					<div className='space-y-6'>
						<Badge className='border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white/85'>
							<BookOpenText className='h-3.5 w-3.5' />
							{user ? `${user.name} さん、こんにちは` : 'Welcome back'}
						</Badge>
						<div className='space-y-3'>
							<h1 className='text-foreground max-w-2xl text-4xl leading-none font-black tracking-tight md:text-6xl'>
								要約ライブラリ
							</h1>
							<p className='text-muted-foreground max-w-2xl text-sm leading-7 md:text-base'>
								カテゴリ別に要約を探し、音声・テキスト・動画を同じ画面で利用できます。
							</p>
						</div>
						<div className='flex flex-wrap gap-3'>
							<Link href={`/books/${featured.id}`}>
								<Button size='lg' className='min-w-44'>
									<Play className='h-4 w-4' />
									続きから読む
								</Button>
							</Link>
							<Link href='/books'>
								<Button size='lg' variant='outline' className='border-slate-300/80 bg-white/80 text-slate-800 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'>
									書籍一覧へ
									<ArrowRight className='h-4 w-4' />
								</Button>
							</Link>
						</div>
						{isAdmin ? (
							<div className='grid gap-3 sm:grid-cols-3'>
								{dashboardStats.map(stat => {
									const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? BookMarked
									return (
										<div key={stat.label} className='rounded-3xl border border-slate-200/70 bg-white/75 p-4 backdrop-blur dark:border-white/10 dark:bg-black/20'>
											<div className='text-primary flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5'>
												<Icon className='h-5 w-5' />
											</div>
											<div className='mt-3 text-2xl font-black text-slate-900 dark:text-white'>{stat.value}</div>
											<div className='text-slate-500 text-xs dark:text-white/55'>{stat.label}</div>
											<div className='text-emerald-400 mt-1 text-xs font-semibold'>{stat.change}</div>
										</div>
									)
								})}
							</div>
						) : (
							<div className='grid gap-3 sm:grid-cols-3'>
								<div className='rounded-3xl border border-slate-200/70 bg-white/75 p-4 backdrop-blur dark:border-white/10 dark:bg-black/20 sm:col-span-2'>
									<div className='text-xs tracking-[0.2em] text-slate-500 uppercase dark:text-white/50'>Quick access</div>
									<div className='mt-2 text-lg font-semibold text-slate-900 dark:text-white'>続きからすぐ読めます</div>
									<p className='mt-1 text-sm text-slate-600 dark:text-white/60'>最近の閲覧内容とおすすめ要約を中心に表示しています。</p>
								</div>
								<div className='rounded-3xl border border-slate-200/70 bg-white/75 p-4 backdrop-blur dark:border-white/10 dark:bg-black/20'>
									<div className='text-xs tracking-[0.2em] text-slate-500 uppercase dark:text-white/50'>Library</div>
									<div className='mt-2 text-2xl font-black text-slate-900 dark:text-white'>{highlightedBooks.length}</div>
									<div className='text-slate-500 text-xs dark:text-white/55'>おすすめ要約</div>
								</div>
							</div>
						)}
					</div>

					<div className='relative'>
						<div className='relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/80 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/25 dark:shadow-[0_24px_80px_rgba(0,0,0,0.35)]'>
							<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.06),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24%)]' />
							<div className='relative grid gap-4 md:grid-cols-[160px_1fr] md:items-center'>
								<div className={`aspect-[3/4] rounded-[1.75rem] bg-linear-to-br ${featured.coverTone} overflow-hidden shadow-2xl`}>
									<div className='flex h-full flex-col justify-between p-5 text-white'>
										<span className='text-[10px] tracking-[0.24em] text-white/60 uppercase'>Featured</span>
										<div>
											<div className='text-2xl font-black leading-none'>{featured.title}</div>
											<div className='mt-2 text-xs text-white/70'>{featured.author}</div>
										</div>
										<div className='flex items-center gap-2 text-white/80'>
											{featured.hasText && <FileText className='h-4 w-4' />}
											{featured.hasAudio && <Headphones className='h-4 w-4' />}
											{featured.hasVideo && <Video className='h-4 w-4' />}
										</div>
									</div>
								</div>
								<div className='space-y-4'>
									<div className='flex items-center justify-between gap-3'>
										<Badge className='border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80'>{featured.categoryName}</Badge>
										<span className='text-slate-500 text-xs dark:text-white/60'>{featured.duration}</span>
									</div>
									<h2 className='text-2xl font-black text-slate-900 dark:text-white'>{featured.title}</h2>
									<p className='text-sm leading-7 text-slate-600 dark:text-white/70'>{featured.description}</p>
									<Progress value={featured.progress} className='h-2 bg-white/10' />
									<div className='flex items-center justify-between text-xs text-slate-500 dark:text-white/55'>
										<span>{featured.progress}% 完了</span>
										<span>{featured.keyPoints.length} つのキーポイント</span>
									</div>
									<div className='grid gap-2 sm:grid-cols-2'>
										{featured.keyPoints.slice(0, 4).map(point => (
											<div key={point} className='rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/75'>
												{point}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='space-y-4'>
				<div className='flex items-end justify-between gap-3'>
					<div>
						<h2 className='text-foreground text-lg font-bold'>続きから読む</h2>
						<p className='text-muted-foreground text-sm'>閲覧履歴から再開できます。</p>
					</div>
					<Badge className='border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80'>{continueReading.length} 件</Badge>
				</div>
				<div className='grid gap-4 md:grid-cols-3'>
					{continueReading.map((book, index) => (
						<BookCard key={book.id} book={book} variant={index === 0 ? 'large' : 'default'} />
					))}
				</div>
			</section>

			<section className='space-y-4'>
				<div className='flex items-end justify-between gap-3'>
					<div>
						<h2 className='text-foreground text-lg font-bold'>カテゴリ</h2>
						<p className='text-muted-foreground text-sm'>カテゴリ別で要約を絞り込めます。</p>
					</div>
				</div>
				<div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
					{categories.map(category => (
						<div
							key={category.id}
							className={`rounded-[1.75rem] border border-slate-200/70 bg-white/85 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5 ${category.accent}`}
						>
							<div className='flex items-center justify-between gap-3'>
								<div>
									<div className='text-sm font-semibold text-slate-900 dark:text-white'>{category.name}</div>
									<div className='text-xs text-slate-500 dark:text-white/55'>{category.count} 件の要約</div>
								</div>
								<div className='text-slate-700 dark:text-white/80'>
									<FolderOpen className='h-5 w-5' />
								</div>
							</div>
							<div className='mt-4 h-1.5 rounded-full bg-slate-200 dark:bg-white/10'>
								<div className='h-full rounded-full bg-slate-600 dark:bg-white/70' style={{ width: `${Math.min(90, 30 + category.count)}%` }} />
							</div>
						</div>
					))}
				</div>
			</section>

			<section className='space-y-4'>
				<div className='flex items-end justify-between gap-3'>
					<div>
						<h2 className='text-foreground text-lg font-bold'>おすすめの要約</h2>
						<p className='text-muted-foreground text-sm'>新着・人気の要約を表示しています。</p>
					</div>
					<Link href='/books' className='text-primary text-sm font-medium'>
						一覧へ移動
					</Link>
				</div>
				<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
					{highlightedBooks.map((book, index) => (
						<BookCard key={book.id} book={book} variant={index === 0 ? 'large' : 'default'} />
					))}
				</div>
			</section>
		</div>
	)
}
