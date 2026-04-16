import { ArrowRight, BookOpenText, Play } from 'lucide-react'
import Link from 'next/link'

import { BookCard } from '@/entities/book'

import { BookSummary } from '@/shared/lib/mock-data'
import { Button } from '@/shared/ui'

type HeroProps = {
	featured: BookSummary
	userName?: string
}

export const Hero: React.FC<HeroProps> = ({ featured, userName }) => {
	return (
		<section className='border-border bg-card relative overflow-hidden rounded-[2rem] border p-6 md:p-8'>
			<div className='pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(to_bottom,hsl(var(--primary)/0.25),transparent)]' />
			<div className='relative grid gap-8 lg:grid-cols-[1fr_240px] lg:items-center'>
				<div className='space-y-5'>
					<span className='border-border bg-surface text-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold'>
						<BookOpenText className='h-3.5 w-3.5' />
						{userName ? `${userName} さん、ようこそ` : 'ようこそ'}
					</span>
					<div>
						<h1 className='text-foreground text-3xl font-black tracking-tight md:text-5xl'>
							要約ライブラリ
						</h1>
						<p className='text-muted-foreground mt-3 max-w-2xl text-sm leading-7 md:text-base'>
							音声・テキスト・動画で、学習をひとつの場所にまとめて管理できます。
						</p>
					</div>
					<div className='border-border bg-surface/80 rounded-2xl border p-4'>
						<p className='text-muted-foreground text-[11px] tracking-[0.2em] uppercase'>
							Featured Summary
						</p>
						<h2 className='text-foreground mt-2 text-2xl font-bold'>
							{featured.title}
						</h2>
						<p className='text-muted-foreground mt-1 text-sm'>{featured.author}</p>
						<p className='text-muted-foreground mt-3 line-clamp-2 text-sm'>
							{featured.description}
						</p>
					</div>
					<div className='flex flex-wrap items-center gap-3'>
						<Link href={`/books/${featured.id}`}>
							<Button size='lg' className='min-w-40'>
								<Play className='h-4 w-4' />
								続きから読む
							</Button>
						</Link>
						<Link href='/books'>
							<Button
								size='lg'
								variant='outline'
								className='border-border bg-surface text-foreground hover:bg-surface-hover'
							>
								書籍一覧へ
								<ArrowRight className='h-4 w-4' />
							</Button>
						</Link>
					</div>
				</div>

				<div className='mx-auto w-full max-w-60'>
					<BookCard book={featured} />
				</div>
			</div>
		</section>
	)
}
