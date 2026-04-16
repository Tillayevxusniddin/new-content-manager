'use client'

import { CheckCircle2, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { useMediaPlayer } from '@/shared/hooks/use-media-player'
import { useProgress } from '@/shared/hooks/use-progress'
import { BookSummary } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { Button, Progress } from '@/shared/ui'

function formatTime(value: number) {
	const minutes = Math.floor(value / 60)
	const seconds = Math.floor(value % 60)
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function textToBlocks(content: string) {
	return content.split('\n').map(line => line.trim())
}

export function BooksMedia({ book }: { book: BookSummary }) {
	const media = useMediaPlayer(900)
	const { progress, setAudioPosition, setVideoPosition, markTextCompleted } = useProgress(book.id)
	const [showStickyHeader, setShowStickyHeader] = useState(false)
	const [showTextSection, setShowTextSection] = useState(false)
	const [showVideoSection, setShowVideoSection] = useState(false)

	useEffect(() => {
		if (progress.audioPositionSec > 0) {
			media.seek(progress.audioPositionSec)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress.audioPositionSec])

	useEffect(() => {
		if (!media.playing) return
		const timer = window.setInterval(() => {
			media.seek(media.position + 1)
		}, 1000)
		return () => window.clearInterval(timer)
	}, [media])

	useEffect(() => {
		const onScroll = () => {
			setShowStickyHeader(window.scrollY > 260)
		}
		onScroll()
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		const textEl = document.getElementById('text-section')
		const videoEl = document.getElementById('video-section')

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.target.id === 'text-section' && entry.isIntersecting) {
						setShowTextSection(true)
					}
					if (entry.target.id === 'video-section' && entry.isIntersecting) {
						setShowVideoSection(true)
					}
				})
			},
			{ threshold: 0.08 }
		)

		if (textEl) observer.observe(textEl)
		if (videoEl) observer.observe(videoEl)

		return () => observer.disconnect()
	}, [])

	const timelinePercent = useMemo(() => {
		return Math.max(0, Math.min(100, (media.position / media.duration) * 100))
	}, [media.duration, media.position])

	return (
		<div className='text-foreground relative'>
			<section className='border-border from-primary/25 via-card to-background relative overflow-hidden rounded-[2.25rem] border bg-linear-to-b p-5 shadow-[0_30px_100px_hsl(var(--foreground)/0.18)] md:p-8'>
				<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.22),transparent_42%),radial-gradient(circle_at_bottom,hsl(var(--accent)/0.14),transparent_40%)]' />
				<div className='relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center'>
					<div className='border-border/80 bg-card/70 w-full max-w-70 rounded-[2rem] border p-3 shadow-[0_30px_90px_hsl(var(--foreground)/0.2)] md:max-w-85'>
						<div
							className={cn(
								'aspect-3/4 rounded-[1.4rem] bg-linear-to-br',
								book.coverTone
							)}
						>
							<Image
								alt='book detail'
								src={book.imageUrl}
								fill
								className='rounded-[1.4rem] object-cover'
							/>
						</div>
					</div>

					<div className='border-border/80 bg-card/70 w-full space-y-4 rounded-3xl border p-4 backdrop-blur-xl md:p-5'>
						<div className='text-muted-foreground mb-1 flex items-center justify-between text-xs'>
							<span>{formatTime(media.position)}</span>
							<span>{book.duration}</span>
						</div>
						<input
							type='range'
							min={0}
							max={media.duration}
							value={media.position}
							onChange={event => media.seek(Number(event.target.value))}
							className='accent-primary h-1.5 w-full cursor-pointer'
						/>
						<div className='flex items-center justify-center gap-3 pt-1'>
							<Button
								size='icon-lg'
								onClick={media.toggle}
								className='glow-soft h-14 w-14 rounded-full md:h-16 md:w-16'
							>
								{media.playing ? (
									<Pause className='h-5 w-5' />
								) : (
									<Play className='h-5 w-5' />
								)}
							</Button>
						</div>
						<div className='flex flex-wrap items-center justify-between gap-3 pt-1'>
							<p className='text-muted-foreground text-xs'>
								Progress: {timelinePercent.toFixed(0)}%
							</p>
							<Button
								variant='outline'
								onClick={() => setAudioPosition(media.position)}
								className='border-border bg-surface text-foreground hover:bg-surface-hover'
							>
								Save Position
							</Button>
						</div>
					</div>
				</div>
			</section>

			<section
				id='text-section'
				className={cn(
					'border-border/80 bg-card/70 mt-8 rounded-[2rem] border p-6 backdrop-blur-xl transition-all duration-700 md:p-8',
					showTextSection ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'
				)}
			>
				<div className='mb-5 flex items-center justify-between gap-3'>
					<div>
						<p className='text-muted-foreground text-xs tracking-[0.22em] uppercase'>
							Text Summary
						</p>
						<h2 className='mt-1 text-2xl font-black md:text-3xl'>Readable Notes</h2>
					</div>
					<Button
						variant='outline'
						onClick={markTextCompleted}
						className='border-border bg-surface text-foreground hover:bg-surface-hover'
					>
						<CheckCircle2 className='h-4 w-4' />
						Mark as Read
					</Button>
				</div>
				<article className='text-foreground/90 space-y-3 text-[15px] leading-8'>
					{textToBlocks(book.textContent).map((line, index) => {
						if (!line) return <div key={index} className='h-3' />
						if (line.startsWith('## ')) {
							return (
								<h3 key={index} className='pt-2 text-xl font-bold'>
									{line.replace('## ', '')}
								</h3>
							)
						}
						if (line.startsWith('### ')) {
							return (
								<h4
									key={index}
									className='text-foreground/95 text-lg font-semibold'
								>
									{line.replace('### ', '')}
								</h4>
							)
						}
						if (line.startsWith('> ')) {
							return (
								<blockquote
									key={index}
									className='border-primary/60 text-muted-foreground border-l-2 pl-4 italic'
								>
									{line.replace('> ', '')}
								</blockquote>
							)
						}
						return (
							<p key={index} className='text-foreground/85'>
								{line.replace(/\*\*(.*?)\*\*/g, '$1')}
							</p>
						)
					})}
				</article>
				<div className='border-border bg-surface mt-6 rounded-2xl border p-4'>
					<div className='text-muted-foreground mb-2 flex items-center justify-between text-xs'>
						<span>Reading Completion</span>
						<span>{progress.isTextCompleted ? 'Completed' : 'In progress'}</span>
					</div>
					<Progress value={progress.isTextCompleted ? 100 : 62} />
				</div>
			</section>

			<section
				id='video-section'
				className={cn(
					'border-border/80 bg-card/70 mt-8 rounded-[2rem] border p-6 backdrop-blur-xl transition-all duration-700 md:p-8',
					showVideoSection ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
				)}
			>
				<div className='mb-4'>
					<p className='text-muted-foreground text-xs tracking-[0.22em] uppercase'>
						Video Companion
					</p>
					<h2 className='mt-1 text-2xl font-black md:text-3xl'>Watch Mode</h2>
				</div>
				<div className='border-border from-primary/20 via-card to-accent/20 relative aspect-video overflow-hidden rounded-[1.4rem] border bg-linear-to-br'>
					<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.22),transparent_45%)]' />
					<div className='relative flex h-full flex-col items-center justify-center gap-3'>
						<Button size='icon-lg' className='h-14 w-14 rounded-full'>
							<Play className='h-5 w-5' />
						</Button>
						<p className='text-muted-foreground text-sm'>Video player placeholder</p>
					</div>
				</div>
				<div className='mt-5 flex justify-end'>
					<Button
						variant='outline'
						onClick={() => setVideoPosition(media.position)}
						className='border-border bg-surface text-foreground hover:bg-surface-hover'
					>
						Save Video Position
					</Button>
				</div>
			</section>
		</div>
	)
}
