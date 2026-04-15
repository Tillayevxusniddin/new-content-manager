import Image from 'next/image'
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
			<div className='border-border bg-card group-hover:border-border/80 rounded-[1.45rem] border p-2 transition-colors duration-200'>
				<div
					className={cn(
						'relative aspect-3/4 w-full overflow-hidden rounded-[1.1rem] shadow-[0_12px_30px_hsl(var(--foreground)/0.16)] transition-transform duration-200 group-hover:-translate-y-0.5',
						book.coverTone
					)}
				>
					<Image
						src={book.imageUrl}
						alt={book.title}
						fill
						className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
						sizes='(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw'
						priority={book.featured}
					/>
					<div className='absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.05)_0%,transparent_38%,hsl(var(--background)/0.72)_100%)]' />
				</div>
			</div>

			<div className='px-1 pt-3'>
				<h3 className='text-foreground group-hover:text-foreground line-clamp-1 text-sm font-semibold transition-colors'>
					{book.title}
				</h3>
				<p className='text-muted-foreground mt-1 line-clamp-1 text-xs'>
					{book.categoryName} • {book.author}
				</p>
			</div>
		</Link>
	)
}
