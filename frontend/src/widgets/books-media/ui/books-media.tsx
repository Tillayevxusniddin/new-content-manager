'use client'

import { CheckCircle2, Pause, Play } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { BookSummary } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { Button, Progress } from '@/shared/ui'

import { useMediaPlayer } from '@/shared/hooks/use-media-player'
import { useProgress } from '@/shared/hooks/use-progress'

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
        // Sync initial saved playback position once after persisted progress loads.
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
            setShowTextSection(window.scrollY > 420)
            setShowVideoSection(window.scrollY > 860)
        }

        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const timelinePercent = useMemo(() => {
        return Math.max(0, Math.min(100, (media.position / media.duration) * 100))
    }, [media.duration, media.position])

    return (
        <div className='relative min-h-screen text-white'>
            <div
                className={cn(
                    'pointer-events-none sticky top-0 z-40 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl transition-all duration-300 md:px-6',
                    showStickyHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                )}
            >
                <div className='mx-auto flex w-full max-w-6xl items-center justify-between gap-3'>
                    <div className='min-w-0'>
                        <p className='line-clamp-1 text-sm font-semibold'>{book.title}</p>
                        <p className='line-clamp-1 text-xs text-white/60'>{book.author}</p>
                    </div>
                    <Button
                        size='icon-sm'
                        onClick={media.toggle}
                        className='pointer-events-auto rounded-full'
                    >
                        {media.playing ? <Pause className='h-4 w-4' /> : <Play className='h-4 w-4' />}
                    </Button>
                </div>
            </div>

            <section className='relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-linear-to-b from-emerald-900/55 via-[#0e1118] to-background p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] md:p-8'>
                <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.23),transparent_42%),radial-gradient(circle_at_bottom,rgba(6,182,212,0.14),transparent_40%)]' />
                <div className='relative mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center'>
                    <div className='w-full max-w-70 rounded-[2rem] border border-white/10 bg-black/35 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.65)] md:max-w-85'>
                        <div className={cn('aspect-3/4 rounded-[1.4rem] bg-linear-to-br', book.coverTone)}>
                            <div className='flex h-full flex-col justify-between p-6 text-left'>
                                <span className='text-[10px] tracking-[0.28em] text-white/50 uppercase'>Now Playing</span>
                                <div>
                                    <h1 className='text-3xl leading-[1.05] font-black text-white md:text-4xl'>{book.title}</h1>
                                    <p className='mt-3 text-sm text-white/75'>{book.author}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full space-y-4 rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur-xl md:p-5'>
                        <div className='mb-1 flex items-center justify-between text-xs text-white/62'>
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
                                {media.playing ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
                            </Button>
                        </div>
                        <div className='flex flex-wrap items-center justify-between gap-3 pt-1'>
                            <p className='text-xs text-white/58'>Progress: {timelinePercent.toFixed(0)}%</p>
                            <Button
                                variant='outline'
                                onClick={() => setAudioPosition(media.position)}
                                className='border-white/20 bg-white/5 text-white hover:bg-white/10'
                            >
                                Save Position
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className={cn(
                    'mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-6 backdrop-blur-xl transition-all duration-700 md:p-8',
                    showTextSection ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'
                )}
            >
                <div className='mb-5 flex items-center justify-between gap-3'>
                    <div>
                        <p className='text-xs tracking-[0.22em] text-white/50 uppercase'>Text Summary</p>
                        <h2 className='mt-1 text-2xl font-black text-white md:text-3xl'>Readable Notes</h2>
                    </div>
                    <Button variant='outline' onClick={markTextCompleted} className='border-white/20 bg-white/5 text-white hover:bg-white/10'>
                        <CheckCircle2 className='h-4 w-4' />
                        Mark as Read
                    </Button>
                </div>
                <article className='space-y-3 text-[15px] leading-8 text-white/86'>
                    {textToBlocks(book.textContent).map((line, index) => {
                        if (!line) return <div key={index} className='h-3' />
                        if (line.startsWith('## ')) {
                            return (
                                <h3 key={index} className='pt-2 text-xl font-bold text-white'>
                                    {line.replace('## ', '')}
                                </h3>
                            )
                        }
                        if (line.startsWith('### ')) {
                            return (
                                <h4 key={index} className='text-lg font-semibold text-white/95'>
                                    {line.replace('### ', '')}
                                </h4>
                            )
                        }
                        if (line.startsWith('> ')) {
                            return (
                                <blockquote key={index} className='border-l-2 border-emerald-300/70 pl-4 text-white/75 italic'>
                                    {line.replace('> ', '')}
                                </blockquote>
                            )
                        }
                        return (
                            <p key={index} className='text-white/84'>
                                {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                            </p>
                        )
                    })}
                </article>
                <div className='mt-6 rounded-2xl border border-white/10 bg-black/30 p-4'>
                    <div className='mb-2 flex items-center justify-between text-xs text-white/62'>
                        <span>Reading Completion</span>
                        <span>{progress.isTextCompleted ? 'Completed' : 'In progress'}</span>
                    </div>
                    <Progress value={progress.isTextCompleted ? 100 : 62} />
                </div>
            </section>

            <section
                className={cn(
                    'mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-6 backdrop-blur-xl transition-all duration-700 md:p-8',
                    showVideoSection ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}
            >
                <div className='mb-4'>
                    <p className='text-xs tracking-[0.22em] text-white/50 uppercase'>Video Companion</p>
                    <h2 className='mt-1 text-2xl font-black text-white md:text-3xl'>Watch Mode</h2>
                </div>
                <div className='relative aspect-video overflow-hidden rounded-[1.4rem] border border-white/10 bg-linear-to-br from-slate-900 via-black to-emerald-950/45'>
                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.24),transparent_45%)]' />
                    <div className='relative flex h-full flex-col items-center justify-center gap-3'>
                        <Button size='icon-lg' className='h-14 w-14 rounded-full'>
                            <Play className='h-5 w-5' />
                        </Button>
                        <p className='text-sm text-white/72'>Video player placeholder</p>
                    </div>
                </div>
                <div className='mt-5 flex justify-end'>
                    <Button
                        variant='outline'
                        onClick={() => setVideoPosition(media.position)}
                        className='border-white/20 bg-white/5 text-white hover:bg-white/10'
                    >
                        Save Video Position
                    </Button>
                </div>
            </section>
        </div>
    )
}