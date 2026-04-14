import { ArrowRight, BookOpen, Play } from 'lucide-react'
import Link from 'next/link'

import { books } from '@/shared/lib/mock-data'
import { Button } from '@/shared/ui'

export const Hero: React.FC = () => {
	const featured = books.find(book => book.featured) ?? books[0]
	return (
		<section className='border-glass-border bg-card/60 relative overflow-hidden rounded-[2rem] border p-6 shadow-2xl shadow-black/20 md:p-10'>
			<div className={`absolute inset-0 bg-linear-to-br ${featured.coverTone} opacity-80`} />
			<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]' />
			<div className='relative grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center'>
				<div className='mx-auto w-full max-w-60'>
					<div className='rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur'>
						<div
							className={`flex aspect-3/4 items-center justify-center rounded-[1.5rem] bg-linear-to-br ${featured.coverTone} p-6 text-center`}
						>
							<div>
								<div className='text-xs tracking-[0.35em] text-white/60 uppercase'>
									Featured
								</div>
								<div
									className={`mt-4 bg-linear-to-r ${featured.coverAccent} bg-clip-text text-3xl leading-none font-black text-transparent md:text-4xl`}
								>
									{featured.title}
								</div>
								<div className='mt-4 text-xs text-white/70'>{featured.author}</div>
							</div>
						</div>
					</div>
				</div>

				<div className='space-y-4 text-center lg:text-left'>
					<span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur'>
						<BookOpen className='h-3.5 w-3.5' />
						おすすめの要約
					</span>
					<div>
						<h1 className='text-3xl font-black tracking-tight text-white md:text-5xl'>
							{featured.title}
						</h1>
						<p className='mt-2 text-sm text-white/70 md:text-base'>
							{featured.description}
						</p>
					</div>
					<div className='flex flex-wrap items-center justify-center gap-3 lg:justify-start'>
						<Link href={`/books/${featured.id}`}>
							<Button size='lg' className='min-w-44'>
								<Play className='h-4 w-4' />
								読み始める
							</Button>
						</Link>
						<Link href='/books'>
							<Button
								size='lg'
								variant='outline'
								className='border-white/20 bg-white/5 text-white hover:bg-white/10'
							>
								もっと見る
								<ArrowRight className='h-4 w-4' />
							</Button>
						</Link>
					</div>
					<p className='text-xs text-white/60'>
						{featured.progress}% 完了 · {featured.duration}
					</p>
				</div>
			</div>
		</section>
	)
}
