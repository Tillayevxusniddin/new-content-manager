import { ArrowRight, BookOpenText, Flame, LibraryBig } from 'lucide-react'
import Link from 'next/link'

import { BookCard } from '@/entities/book'

import { books, categories } from '@/shared/lib/mock-data'
import {
    Badge,
    Button,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Progress
} from '@/shared/ui'

const MINUTE_TO_SECONDS = 60

function toSeconds(duration: string) {
    const numeric = Number.parseInt(duration.replace(/[^\d]/g, ''), 10)
    if (Number.isNaN(numeric)) return 0
    return numeric * MINUTE_TO_SECONDS
}

export default function Page() {
    const resumeTarget = [...books]
        .filter(book => book.progress > 0)
        .sort((a, b) => b.progress - a.progress)[0] ?? books[0]

    const groupedShelves = categories
        .map(category => ({
            category,
            items: books.filter(book => book.categoryId === category.id)
        }))
        .filter(group => group.items.length > 0)

    return (
        <div className='space-y-10 pb-10'>
            <section className='relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(130deg,#06080f,#0f141f_35%,#121a29_72%,#18262f)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.55)] md:p-8'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.22),transparent_38%)]' />
                <div className='relative grid gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:items-center'>
                    <div className='mx-auto w-full max-w-60'>
                        <BookCard book={resumeTarget} />
                    </div>
                    <div className='space-y-5 text-white'>
                        <Badge className='border-emerald-300/25 bg-emerald-300/10 text-emerald-100'>
                            <Flame className='h-3.5 w-3.5' />
                            Continue Reading
                        </Badge>
                        <div className='space-y-3'>
                            <p className='text-xs tracking-[0.22em] text-white/55 uppercase'>Your Current Session</p>
                            <h1 className='max-w-3xl text-3xl leading-tight font-black tracking-tight text-white md:text-5xl'>
                                {resumeTarget.title}
                            </h1>
                            <p className='text-sm text-white/66 md:text-base'>
                                {resumeTarget.author} ・ {resumeTarget.categoryName}
                            </p>
                        </div>
                        <div className='max-w-xl space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl'>
                            <div className='flex items-center justify-between text-xs text-white/62'>
                                <span>Reading progress</span>
                                <span>{resumeTarget.progress}%</span>
                            </div>
                            <Progress value={resumeTarget.progress} className='h-2.5 bg-white/10' />
                            <div className='flex items-center justify-between text-xs text-white/52'>
                                <span>{resumeTarget.duration}</span>
                                <span>{Math.round((resumeTarget.progress / 100) * toSeconds(resumeTarget.duration))} sec played</span>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <Link href={`/books/${resumeTarget.id}`}>
                                <Button size='lg' className='min-w-40'>
                                    Resume
                                    <ArrowRight className='h-4 w-4' />
                                </Button>
                            </Link>
                            <Link href='/'>
                                <Button
                                    size='lg'
                                    variant='outline'
                                    className='border-white/15 bg-white/5 text-white hover:bg-white/10'
                                >
                                    Back To Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className='space-y-7'>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className='text-xs tracking-[0.2em] text-white/50 uppercase'>Kindle Shelves</p>
                        <h2 className='mt-2 flex items-center gap-2 text-2xl font-black text-white'>
                            <LibraryBig className='h-6 w-6 text-emerald-300' />
                            Browse By Category
                        </h2>
                    </div>
                    <Badge className='border-white/10 bg-white/5 text-white/75'>
                        <BookOpenText className='h-3.5 w-3.5' />
                        {books.length} Books
                    </Badge>
                </div>

                {groupedShelves.map(group => (
                    <section key={group.category.id} className='space-y-3'>
                        <div className='flex items-center justify-between gap-3'>
                            <div>
                                <h3 className='text-lg font-bold text-white'>{group.category.name}</h3>
                                <p className='text-sm text-white/52'>{group.items.length} titles</p>
                            </div>
                        </div>
                        <div className='px-10'>
                            <Carousel
                                opts={{ align: 'start', dragFree: true }}
                                className='w-full'
                            >
                                <CarouselContent>
                                    {group.items.map(book => (
                                        <CarouselItem
                                            key={book.id}
                                            className='basis-[66%] sm:basis-[46%] md:basis-[34%] lg:basis-[26%] xl:basis-[22%]'
                                        >
                                            <BookCard book={book} />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className='-left-7 border-white/10 bg-black/45 text-white hover:bg-black/60' />
                                <CarouselNext className='-right-7 border-white/10 bg-black/45 text-white hover:bg-black/60' />
                            </Carousel>
                        </div>
                    </section>
                ))}
            </section>
        </div>
    )
}