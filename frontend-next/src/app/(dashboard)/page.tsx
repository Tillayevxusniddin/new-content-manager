'use client'
import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	Brain,
	Briefcase,
	Cpu,
	FileText,
	FolderOpen,
	Headphones,
	Play,
	Rocket,
	Sparkles,
	TrendingUp,
	Users,
	Video
} from 'lucide-react'
import Link from 'next/link'
import { useMemo, useRef } from 'react'

import { BookSummary, books, categories } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { Badge } from '@/shared/ui/badge'

export function Progress({ value = 0, className }: { value?: number; className?: string }) {
	return (
		<div className={cn('h-2 w-full overflow-hidden rounded-full bg-white/10', className)}>
			<div
				className='from-primary h-full rounded-full bg-linear-to-r to-cyan-400 transition-all'
				style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
			/>
		</div>
	)
}

const iconMap = { Brain, Briefcase, Cpu, FolderOpen, Rocket, Sparkles, TrendingUp, Users }

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
				'group border-glass-border bg-card/70 hover:border-primary/30 hover:shadow-primary/10 block overflow-hidden rounded-[1.6rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
				isLarge && 'md:col-span-2'
			)}
		>
			<div
				className={cn(
					'grid h-full',
					isLarge ? 'md:grid-cols-[180px_1fr]' : 'grid-rows-[210px_1fr]'
				)}
			>
				<div className={cn('relative overflow-hidden', isLarge ? 'min-h-56' : 'min-h-52')}>
					<div className={cn('absolute inset-0 bg-linear-to-br', book.coverTone)} />
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%)]' />
					<div className='relative flex h-full flex-col justify-between p-5 text-white'>
						<div className='flex items-center justify-between text-[10px] tracking-[0.3em] text-white/55 uppercase'>
							<span>{book.categoryName}</span>
							<span>{book.progress}%</span>
						</div>
						<div>
							<div
								className={cn(
									'leading-none font-black',
									isLarge ? 'text-4xl' : 'text-3xl'
								)}
							>
								{book.title}
							</div>
							<div className='mt-2 text-sm text-white/70'>{book.author}</div>
						</div>
						<div className='flex items-center gap-2 text-white/80'>
							{book.hasText && <FileText className='h-4 w-4' />}
							{book.hasAudio && <Headphones className='h-4 w-4' />}
							{book.hasVideo && <Video className='h-4 w-4' />}
						</div>
					</div>
				</div>

				<div className={cn('p-4', isLarge ? 'flex flex-col justify-between' : '')}>
					<div>
						<Badge className='mb-3 border-white/10 bg-white/5 text-white/80'>
							{book.categoryName}
						</Badge>
						<h3
							className={cn(
								'text-foreground group-hover:text-primary line-clamp-2 font-bold transition-colors',
								isLarge ? 'text-xl' : 'text-base'
							)}
						>
							{book.title}
						</h3>
						<p className='text-muted-foreground mt-1 text-xs'>{book.author}</p>
						{isLarge && (
							<p className='text-muted-foreground mt-3 line-clamp-3 text-sm leading-6'>
								{book.description}
							</p>
						)}
					</div>
					<div className='mt-4 space-y-2'>
						<div className='text-muted-foreground flex items-center justify-between text-[11px]'>
							<span>{book.duration}</span>
							<span>{book.progress}% 完了</span>
						</div>
						<Progress value={book.progress} className='h-1.5' />
					</div>
				</div>
			</div>
		</Link>
	)
}

export function BookGrid({ books }: { books: BookSummary[] }) {
	return (
		<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
			{books.map((book, index) => (
				<BookCard key={book.id} book={book} variant={index === 0 ? 'large' : 'default'} />
			))}
		</div>
	)
}

export function CategoryRow() {
	const rowRef = useRef<HTMLDivElement>(null)

	const items = useMemo(() => categories, [])

	const scroll = (direction: 'left' | 'right') => {
		rowRef.current?.scrollBy({ left: direction === 'left' ? -260 : 260, behavior: 'smooth' })
	}

	return (
		<div className='relative'>
			<button
				onClick={() => scroll('left')}
				className='border-glass-border bg-card/90 text-foreground absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-full border p-2 shadow-xl md:block'
			>
				<ArrowLeft className='h-4 w-4' />
			</button>
			<div
				ref={rowRef}
				className='scrollbar-hide flex gap-3 overflow-x-auto py-2 pl-0 md:px-8'
			>
				{items.map(category => {
					const Icon = iconMap[category.icon as keyof typeof iconMap] ?? FolderOpen
					return (
						<button
							key={category.id}
							className={cn(
								'border-glass-border bg-card/70 hover:bg-surface-hover flex min-w-44 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all hover:-translate-y-0.5',
								category.accent
							)}
						>
							<span className='flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5'>
								<Icon className='h-4 w-4' />
							</span>
							<span className='flex-1'>
								<span className='text-foreground block text-sm font-semibold'>
									{category.name}
								</span>
								<span className='text-muted-foreground text-xs'>
									{category.count} 件
								</span>
							</span>
						</button>
					)
				})}
			</div>
			<button
				onClick={() => scroll('right')}
				className='border-glass-border bg-card/90 text-foreground absolute top-1/2 right-0 hidden -translate-y-1/2 rounded-full border p-2 shadow-xl md:block'
			>
				<ArrowRight className='h-4 w-4' />
			</button>
		</div>
	)
}

export default function Page() {
	const featured = books.find(book => book.featured) ?? books[0]
	return (
		<div className='mx-auto max-w-7xl space-y-10 px-4 py-6 md:px-6 md:py-8'>
			<section className='border-glass-border bg-card/60 relative overflow-hidden rounded-[2rem] border p-6 shadow-2xl shadow-black/20 md:p-10'>
				<div
					className={`absolute inset-0 bg-linear-to-br ${featured.coverTone} opacity-80`}
				/>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]' />
				<div className='relative grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center'>
					<div className='mx-auto w-full max-w-60'>
						<div className='rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur'>
							<div
								className={`flex aspect-3/4 items-center justify-center rounded-[1.5rem] bg-linear-to-br ${featured.coverTone} p-6 text-center`}
							>
								<div>
									<div className='text-xs tracking-[0.35em] text-white/60 uppercase'>
										Featured
									</div>
									<div
										className={`mt-4 bg-linear-to-r ${featured.coverAccent} bg-clip-text text-3xl leading-none font-black text-transparent md:text-4xl`}
									>
										{featured.title}
									</div>
									<div className='mt-4 text-xs text-white/70'>
										{featured.author}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='space-y-4 text-center lg:text-left'>
						<span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur'>
							<BookOpen className='h-3.5 w-3.5' />
							おすすめの要約
						</span>
						<div>
							<h1 className='text-3xl font-black tracking-tight text-white md:text-5xl'>
								{featured.title}
							</h1>
							<p className='mt-2 text-sm text-white/70 md:text-base'>
								{featured.description}
							</p>
						</div>
						<div className='flex flex-wrap items-center justify-center gap-3 lg:justify-start'>
							<Link href={`/books/${featured.id}`}>
								<Button size='lg' className='min-w-44'>
									<Play className='h-4 w-4' />
									読み始める
								</Button>
							</Link>
							<Link href='/books'>
								<Button
									size='lg'
									variant='outline'
									className='border-white/20 bg-white/5 text-white hover:bg-white/10'
								>
									もっと見る
									<ArrowRight className='h-4 w-4' />
								</Button>
							</Link>
						</div>
						<p className='text-xs text-white/60'>
							{featured.progress}% 完了 · {featured.duration}
						</p>
					</div>
				</div>
			</section>

			<section className='space-y-4'>
				<div>
					<h2 className='text-foreground text-lg font-bold'>カテゴリ</h2>
					<p className='text-muted-foreground text-sm'>
						好みに合わせて要約を絞り込めます。
					</p>
				</div>
				<CategoryRow />
			</section>

			<section className='space-y-4'>
				<div>
					<h2 className='text-foreground text-lg font-bold'>おすすめの要約</h2>
					<p className='text-muted-foreground text-sm'>
						関心の高いテーマを中心に選出しています。
					</p>
				</div>
				<BookGrid books={books} />
			</section>
		</div>
	)
}
