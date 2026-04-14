'use client'
import { BookMarked, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { BookCard } from '../page'

import { books, categories } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { Badge, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'

interface Props {
	query: string
	onQueryChange: (value: string) => void
	categoryId: string
	onCategoryIdChange: (value: string) => void
	sortOrder: string
	onSortOrderChange: (value: string) => void
}

export function BookFilterBar({
	query,
	onQueryChange,
	categoryId,
	onCategoryIdChange,
	sortOrder,
	onSortOrderChange
}: Props) {
	return (
		<div className='grid gap-4 rounded-[2rem] border border-slate-200/70 bg-white/85 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 xl:grid-cols-[minmax(0,1.35fr)_minmax(14rem,18rem)_minmax(12rem,14rem)]'>
			<div className='relative'>
				<Search className='pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/40' />
				<Input
					value={query}
					onChange={event => onQueryChange(event.target.value)}
					placeholder='表紙やタイトルで検索...'
					className='min-w-0 border-slate-200 bg-white pl-10 pr-4 text-slate-900 placeholder:text-slate-400 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/35'
				/>
			</div>
			<Select value={categoryId} onValueChange={event => onCategoryIdChange(event)}>
				<SelectTrigger className='w-full min-w-0 border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-black/20 dark:text-white'>
					<SelectValue placeholder='カテゴリを選択...' />
				</SelectTrigger>
				<SelectContent position='popper' align='start' className='border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-[#0b1020] dark:text-white'>
					<SelectItem value='all'>すべてのカテゴリ</SelectItem>
					{categories.map(category => (
						<SelectItem key={category.id} value={category.id}>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select value={sortOrder} onValueChange={event => onSortOrderChange(event)}>
				<SelectTrigger className='min-w-0 border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-black/20 dark:text-white'>
					<SelectValue placeholder='ソート順を選択...' />
				</SelectTrigger>
				<SelectContent position='popper' align='start' className='border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-[#0b1020] dark:text-white'>
					<SelectItem value='desc'>新しい順</SelectItem>
					<SelectItem value='asc'>古い順</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}

export default function Page() {
	const [query, setQuery] = useState('')
	const [categoryId, setCategoryId] = useState('all')
	const [sortOrder, setSortOrder] = useState('desc')

	const filteredBooks = useMemo(() => {
		return [...books]
			.filter(book => {
				const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase()) || book.author.toLowerCase().includes(query.toLowerCase())
				const matchesCategory = categoryId === 'all' || book.categoryId === categoryId
				return matchesQuery && matchesCategory
			})
			.sort((a, b) => {
				if (sortOrder === 'asc') return a.updatedAt.localeCompare(b.updatedAt)
				return b.updatedAt.localeCompare(a.updatedAt)
			})
	}, [categoryId, query, sortOrder])

	const featured = filteredBooks[0] ?? books[0]

	return (
		<div className='space-y-8'>
			<section className='relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-[linear-gradient(135deg,#f8fafc,#eef2ff,#ecfeff)] p-6 md:p-8 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(56,189,248,0.18),rgba(168,85,247,0.16))]'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.06),transparent_22%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_22%)]' />
				<div className='relative grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end'>
					<div className='space-y-5'>
						<Badge className='border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white/85'>
							書籍一覧
						</Badge>
						<div className='space-y-3'>
							<h1 className='text-foreground max-w-2xl text-4xl leading-none font-black tracking-tight md:text-6xl'>
								要約ライブラリ一覧
							</h1>
							<p className='text-muted-foreground max-w-2xl text-sm leading-7 md:text-base'>
								検索、カテゴリ、更新日ソートで要約を効率よく探せます。
							</p>
						</div>
						<BookFilterBar
							query={query}
							onQueryChange={setQuery}
							categoryId={categoryId}
							onCategoryIdChange={setCategoryId}
							sortOrder={sortOrder}
							onSortOrderChange={setSortOrder}
						/>
						<div className='flex flex-wrap gap-2'>
							{categories.slice(0, 5).map(category => (
								<button
									key={category.id}
									onClick={() => setCategoryId(category.id)}
									className={cn(
										'rounded-full border px-4 py-2 text-xs font-medium transition',
										categoryId === category.id
											? 'border-slate-300 bg-slate-900 text-white dark:border-white/20 dark:bg-white dark:text-black'
											: 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10'
									)}
								>
									{category.name}
								</button>
							))}
						</div>
					</div>

					<div className='rounded-[2rem] border border-slate-200/70 bg-white/80 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-black/25'>
						<div className={`aspect-4/5 rounded-[1.5rem] bg-linear-to-br ${featured.coverTone} relative overflow-hidden`}>
							<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_26%)]' />
							<div className='absolute inset-x-4 top-4 flex items-center justify-between text-white/85'>
								<Badge className='border-white/10 bg-black/20 text-white/90'>
									<BookMarked className='h-3.5 w-3.5' />
									Featured
								</Badge>
								<span className='text-[10px] tracking-[0.24em] uppercase'>{featured.progress}%</span>
							</div>
							<div className='absolute inset-x-4 bottom-4 rounded-3xl border border-white/10 bg-black/35 p-4 text-white backdrop-blur-sm'>
								<div className='text-[10px] tracking-[0.24em] text-white/55 uppercase'>{featured.categoryName}</div>
								<div className='mt-1 text-xl font-black leading-tight'>{featured.title}</div>
								<div className='mt-2 text-xs text-white/70'>{featured.author}</div>
							</div>
						</div>
						<div className='mt-4 grid grid-cols-3 gap-3'>
							{[
								{ label: 'Hits', value: filteredBooks.length },
								{ label: 'Filters', value: 'Live' },
								{ label: 'Mode', value: 'Store' }
							].map(item => (
								<div key={item.label} className='rounded-2xl border border-slate-200 bg-white p-3 text-center dark:border-white/10 dark:bg-white/5'>
									<div className='text-lg font-black text-slate-900 dark:text-white'>{item.value}</div>
									<div className='text-[10px] tracking-[0.18em] text-slate-500 uppercase dark:text-white/50'>{item.label}</div>
								</div>
							))}
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
					<Badge className='border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80'>{Math.min(3, filteredBooks.length)} 件</Badge>
				</div>
				<div className='grid gap-4 md:grid-cols-3'>
					{filteredBooks.slice(0, 3).map((book, index) => (
						<BookCard key={book.id} book={book} variant={index === 0 ? 'large' : 'default'} />
					))}
				</div>
			</section>

			<section className='space-y-4'>
				<div className='flex items-end justify-between gap-3'>
					<div>
						<h2 className='text-foreground text-lg font-bold'>検索結果</h2>
						<p className='text-muted-foreground text-sm'>条件に一致する要約を表示しています。</p>
					</div>
					<Badge className='border-slate-200 bg-slate-100 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80'>
						{filteredBooks.length} 冊
					</Badge>
				</div>
				<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
					{filteredBooks.map((book, index) => (
						<BookCard key={book.id} book={book} variant={index === 0 ? 'large' : 'default'} />
					))}
				</div>
			</section>
		</div>
	)
}
