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
	const resumeTarget =
		[...books].filter(book => book.progress > 0).sort((a, b) => b.progress - a.progress)[0] ??
		books[0]

	const groupedShelves = categories
		.map(category => ({
			category,
			items: books.filter(book => book.categoryId === category.id)
		}))
		.filter(group => group.items.length > 0)

	return (
		<div className='space-y-10 pb-10'>
			<section className='border-border bg-card/75 relative overflow-hidden rounded-[2.25rem] border p-6 shadow-[0_30px_90px_hsl(var(--foreground)/0.14)] md:p-8'>
				<div className='absolute inset-0 bg-[linear-gradient(130deg,hsl(var(--background)),hsl(var(--surface))_35%,hsl(var(--card))_72%,hsl(var(--surface-hover)))]' />
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--foreground)/0.08),transparent_32%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.22),transparent_38%)]' />
				<div className='relative grid gap-8 md:grid-cols-[240px_minmax(0,1fr)] md:items-center'>
					<div className='mx-auto w-full max-w-60'>
						<BookCard book={resumeTarget} />
					</div>
					<div className='text-foreground space-y-5'>
						<Badge className='border-border bg-surface text-foreground'>
							<Flame className='h-3.5 w-3.5' />
							Continue Reading
						</Badge>
						<div className='space-y-3'>
							<p className='text-muted-foreground text-xs tracking-[0.22em] uppercase'>
								Your Current Session
							</p>
							<h1 className='text-foreground max-w-3xl text-3xl leading-tight font-black tracking-tight md:text-5xl'>
								{resumeTarget.title}
							</h1>
							<p className='text-muted-foreground text-sm md:text-base'>
								{resumeTarget.author} ・ {resumeTarget.categoryName}
							</p>
						</div>
						<div className='border-border bg-surface/80 max-w-xl space-y-2 rounded-2xl border p-4 backdrop-blur-xl'>
							<div className='text-muted-foreground flex items-center justify-between text-xs'>
								<span>Reading progress</span>
								<span>{resumeTarget.progress}%</span>
							</div>
							<Progress value={resumeTarget.progress} className='bg-border h-2.5' />
							<div className='text-muted-foreground flex items-center justify-between text-xs'>
								<span>{resumeTarget.duration}</span>
								<span>
									{Math.round(
										(resumeTarget.progress / 100) *
											toSeconds(resumeTarget.duration)
									)}{' '}
									sec played
								</span>
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
									className='border-border bg-surface text-foreground hover:bg-surface-hover'
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
						<p className='text-muted-foreground text-xs tracking-[0.2em] uppercase'>
							Kindle Shelves
						</p>
						<h2 className='text-foreground mt-2 flex items-center gap-2 text-2xl font-black'>
							<LibraryBig className='text-primary h-6 w-6' />
							Browse By Category
						</h2>
					</div>
					<Badge className='border-border bg-surface text-foreground'>
						<BookOpenText className='h-3.5 w-3.5' />
						{books.length} Books
					</Badge>
				</div>

				{groupedShelves.map(group => (
					<section key={group.category.id} className='space-y-3'>
						<div className='flex items-center justify-between gap-3'>
							<div>
								<h3 className='text-foreground text-lg font-bold'>
									{group.category.name}
								</h3>
								<p className='text-muted-foreground text-sm'>
									{group.items.length} titles
								</p>
							</div>
						</div>
						<div className='px-10'>
							<Carousel opts={{ align: 'start', dragFree: true }} className='w-full'>
								<CarouselContent className='px-5'>
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
								<CarouselPrevious className='border-border bg-card/80 text-foreground hover:bg-surface -left-7' />
								<CarouselNext className='border-border bg-card/80 text-foreground hover:bg-surface -right-7' />
							</Carousel>
						</div>
					</section>
				))}
			</section>
		</div>
	)
}
