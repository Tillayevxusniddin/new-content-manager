'use client'

import {
	BookMarked,
	Clock3,
	FileText,
	FolderOpen,
	Headphones,
	Sparkles,
	TrendingUp,
	Users,
	Video
} from 'lucide-react'
import Link from 'next/link'

import { BookCard } from '@/entities/book'
import { Hero } from '@/entities/hero'

import { useAuth } from '@/shared/hooks/use-auth'
import { books, categories, dashboardStats } from '@/shared/lib/mock-data'
import { Badge, Card, CardContent, CardHeader } from '@/shared/ui'

const iconMap = {
	BookMarked,
	Clock3,
	FolderOpen,
	Users,
	Sparkles,
	TrendingUp,
	FileText,
	Headphones,
	Video
}

export default function Page() {
	const { user } = useAuth()
	const isAdmin = user?.role === 'admin'
	const featured = books.find(book => book.featured) ?? books[0]
	const continueReading = books.filter(book => book.progress > 0).slice(0, 3)
	const highlightedBooks = books.slice(0, 6)

	return (
		<div className='space-y-8'>
			<Hero featured={featured} userName={user?.name} />

			{isAdmin ? (
				<section className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
					{dashboardStats.map(stat => {
						const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? BookMarked
						return (
							<Card key={stat.label} className='border-zinc-800 bg-zinc-900/80 py-4'>
								<CardHeader className='flex flex-row items-center justify-between pb-2'>
									<div className='flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200'>
										<Icon className='h-4 w-4' />
									</div>
									<span className='rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300'>
										{stat.change}
									</span>
								</CardHeader>
								<CardContent>
									<div className='text-2xl font-black text-zinc-100'>
										{stat.value}
									</div>
									<div className='mt-1 text-sm text-zinc-400'>{stat.label}</div>
								</CardContent>
							</Card>
						)
					})}
				</section>
			) : null}

			<section className='space-y-4'>
				<div className='flex items-end justify-between gap-3'>
					<div>
						<h2 className='text-lg font-bold text-zinc-100'>続きから読む</h2>
						<p className='text-sm text-zinc-400'>閲覧履歴から再開できます。</p>
					</div>
					<Badge className='border-zinc-800 bg-zinc-900 text-zinc-300'>
						{continueReading.length} 件
					</Badge>
				</div>
				<div className='grid gap-4 md:grid-cols-3'>
					{continueReading.map((book, index) => (
						<BookCard
							key={book.id}
							book={book}
							className={index === 0 ? 'md:col-span-2' : undefined}
						/>
					))}
				</div>
			</section>

			<section className='space-y-4'>
				<div>
					<h2 className='text-lg font-bold text-zinc-100'>カテゴリ</h2>
					<p className='text-sm text-zinc-400'>カテゴリ別で要約を絞り込めます。</p>
				</div>
				<div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
					{categories.map(category => (
						<div
							key={category.id}
							className='rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4'
						>
							<div className='flex items-center justify-between gap-3'>
								<div>
									<div className='text-sm font-semibold text-zinc-100'>
										{category.name}
									</div>
									<div className='text-xs text-zinc-400'>
										{category.count} 件の要約
									</div>
								</div>
								<div className='text-zinc-400'>
									<FolderOpen className='h-5 w-5' />
								</div>
							</div>
							<div className='mt-4 h-1.5 rounded-full bg-zinc-800'>
								<div
									className='h-full rounded-full bg-zinc-500'
									style={{ width: `${Math.min(90, 30 + category.count)}%` }}
								/>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className='space-y-4'>
				<div className='flex items-end justify-between gap-3'>
					<div>
						<h2 className='text-lg font-bold text-zinc-100'>おすすめの要約</h2>
						<p className='text-sm text-zinc-400'>新着・人気の要約を表示しています。</p>
					</div>
					<Link
						href='/books'
						className='text-sm font-medium text-zinc-300 hover:text-zinc-100'
					>
						一覧へ移動
					</Link>
				</div>
				<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
					{highlightedBooks.map((book, index) => (
						<BookCard
							key={book.id}
							book={book}
							className={index === 0 ? 'sm:col-span-2 xl:col-span-1' : undefined}
						/>
					))}
				</div>
			</section>
		</div>
	)
}
