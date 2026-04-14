import { useMemo, useState } from 'react'

import { books } from '@/shared/lib/mock-data'

export const bookTableModel = () => {
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

	const deleteBook = (bookId: string) => {
		console.log(`Deleting book with ID: ${bookId}`)
	}
	return { filtered, query, setQuery, categoryId, setCategoryId, deleteBook }
}
