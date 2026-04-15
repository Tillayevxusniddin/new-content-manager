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
							<Card key={stat.label} className='border-border bg-card/80 py-4'>
								<CardHeader className='flex flex-row items-center justify-between pb-2'>
									<div className='border-border bg-surface text-foreground flex h-10 w-10 items-center justify-center rounded-xl border'>
										<Icon className='h-4 w-4' />
									</div>
									<span className='border-border bg-surface text-muted-foreground rounded-full border px-2.5 py-1 text-xs'>
										{stat.change}
									</span>
								</CardHeader>
								<CardContent>
									<div className='text-foreground text-2xl font-black'>
										{stat.value}
									</div>
									<div className='text-muted-foreground mt-1 text-sm'>
										{stat.label}
									</div>
								</CardContent>
							</Card>
						)
					})}
				</section>
			) : null}

			<section className='space-y-4'>
				<div className='flex items-end justify-between gap-3'>
					<div>
						<h2 className='text-foreground text-lg font-bold'>続きから読む</h2>
						<p className='text-muted-foreground text-sm'>閲覧履歴から再開できます。</p>
					</div>
					<Badge className='border-border bg-surface text-foreground'>
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
					<h2 className='text-foreground text-lg font-bold'>カテゴリ</h2>
					<p className='text-muted-foreground text-sm'>
						カテゴリ別で要約を絞り込めます。
					</p>
				</div>
				<div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
					{categories.map(category => (
						<div
							key={category.id}
							className='border-border bg-card/80 rounded-2xl border p-4'
						>
							<div className='flex items-center justify-between gap-3'>
								<div>
									<div className='text-foreground text-sm font-semibold'>
										{category.name}
									</div>
									<div className='text-muted-foreground text-xs'>
										{category.count} 件の要約
									</div>
								</div>
								<div className='text-muted-foreground'>
									<FolderOpen className='h-5 w-5' />
								</div>
							</div>
							<div className='bg-border mt-4 h-1.5 rounded-full'>
								<div
									className='bg-primary h-full rounded-full'
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
						<h2 className='text-foreground text-lg font-bold'>おすすめの要約</h2>
						<p className='text-muted-foreground text-sm'>
							新着・人気の要約を表示しています。
						</p>
					</div>
					<Link
						href='/books'
						className='text-muted-foreground hover:text-foreground text-sm font-medium'
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
