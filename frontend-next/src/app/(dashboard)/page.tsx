'use client'
import {
	Brain,
	Briefcase,
	Cpu,
	FileText,
	FolderOpen,
	Headphones,
	Rocket,
	Sparkles,
	TrendingUp,
	Users,
	Video
} from 'lucide-react'
import Link from 'next/link'

import { CategoryCarousel } from '@/entities/carousel-categories'
import { Hero } from '@/entities/hero'

import { BookSummary, books } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
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

export default function Page() {
	return (
		<div className='mx-auto max-w-7xl space-y-10 px-4 py-6 md:px-6 md:py-8'>
			<Hero />

			<section className='space-y-4'>
				<div>
					<h2 className='text-foreground text-lg font-bold'>カテゴリ</h2>
					<p className='text-muted-foreground text-sm'>
						好みに合わせて要約を絞り込めます。
					</p>
				</div>
				<CategoryCarousel />
			</section>

			<section className='space-y-4'>
				<div>
					<h2 className='text-foreground text-lg font-bold'>おすすめの要約</h2>
					<p className='text-muted-foreground text-sm'>
						関心の高いテーマを中心に選出しています。
					</p>
				</div>
				<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
					{books.map((book, index) => (
						<BookCard
							key={book.id}
							book={book}
							variant={index === 0 ? 'large' : 'default'}
						/>
					))}
				</div>
			</section>
		</div>
	)
}
