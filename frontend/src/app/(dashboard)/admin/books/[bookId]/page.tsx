'use client'

import { format } from 'date-fns'
import { ArrowLeft, CalendarDays, Pause, PencilLine, Play, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import { DialogWarning } from '@/features/dialog-warning'

import { books, categories } from '@/shared/lib/mock-data'
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea
} from '@/shared/ui'
import { useEffect, useMemo } from 'react'
import { useMediaPlayer } from '@/shared/hooks/use-media-player'

type AdminBookDetailState = {
	id: string
	title: string
	author: string
	description: string
	categoryId: string
	categoryName: string
	hasText: boolean
	hasAudio: boolean
	hasVideo: boolean
	textContent: string
	imageUrl: string
	updatedAt: string
	duration: string
	audioUrl: string
	videoUrl: string
}

function formatTime(value: number) {
	const minutes = Math.floor(value / 60)
	const seconds = Math.floor(value % 60)
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function textToBlocks(content: string) {
	return content.split('\n').map(line => line.trim())
}

export default function Page() {
	const params = useParams<{ bookId: string }>()
	const router = useRouter()
	const media = useMediaPlayer(900)
	const book = books.find(entry => entry.id === params.bookId)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const [detail, setDetail] = useState<AdminBookDetailState | null>(
		book
			? {
					id: book.id,
					title: book.title,
					author: book.author,
					description: book.description,
					categoryId: book.categoryId,
					categoryName: book.categoryName,
					hasText: book.hasText,
					hasAudio: book.hasAudio,
					hasVideo: book.hasVideo,
					textContent: book.textContent,
					imageUrl: book.imageUrl,
					updatedAt: book.updatedAt,
					duration: book.duration,
					audioUrl: '',
					videoUrl: ''
			  }
			: null
	)
	useEffect(() => {
		if (!media.playing) return
		const timer = window.setInterval(() => {
			media.seek(media.position + 1)
		}, 1000)
		return () => window.clearInterval(timer)
	}, [media])

	const timelinePercent = useMemo(() => {
		return Math.max(0, Math.min(100, (media.position / media.duration) * 100))
	}, [media.duration, media.position])

	if (!book || !detail) {
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

	const updateField = <K extends keyof AdminBookDetailState>(key: K, value: AdminBookDetailState[K]) => {
		setDetail(prev => (prev ? { ...prev, [key]: value } : prev))
	}

	const handleSave = () => {
		setDetail(prev => {
			if (!prev) return prev
			const pickedCategory = categories.find(category => category.id === prev.categoryId)
			return {
				...prev,
				categoryName: pickedCategory?.name ?? prev.categoryName,
				updatedAt: new Date().toISOString().slice(0, 10)
			}
		})
		setIsEditOpen(false)
	}

	const handleDelete = async () => {
		setIsDeleting(true)
		router.replace('/admin/books')
	}

	return (
		<div className='mx-auto w-full max-w-6xl space-y-6 px-4 py-6 md:px-6 md:py-8'>
			<div className='flex flex-wrap items-center justify-between gap-3'>
				<Link href='/admin/books'>
					<Button variant='outline' className='border-border bg-card/70'>
						<ArrowLeft className='h-4 w-4' />
						一覧に戻る
					</Button>
				</Link>
				<div className='flex items-center gap-2'>
					<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
						<Button
							variant='outline'
							className='border-border bg-card/70'
							onClick={() => setIsEditOpen(true)}
						>
							<PencilLine className='h-4 w-4' />
							編集
						</Button>
						<DialogContent className='max-h-[92vh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] p-4 sm:max-w-2xl sm:p-6'>
							<DialogHeader>
								<DialogTitle>書籍を編集</DialogTitle>
							</DialogHeader>
							<div className='grid gap-4 md:grid-cols-2'>
								<div className='space-y-2'>
									<Label htmlFor='book-title'>タイトル</Label>
									<Input
										id='book-title'
										value={detail.title}
										onChange={event => updateField('title', event.target.value)}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='book-author'>著者</Label>
									<Input
										id='book-author'
										value={detail.author}
										onChange={event => updateField('author', event.target.value)}
									/>
								</div>

								<div className='space-y-2 md:col-span-2'>
									<Label>カテゴリ</Label>
									<Select
										value={detail.categoryId}
										onValueChange={value => updateField('categoryId', value)}
									>
										<SelectTrigger className='w-full'>
											<SelectValue placeholder='カテゴリを選択' />
										</SelectTrigger>
										<SelectContent>
											{categories.map(category => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className='space-y-2 md:col-span-2'>
									<Label htmlFor='book-description'>説明</Label>
									<Textarea
										id='book-description'
										value={detail.description}
										onChange={event =>
											updateField('description', event.target.value)
										}
									/>
								</div>

								<div className='space-y-2 md:col-span-2'>
									<Label htmlFor='book-text'>テキスト全文</Label>
									<Textarea
										id='book-text'
										value={detail.textContent}
										onChange={event =>
											updateField('textContent', event.target.value)
										}
										className='min-h-44'
									/>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='audio-url'>音声 URL</Label>
									<Input
										id='audio-url'
										value={detail.audioUrl}
										onChange={event => updateField('audioUrl', event.target.value)}
										placeholder='https://.../audio.mp3'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='video-url'>動画 URL</Label>
									<Input
										id='video-url'
										value={detail.videoUrl}
										onChange={event => updateField('videoUrl', event.target.value)}
										placeholder='https://.../video.mp4'
									/>
								</div>

								<label className='border-border bg-surface flex items-center gap-2 rounded-xl border p-3 text-sm'>
									<input
										type='checkbox'
										checked={detail.hasText}
										onChange={event => updateField('hasText', event.target.checked)}
									/>
									Text uploaded
								</label>
								<label className='border-border bg-surface flex items-center gap-2 rounded-xl border p-3 text-sm'>
									<input
										type='checkbox'
										checked={detail.hasAudio}
										onChange={event => updateField('hasAudio', event.target.checked)}
									/>
									Audio uploaded
								</label>
								<label className='border-border bg-surface flex items-center gap-2 rounded-xl border p-3 text-sm'>
									<input
										type='checkbox'
										checked={detail.hasVideo}
										onChange={event => updateField('hasVideo', event.target.checked)}
									/>
									Video uploaded
								</label>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant='outline'>キャンセル</Button>
								</DialogClose>
								<Button onClick={handleSave}>保存</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					<DialogWarning
						title='書籍を削除しますか？'
						description='削除後は管理一覧に戻ります。このプロトタイプでは画面上のデータのみ削除扱いです。'
						isLoading={isDeleting}
						onConfirm={handleDelete}
						open={isDeleteOpen}
						onOpenChange={setIsDeleteOpen}
						trigger={
							<Button
								variant='outline'
								className='border-border bg-card/70 text-red-400'
							>
								<Trash2 className='h-4 w-4' />
								削除
							</Button>
						}
					/>
				</div>
			</div>

			<section className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(2,6,23,0.95),rgba(15,23,42,0.9),rgba(56,189,248,0.14))] p-4 sm:p-6 md:p-8'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%)]' />
				<div className='relative grid gap-5 md:grid-cols-[240px_1fr] md:gap-8'>
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

					<div className='space-y-4 text-white'>
						<Badge className='border-white/15 bg-white/10 text-white/90'>
							{detail.categoryName}
						</Badge>
						<div>
							<h1 className='text-2xl leading-tight font-black tracking-tight sm:text-3xl md:text-4xl'>
								{detail.title}
							</h1>
							<p className='mt-2 text-sm text-white/75 sm:text-base'>{detail.author}</p>
						</div>

						<p className='max-w-2xl text-sm leading-7 text-white/80 md:text-base'>
							{detail.description}
						</p>

						<div className='grid gap-3 sm:grid-cols-3'>
							<Card className='border-white/10 bg-white/5'>
								<CardContent className='p-4'>
									<p className='text-xs text-white/65'>Book ID</p>
									<p className='mt-1 text-sm font-semibold'>{detail.id}</p>
								</CardContent>
							</Card>
							<Card className='border-white/10 bg-white/5'>
								<CardContent className='p-4'>
									<p className='text-xs text-white/65'>Duration</p>
									<p className='mt-1 text-2xl font-black'>{detail.duration}</p>
								</CardContent>
							</Card>
							<Card className='border-white/10 bg-white/5'>
								<CardContent className='p-4'>
									<p className='text-xs text-white/65'>Updated</p>
									<div className='mt-1 flex items-center gap-2 text-sm font-semibold'>
										<CalendarDays className='h-4 w-4' />
										{format(new Date(detail.updatedAt), 'yyyy/MM/dd')}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			<section className='grid items-stretch gap-4 lg:grid-cols-2'>
				<Card className='border-border bg-card/70 min-h-136 rounded-3xl border backdrop-blur-xl'>
					<CardHeader>
						<CardTitle>Audio Preview</CardTitle>
					</CardHeader>
					<CardContent className='flex h-full flex-col gap-4'>
						<div className='border-border/80 bg-surface relative aspect-video overflow-hidden rounded-[1.5rem] border'>
							<div className={`absolute inset-0 bg-linear-to-br ${book.coverTone}`} />
							<Image
								alt={detail.title}
								src={detail.imageUrl}
								fill
								className='object-cover'
							/>
						</div>
						<div className='border-border/80 bg-card/70 mt-auto space-y-4 rounded-3xl border p-4 backdrop-blur-xl'>
							<div className='text-muted-foreground mb-1 flex items-center justify-between text-xs'>
								<span>{formatTime(media.position)}</span>
								<span>{detail.duration}</span>
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
							<div className='text-muted-foreground flex items-center justify-between gap-3 pt-1 text-xs'>
								<span>Fake player preview</span>
								<span>{timelinePercent.toFixed(0)}%</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-border bg-card/70 min-h-136 rounded-3xl border backdrop-blur-xl'>
					<CardHeader>
						<CardTitle>Video Preview</CardTitle>
					</CardHeader>
					<CardContent className='flex h-full flex-col gap-4'>
						<div className='border-border from-primary/20 via-card to-accent/20 relative aspect-video overflow-hidden rounded-[1.4rem] border bg-linear-to-br'>
							<div className='absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.22),transparent_45%)]' />
							<div className='relative flex h-full flex-col items-center justify-center gap-3'>
								<Button size='icon-lg' className='h-14 w-14 rounded-full md:h-16 md:w-16'>
									<Play className='h-5 w-5' />
								</Button>
								<p className='text-muted-foreground text-sm'>Video player placeholder</p>
							</div>
						</div>
						<div className='border-border bg-surface mt-auto rounded-2xl border p-4 text-sm'>
							Admin can inspect the uploaded video experience here, but playback progress is not saved.
						</div>
					</CardContent>
				</Card>
			</section>

			<section className='grid gap-4'>
				<Card className='border-border bg-card/70 rounded-3xl border backdrop-blur-xl'>
					<CardHeader>
						<CardTitle>Uploaded Text (Full)</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						{detail.hasText ? (
							<article className='text-foreground/90 space-y-3 text-[15px] leading-8'>
								{textToBlocks(detail.textContent).map((line, index) => {
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
											<h4 key={index} className='text-foreground/95 text-lg font-semibold'>
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
						) : (
							<div className='text-muted-foreground border-border bg-surface rounded-xl border p-3 text-sm'>
								テキストは未アップロードです。
							</div>
						)}
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
