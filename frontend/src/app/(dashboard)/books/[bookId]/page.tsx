'use client'

import { useParams } from 'next/navigation'

import { BooksMedia } from '@/widgets/books-media'

import { books } from '@/shared/lib/mock-data'

import NotFoundPage from './not-found'

export default function Page() {
    const params = useParams<{ bookId: string }>()
    const book = books.find(entry => entry.id === params.bookId)

    if (!book) {
        return <NotFoundPage />
    }

    return (
        <div className='mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8'>
            <BooksMedia book={book} />
        </div>
    )
}