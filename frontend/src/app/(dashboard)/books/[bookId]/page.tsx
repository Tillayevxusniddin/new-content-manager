'use client'
import {
	ArrowLeft,
	BookOpen,
	CheckCircle2,
	FileText,
	Headphones,
	ListChecks,
	Pause,
	Play,
	SkipBack,
	SkipForward,
	Video,
	Volume2
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { InputHTMLAttributes } from 'react'

import { useMediaPlayer } from '@/shared/hooks/use-media-player'
import { useProgress } from '@/shared/hooks/use-progress'
import { BookSummary, books } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { Badge, Button } from '@/shared/ui'

import NotFoundPage from './not-found'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	value?: number
	min?: number
	max?: number
	step?: number
	onChangeValue?: (value: number) => void
}

export function Slider({
	className,
	value,
	min = 0,
	max = 100,
	step = 1,
	onChangeValue,
	...props
}: SliderProps) {
	return (
		<input
			type='range'
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={event => onChangeValue?.(Number(event.target.value))}
			className={cn('accent-primary w-full', className)}
			{...props}
		/>
	)
}

export function Progress({ value = 0, className }: { value?: number; className?: string }) {
	return (
		<div className={cn('h-2 w-full overflow-hidden rounded-full bg-white/10', className)}>
			<div
				className='from-primary h-full rounded-full bg-linear-to-r to-cyan-400 transition-all'
				style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
			/>
		</div>
	)
}

export function TextReader({ book }: { book: BookSummary }) {
	const { progress, markTextCompleted } = useProgress(book.id)

	return (
		<div className='space-y-6'>
			<article className='prose prose-invert prose-p:text-foreground/85 prose-headings:text-white max-w-none'>
				{book.textContent.split('\n').map((line, index) => {
					if (!line.trim()) return <div key={index} className='h-3' />
					if (line.startsWith('## '))
						return <h2 key={index}>{line.replace('## ', '')}</h2>
					if (line.startsWith('### '))
						return <h3 key={index}>{line.replace('### ', '')}</h3>
					if (line.startsWith('> '))
						return (
							<blockquote
								key={index}
								className='border-primary text-muted-foreground border-l-2 pl-4 italic'
							>
								{line.replace('> ', '')}
							</blockquote>
						)
					if (line.match(/^\d+\./))
						return (
							<li key={index} className='ml-5'>
								{line.replace(/^\d+\.\s*/, '')}
							</li>
						)
					return <p key={index}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</p>
				})}
			</article>

			<div className='border-glass-border bg-card/70 rounded-2xl border p-4'>
				<div className='mb-3 flex items-center justify-between text-sm'>
					<span className='text-muted-foreground'>読書進捗</span>
					<span className='text-primary font-semibold'>
						{progress.isTextCompleted ? '完了' : '進行中'}
					</span>
				</div>
				<Progress value={progress.isTextCompleted ? 100 : 65} />
				<div className='mt-4 flex justify-end'>
					<Button onClick={markTextCompleted}>
						<CheckCircle2 className='h-4 w-4' />
						読了として保存
					</Button>
				</div>
			</div>
		</div>
	)
}

export function AudioPlayer({ book }: { book: BookSummary }) {
	const media = useMediaPlayer(900)
	const { progress, setAudioPosition } = useProgress(book.id)

	return (
		<div className='space-y-6'>
			<div className='border-glass-border bg-surface/90 mx-auto flex w-full max-w-md flex-col items-center rounded-[2rem] border p-8 text-center'>
				<div
					className={`mb-6 h-40 w-40 rounded-full border border-white/10 bg-linear-to-br ${book.coverTone} shadow-2xl ${media.playing ? 'animate-spin-slow' : ''}`}
				/>
				<div className='text-foreground text-lg font-bold'>{book.title}</div>
				<p className='text-muted-foreground text-sm'>{book.author}</p>
				<div className='mt-6 grid w-full gap-2'>
					<Slider value={media.position} onChangeValue={media.seek} max={900} />
					<div className='text-muted-foreground flex items-center justify-between text-xs'>
						<span>5:15</span>
						<span>15:00</span>
					</div>
				</div>
				<div className='mt-6 flex items-center gap-3'>
					<Button variant='outline' size='icon'>
						<SkipBack className='h-4 w-4' />
					</Button>
					<Button size='lg' onClick={media.toggle}>
						{media.playing ? (
							<Pause className='h-4 w-4' />
						) : (
							<Play className='h-4 w-4' />
						)}
					</Button>
					<Button variant='outline' size='icon'>
						<SkipForward className='h-4 w-4' />
					</Button>
				</div>
				<div className='text-muted-foreground mt-5 flex w-full items-center gap-3'>
					<Volume2 className='h-4 w-4' />
					<Slider value={media.volume} onChangeValue={media.setVolumeValue} />
				</div>
			</div>

			<div className='border-glass-border bg-card/70 rounded-2xl border p-4'>
				<div className='text-muted-foreground mb-3 flex items-center justify-between text-sm'>
					<span>保存された位置</span>
					<span>{progress.audioPositionSec} sec</span>
				</div>
				<Progress value={(progress.audioPositionSec / 900) * 100} />
				<div className='mt-4 flex justify-end'>
					<Button onClick={() => setAudioPosition(media.position)}>現在位置を保存</Button>
				</div>
			</div>
		</div>
	)
}

export function VideoPlayer({ book }: { book: BookSummary }) {
	const media = useMediaPlayer(1200)
	const { progress, setVideoPosition } = useProgress(book.id)

	return (
		<div className='space-y-6'>
			<div className='border-glass-border bg-surface/90 overflow-hidden rounded-[2rem] border'>
				<div className='relative aspect-video bg-linear-to-br from-black via-slate-900 to-slate-800'>
					<button className='bg-primary/90 text-primary-foreground absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-[65%] items-center justify-center rounded-full shadow-2xl sm:h-20 sm:w-20 sm:-translate-y-1/2'>
						<Play className='ml-1 h-8 w-8' />
					</button>
					<div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent p-4'>
						<Slider value={media.position} onChangeValue={media.seek} max={1200} />
						<div className='mt-2 flex items-center justify-between text-xs text-white/70'>
							<span>3:45 / 14:20</span>
							<span className='flex items-center gap-2'>
								<Volume2 className='h-4 w-4' /> 80%
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className='border-glass-border bg-card/70 rounded-2xl border p-4'>
				<div className='text-muted-foreground mb-3 flex items-center justify-between text-sm'>
					<span>保存された位置</span>
					<span>{progress.videoPositionSec} sec</span>
				</div>
				<Progress value={(progress.videoPositionSec / 1200) * 100} />
				<div className='mt-4 flex justify-end'>
					<Button onClick={() => setVideoPosition(media.position)}>現在位置を保存</Button>
				</div>
			</div>
		</div>
	)
}

export function MediaTabs({ book }: { book: BookSummary }) {
	const [tab, setTab] = useState<'text' | 'audio' | 'video'>('text')

	const tabButton = (key: typeof tab, label: string, icon: React.ReactNode) => (
		<button
			onClick={() => setTab(key)}
			className={cn(
				'min-w-0 flex-1 rounded-2xl px-2 py-2.5 text-xs font-medium transition-all sm:px-4 sm:py-3 sm:text-sm',
				tab === key
					? 'bg-primary text-primary-foreground glow-soft'
					: 'text-muted-foreground hover:bg-surface-hover hover:text-foreground'
			)}
		>
			<span className='inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap sm:gap-2'>
				{icon}
				{label}
			</span>
		</button>
	)

	return (
		<div className='space-y-4'>
			<div className='border-glass-border bg-card/70 flex gap-2 rounded-3xl border p-2'>
				{tabButton('text', 'テキスト', <BookOpen className='h-4 w-4' />)}
				{tabButton('audio', '音声', <Headphones className='h-4 w-4' />)}
				{tabButton('video', '動画', <Video className='h-4 w-4' />)}
			</div>
			<div className='border-glass-border bg-card/70 rounded-[2rem] border p-5'>
				{tab === 'text' && <TextReader book={book} />}
				{tab === 'audio' && <AudioPlayer book={book} />}
				{tab === 'video' && <VideoPlayer book={book} />}
			</div>
		</div>
	)
}

interface BookCardProps {
	book: BookSummary
	variant?: 'default' | 'large'
}

export function BookCard({ book, variant = 'default' }: BookCardProps) {
	const isLarge = variant === 'large'

	return (
		<Link
			href={`/books/${book.id}`}
			className={cn(
				'group border-glass-border bg-card/70 hover:border-primary/30 hover:shadow-primary/10 block overflow-hidden rounded-[1.6rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
				isLarge && 'md:col-span-2'
			)}
		>
			<div
				className={cn(
					'grid h-full',
					isLarge ? 'md:grid-cols-[180px_1fr]' : 'grid-rows-[210px_1fr]'
				)}
			>
				<div className={cn('relative overflow-hidden', isLarge ? 'min-h-56' : 'min-h-52')}>
					<div className={cn('absolute inset-0 bg-linear-to-br', book.coverTone)} />
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%)]' />
					<div className='relative flex h-full flex-col justify-between p-5 text-white'>
						<div className='flex items-center justify-between text-[10px] tracking-[0.3em] text-white/55 uppercase'>
							<span>{book.categoryName}</span>
							<span>{book.progress}%</span>
						</div>
						<div>
							<div
								className={cn(
									'leading-none font-black',
									isLarge ? 'text-4xl' : 'text-3xl'
								)}
							>
								{book.title}
							</div>
							<div className='mt-2 text-sm text-white/70'>{book.author}</div>
						</div>
						<div className='flex items-center gap-2 text-white/80'>
							{book.hasText && <FileText className='h-4 w-4' />}
							{book.hasAudio && <Headphones className='h-4 w-4' />}
							{book.hasVideo && <Video className='h-4 w-4' />}
						</div>
					</div>
				</div>

				<div className={cn('p-4', isLarge ? 'flex flex-col justify-between' : '')}>
					<div>
						<Badge className='mb-3 border-white/10 bg-white/5 text-white/80'>
							{book.categoryName}
						</Badge>
						<h3
							className={cn(
								'text-foreground group-hover:text-primary line-clamp-2 font-bold transition-colors',
								isLarge ? 'text-xl' : 'text-base'
							)}
						>
							{book.title}
						</h3>
						<p className='text-muted-foreground mt-1 text-xs'>{book.author}</p>
						{isLarge && (
							<p className='text-muted-foreground mt-3 line-clamp-3 text-sm leading-6'>
								{book.description}
							</p>
						)}
					</div>
					<div className='mt-4 space-y-2'>
						<div className='text-muted-foreground flex items-center justify-between text-[11px]'>
							<span>{book.duration}</span>
							<span>{book.progress}% 完了</span>
						</div>
						<Progress value={book.progress} className='h-1.5' />
					</div>
				</div>
			</div>
		</Link>
	)
}

export default function Page() {
	const bookId = useParams().bookId
	const book = books.find(entry => entry.id === bookId)
	if (!book) {
		return <NotFoundPage />
	}
	const related = books.filter(entry => entry.id !== book?.id).slice(0, 3)
	return (
		<div className='mx-auto max-w-7xl space-y-8 px-4 py-6 md:px-6 md:py-8'>
			<section className={`relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-br ${book.coverTone} p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] md:p-8`}>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_22%)]' />
				<div className='relative grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center'>
					<div className='mx-auto w-full max-w-56'>
						<div className='rounded-[2rem] border border-white/10 bg-black/25 p-3 shadow-2xl backdrop-blur-xl'>
							<div className='aspect-[3/4] rounded-[1.5rem] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_26%),linear-gradient(135deg,rgba(0,0,0,0.08),rgba(255,255,255,0.08))] p-6 text-white'>
								<div className='flex h-full flex-col justify-between'>
									<div className='flex items-center justify-between text-[10px] tracking-[0.24em] text-white/65 uppercase'>
										<span>{book.categoryName}</span>
										<span>{book.progress}%</span>
									</div>
									<div className='space-y-2'>
										<div className='text-3xl font-black leading-none'>{book.title}</div>
										<div className='text-sm text-white/75'>{book.author}</div>
									</div>
									<div className='flex items-center gap-2 text-white/80'>
										{book.hasText && <FileText className='h-4 w-4' />}
										{book.hasAudio && <Headphones className='h-4 w-4' />}
										{book.hasVideo && <Video className='h-4 w-4' />}
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='space-y-5 text-white'>
						<div className='flex items-center justify-between gap-4'>
							<Link href='/books'>
								<Button variant='outline' size='icon' className='border-white/15 bg-black/20 text-white hover:bg-black/35'>
									<ArrowLeft className='h-4 w-4' />
								</Button>
							</Link>
							<Badge className='border-white/10 bg-black/20 text-white/90 backdrop-blur'>
								{book.categoryName}
							</Badge>
						</div>
						<h1 className='max-w-3xl text-4xl leading-tight font-black tracking-tight md:text-6xl'>
							{book.title}
						</h1>
						<p className='max-w-2xl text-sm leading-7 text-white/75 md:text-base'>
							{book.description}
						</p>
						<div className='flex flex-wrap items-center gap-3 text-xs text-white/70'>
							<span className='rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur'>
								{book.duration}
							</span>
							<span className='rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur'>
								{book.keyPoints.length} キーポイント
							</span>
							<span className='rounded-full border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur'>
								更新日 {book.updatedAt}
							</span>
						</div>
						<Progress value={book.progress} className='h-2 bg-white/15' />
						<div className='flex flex-wrap gap-3'>
							<Link href='#audio-player'>
								<Button size='lg' className='min-w-44'>
									<Play className='h-4 w-4' />
									音声から再生
								</Button>
							</Link>
							<Link href='#text-reader'>
								<Button size='lg' variant='outline' className='border-white/15 bg-black/20 text-white hover:bg-black/35'>
									下へスクロール
									<ArrowLeft className='h-4 w-4 rotate-[-90deg]' />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			<div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]'>
				<main className='space-y-6'>
					<section id='audio-player' className='scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:p-5'>
						<AudioPlayer book={book} />
					</section>

					<section id='text-reader' className='scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:p-5'>
						<div className='mb-4 flex items-center gap-2 text-sm font-semibold text-white'>
							<FileText className='text-primary h-4 w-4' />
							Text summary
						</div>
						<TextReader book={book} />
					</section>

					<section id='video-reader' className='scroll-mt-28 rounded-[2rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl md:p-5'>
						<div className='mb-4 flex items-center gap-2 text-sm font-semibold text-white'>
							<Video className='text-primary h-4 w-4' />
							Video summary
						</div>
						<VideoPlayer book={book} />
					</section>
				</main>

				<aside className='space-y-6 lg:sticky lg:top-28'>
					<div className='rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl'>
						<div className='text-sm font-semibold text-white'>キーポイント</div>
						<ul className='mt-4 space-y-3 text-sm text-white/72'>
							{book.keyPoints.map(point => (
								<li key={point} className='flex gap-2'>
									<CheckCircle2 className='text-primary mt-0.5 h-4 w-4 shrink-0' />
									<span>{point}</span>
								</li>
							))}
						</ul>
						<div className='mt-5'>
							<div className='mb-2 flex items-center justify-between text-xs text-white/55'>
								<span>進捗</span>
								<span>{book.progress}%</span>
							</div>
							<Progress value={book.progress} />
						</div>
					</div>

					<div>
						<div className='mb-3 text-sm font-semibold text-white'>関連する要約</div>
						<div className='space-y-3'>
							{related.map(entry => (
								<BookCard key={entry.id} book={entry} />
							))}
						</div>
					</div>
				</aside>
			</div>
		</div>
	)
}
