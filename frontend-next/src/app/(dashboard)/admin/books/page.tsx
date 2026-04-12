'use client'
import { useMemo, useState } from 'react'

import { books, categories } from '@/shared/lib/mock-data'
import { Button } from '@/shared/ui'
import { Input } from '@/shared/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

import { BookFormDialog, BookListTable } from '../page'

export default function page() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [categoryId, setCategoryId] = useState('all')

	const filtered = useMemo(
		() =>
			books.filter(book => {
				const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase())
				const matchesCategory = categoryId === 'all' || book.categoryId === categoryId
				return matchesQuery && matchesCategory
			}),
		[categoryId, query]
	)

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between gap-4'>
				<div>
					<h1 className='text-foreground text-2xl font-black'>書籍管理</h1>
					<p className='text-muted-foreground text-sm'>作成・編集・削除を行います。</p>
				</div>
				<Button onClick={() => setOpen(true)}>新規追加</Button>
			</div>
			<div className='grid gap-3 md:grid-cols-[1fr_220px]'>
				<Input
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder='書籍を検索...'
				/>
				<Select value={categoryId} onValueChange={e => setCategoryId(e)}>
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
			</div>
			<BookListTable books={filtered} onDelete={() => undefined} />
			<BookFormDialog open={open} onClose={() => setOpen(false)} />
		</div>
	)
}
