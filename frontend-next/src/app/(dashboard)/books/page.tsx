'use client'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import { books, categories } from '@/shared/lib/mock-data'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

import { BookGrid } from '../page'

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
		<div className='border-glass-border bg-card/70 grid gap-3 rounded-3xl border p-4 backdrop-blur-xl lg:grid-cols-[1fr_220px_180px]'>
			<div className='relative'>
				<Search className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
				<Input
					value={query}
					onChange={event => onQueryChange(event.target.value)}
					placeholder='書籍を検索...'
					className='pl-10'
				/>
			</div>
			<Select value={categoryId} onValueChange={event => onCategoryIdChange(event)}>
				<SelectTrigger>
					<SelectValue placeholder='カテゴリを選択...' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>すべてのカテゴリ</SelectItem>
					{categories.map(category => (
						<SelectItem key={category.id} value={category.id}>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select value={sortOrder} onValueChange={event => onSortOrderChange(event)}>
				<SelectTrigger>
					<SelectValue placeholder='ソート順を選択...' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='desc'>新しい順</SelectItem>
					<SelectItem value='asc'>古い順</SelectItem>{' '}
				</SelectContent>
			</Select>
		</div>
	)
}

export default function Page() {
	const [query, setQuery] = useState('')
	const [categoryId, setCategoryId] = useState('all')
	const [sortOrder, setSortOrder] = useState('desc')

	const filtered = useMemo(() => {
		return books
			.filter(book => {
				const matchesQuery =
					book.title.toLowerCase().includes(query.toLowerCase()) ||
					book.description.toLowerCase().includes(query.toLowerCase())
				const matchesCategory = categoryId === 'all' || book.categoryId === categoryId
				return matchesQuery && matchesCategory
			})
			.sort((a, b) =>
				sortOrder === 'asc'
					? a.updatedAt.localeCompare(b.updatedAt)
					: b.updatedAt.localeCompare(a.updatedAt)
			)
	}, [categoryId, query, sortOrder])

	return (
		<div className='mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6 md:py-8'>
			<div>
				<h1 className='text-foreground text-2xl font-black'>書籍一覧</h1>
				<p className='text-muted-foreground text-sm'>
					検索、カテゴリフィルター、ソートを使って探せます。
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
			<BookGrid books={filtered} />
		</div>
	)
}
