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
		<section className='relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 p-6 md:p-8'>
			<div className='pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-emerald-900/25 to-transparent' />
			<div className='relative grid gap-8 lg:grid-cols-[1fr_240px] lg:items-center'>
				<div className='space-y-5'>
					<span className='inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-200'>
						<BookOpenText className='h-3.5 w-3.5' />
						{userName ? `${userName} さん、ようこそ` : 'Xush kelibsiz'}
					</span>
					<div>
						<h1 className='text-3xl font-black tracking-tight text-zinc-100 md:text-5xl'>
							要約ライブラリ
						</h1>
						<p className='mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base'>
							音声・テキスト・動画で、学習をひとつの場所にまとめて管理できます。
						</p>
					</div>
					<div className='rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4'>
						<p className='text-[11px] tracking-[0.2em] text-zinc-500 uppercase'>
							Featured Summary
						</p>
						<h2 className='mt-2 text-2xl font-bold text-zinc-100'>{featured.title}</h2>
						<p className='mt-1 text-sm text-zinc-400'>{featured.author}</p>
						<p className='mt-3 line-clamp-2 text-sm text-zinc-300'>
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
								className='border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800'
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
