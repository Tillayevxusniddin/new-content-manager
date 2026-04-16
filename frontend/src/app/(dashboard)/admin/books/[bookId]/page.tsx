'use client'

import { format } from 'date-fns'
import { ArrowLeft, CalendarDays, Check, Circle, PencilLine, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { books } from '@/shared/lib/mock-data'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Progress } from '@/shared/ui'

export default function Page() {
	const params = useParams<{ bookId: string }>()
	const book = books.find(entry => entry.id === params.bookId)

	if (!book) {
		return (
			<div className='mx-auto w-full max-w-5xl px-4 py-8 md:px-6'>
				<Card className='border-border bg-card/70 rounded-3xl border backdrop-blur-xl'>
					<CardContent className='flex flex-col items-center gap-4 py-12 text-center'>
						<p className='text-foreground text-xl font-bold'>Book not found</p>
						<p className='text-muted-foreground text-sm'>
							指定された書籍は存在しないか、削除された可能性があります。
						</p>
						<Link href='/admin/books'>
							<Button>
								<ArrowLeft className='h-4 w-4' />
								一覧に戻る
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		)
	}

	const mediaItems = [
		{ label: 'Text', enabled: book.hasText },
		{ label: 'Audio', enabled: book.hasAudio },
		{ label: 'Video', enabled: book.hasVideo }
	]

	return (
		<div className='mx-auto w-full max-w-6xl space-y-6 px-4 py-6 md:px-6 md:py-8'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<Link href='/admin/books'>
					<Button variant='outline' className='border-border bg-card/70'>
						<ArrowLeft className='h-4 w-4' />
						Back to list
					</Button>
				</Link>
				<div className='flex items-center gap-2'>
					<Button variant='outline' className='border-border bg-card/70'>
						<PencilLine className='h-4 w-4' />
						編集
					</Button>
					<Button variant='outline' className='border-border bg-card/70 text-red-400'>
						<Trash2 className='h-4 w-4' />
						削除
					</Button>
				</div>
			</div>

			<section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(2,6,23,0.95),rgba(15,23,42,0.9),rgba(56,189,248,0.14))] p-4 sm:p-6 md:p-8'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]' />
				<div className='relative grid gap-5 md:grid-cols-[240px_1fr] md:gap-8'>
					<div className='border-border/70 bg-card/70 rounded-[1.5rem] border p-3 backdrop-blur-xl'>
						<div className='relative aspect-3/4 overflow-hidden rounded-[1.15rem]'>
							<div
								className={`absolute inset-0 rounded-[1.15rem] bg-linear-to-br ${book.coverTone}`}
							/>
							<Image
								src={book.imageUrl}
								alt={book.title}
								fill
								className='rounded-[1.15rem] object-cover'
							/>
						</div>
					</div>

					<div className='space-y-4 text-white'>
						<Badge className='border-white/15 bg-white/10 text-white/90'>
							{book.categoryName}
						</Badge>
						<div>
							<h1 className='text-2xl leading-tight font-black tracking-tight sm:text-3xl md:text-4xl'>
								{book.title}
							</h1>
							<p className='mt-2 text-sm text-white/75 sm:text-base'>{book.author}</p>
						</div>

						<p className='max-w-2xl text-sm leading-7 text-white/80 md:text-base'>
							{book.description}
						</p>

						<div className='grid gap-3 sm:grid-cols-3'>
							<Card className='border-white/10 bg-white/5'>
								<CardContent className='p-4'>
									<p className='text-xs text-white/65'>Progress</p>
									<p className='mt-1 text-2xl font-black'>{book.progress}%</p>
								</CardContent>
							</Card>
							<Card className='border-white/10 bg-white/5'>
								<CardContent className='p-4'>
									<p className='text-xs text-white/65'>Duration</p>
									<p className='mt-1 text-2xl font-black'>{book.duration}</p>
								</CardContent>
							</Card>
							<Card className='border-white/10 bg-white/5'>
								<CardContent className='p-4'>
									<p className='text-xs text-white/65'>Updated</p>
									<div className='mt-1 flex items-center gap-2 text-sm font-semibold'>
										<CalendarDays className='h-4 w-4' />
										{format(new Date(book.updatedAt), 'yyyy/MM/dd')}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			<section className='grid gap-4 lg:grid-cols-[1fr_320px]'>
				<Card className='border-border bg-card/70 rounded-3xl border backdrop-blur-xl'>
					<CardHeader>
						<CardTitle>Key Points</CardTitle>
					</CardHeader>
					<CardContent className='space-y-2'>
						{book.keyPoints.map(point => (
							<div
								key={point}
								className='border-border bg-surface flex items-center gap-2 rounded-xl border p-3'
							>
								<Check className='text-primary h-4 w-4' />
								<span className='text-sm'>{point}</span>
							</div>
						))}
					</CardContent>
				</Card>

				<Card className='border-border bg-card/70 rounded-3xl border backdrop-blur-xl'>
					<CardHeader>
						<CardTitle>Media Status</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						{mediaItems.map(item => (
							<div
								key={item.label}
								className='border-border bg-surface flex items-center justify-between rounded-xl border p-3'
							>
								<span className='text-sm font-medium'>{item.label}</span>
								<Badge className={item.enabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-white/65'}>
									{item.enabled ? 'Enabled' : 'Not Added'}
								</Badge>
							</div>
						))}

						<div className='pt-2'>
							<div className='mb-2 flex items-center justify-between'>
								<span className='text-muted-foreground text-xs'>Overall Progress</span>
								<span className='text-muted-foreground text-xs'>{book.progress}%</span>
							</div>
							<Progress value={book.progress} className='h-2' />
						</div>
					</CardContent>
				</Card>
			</section>

			<Card className='border-border bg-card/70 rounded-3xl border backdrop-blur-xl'>
				<CardHeader>
					<CardTitle>Text Summary Preview</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3'>
					{book.textContent
						.split('\n')
						.filter(Boolean)
						.slice(0, 5)
						.map((line, index) => (
							<p key={`${book.id}-${index}`} className='text-muted-foreground text-sm leading-7'>
								{line.replace(/^#{2,3}\s/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
							</p>
						))}
					<Button variant='outline' className='border-border bg-surface'>
						<Circle className='h-4 w-4' />
						もっと見る
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
