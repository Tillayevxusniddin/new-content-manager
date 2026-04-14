'use client'
import { ArrowRight, BookOpen, Clock3, FolderOpen, Users } from 'lucide-react'
import Link from 'next/link'

import { BookTable } from '@/widgets/books-table'

import { DialogCreateBook } from '@/features/dialog-create-book/ui/dialog-create-book'

import { books, dashboardStats } from '@/shared/lib/mock-data'
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

const iconMap = { BookOpen, FolderOpen, Users, Clock3 }

export default function Page() {
	const latestBooks = books.slice(0, 3)

	return (
		<div className='space-y-8'>
			<section className='relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(2,6,23,0.95),rgba(15,23,42,0.88),rgba(59,130,246,0.16))] p-6 md:p-8'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_22%)]' />
				<div className='relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
					<div className='space-y-3 text-white'>
						<Badge className='border-white/10 bg-white/10 text-white/85'>
							Dashboard
						</Badge>
						<h1 className='text-4xl leading-none font-black tracking-tight md:text-5xl'>
							管理画面も、読みたくなる UI に。
						</h1>
						<p className='max-w-2xl text-sm leading-7 text-white/70 md:text-base'>
							統計、最新コンテンツ、作成導線をまとめて見せる高級感のある管理ビューに変更しました。
						</p>
					</div>
					<DialogCreateBook trigger={<Button size='lg'><span>新規追加</span><ArrowRight className='h-4 w-4' /></Button>} />
				</div>
			</section>

			<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{dashboardStats.map(stat => {
					const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? BookOpen
					return (
						<Card key={stat.label} className='border-white/10 bg-white/5 backdrop-blur-xl'>
							<CardHeader className='flex items-center justify-between'>
								<div className='rounded-2xl bg-white/8 p-3 text-white'>
									<Icon className='h-5 w-5 text-white/90' />
								</div>
								<span className='rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300'>
									{stat.change}
								</span>
							</CardHeader>
							<CardContent>
								<div className='text-foreground text-3xl font-black'>{stat.value}</div>
								<div className='text-muted-foreground text-sm'>{stat.label}</div>
							</CardContent>
						</Card>
					)
				})}
			</div>

			<section className='grid gap-4 lg:grid-cols-[1fr_360px]'>
				<div className='space-y-4'>
					<div className='flex items-center justify-between gap-3'>
						<div>
							<h2 className='text-foreground text-lg font-bold'>最新の要約</h2>
							<p className='text-muted-foreground text-sm'>
								最近追加されたコンテンツを先に確認できます。
							</p>
						</div>
						<Link href='/books' className='text-primary flex items-center gap-1 text-sm font-medium'>
							一覧を見る <ArrowRight className='h-4 w-4' />
						</Link>
					</div>
					<div className='grid gap-3'>
						{latestBooks.map(book => (
							<div key={book.id} className='border-white/10 bg-white/5 rounded-[1.75rem] border p-4 backdrop-blur-xl'>
								<div className='flex items-start justify-between gap-4'>
									<div>
										<div className='text-xs tracking-[0.24em] text-white/50 uppercase'>{book.categoryName}</div>
										<div className='mt-1 text-lg font-bold text-white'>{book.title}</div>
										<div className='text-white/60 mt-1 text-sm'>{book.author}</div>
									</div>
									<Badge className='border-white/10 bg-black/20 text-white/85'>{book.progress}%</Badge>
								</div>
							</div>
						))}
					</div>
				</div>

				<Card className='border-white/10 bg-white/5 backdrop-blur-xl'>
					<CardHeader>
						<div className='flex items-center justify-between gap-3'>
							<div>
								<CardTitle className='text-white'>管理メモ</CardTitle>
								<p className='text-muted-foreground text-sm'>
									この画面はモックデータに基づいて表示しています。
								</p>
							</div>
							<div className='text-primary rounded-2xl bg-white/5 p-3'>
								<FolderOpen className='h-5 w-5' />
							</div>
						</div>
					</CardHeader>
					<CardContent className='space-y-3'>
						<div className='rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/72'>
							・新規作成ダイアログは FSD の feature 層から呼び出します。
						</div>
						<div className='rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/72'>
							・一覧は今後 API へ差し替えやすいように mock data で構成しています。
						</div>
					</CardContent>
				</Card>
			</section>

			<BookTable />
		</div>
	)
}
