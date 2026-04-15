import Link from 'next/link'

import { BookSummary } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'

interface BookCardProps {
    book: BookSummary
    className?: string
}

export function BookCard({ book, className }: BookCardProps) {
    return (
        <Link href={`/books/${book.id}`} className={cn('group block min-w-0', className)}>
            <div className='rounded-[1.45rem] border border-zinc-800 bg-zinc-900 p-2 transition-colors duration-200 group-hover:border-zinc-700'>
                <div
                    className={cn(
                        'bg-linear-to-br aspect-3/4 w-full overflow-hidden rounded-[1.1rem] shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:-translate-y-0.5',
                        book.coverTone
                    )}
                >
                    <div className='relative flex h-full flex-col justify-between p-4'>
                        <div className='text-[10px] tracking-[0.22em] text-white/55 uppercase'>Book</div>
                        <div>
                            <div className='line-clamp-3 text-2xl leading-[1.05] font-black text-white'>
                                {book.title}
                            </div>
                            <div className='mt-2 text-xs text-white/70'>{book.author}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='px-1 pt-3'>
                <h3 className='line-clamp-1 text-sm font-semibold text-zinc-100 transition-colors group-hover:text-zinc-50'>
                    {book.title}
                </h3>
                <p className='mt-1 line-clamp-1 text-xs text-zinc-400'>
                    {book.categoryName} • {book.author}
                </p>
            </div>
        </Link>
    )
}