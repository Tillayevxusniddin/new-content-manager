'use client'
import { useMemo, useState } from 'react'

import { BookTable } from '@/widgets/book-table'

import { DialogCreateBook } from '@/features/dialog-create-book'

import { books } from '@/shared/lib/mock-data'
import { Button } from '@/shared/ui'

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
				<DialogCreateBook trigger={<Button>新規追加</Button>} />
			</div>

			<BookTable />
		</div>
	)
}
