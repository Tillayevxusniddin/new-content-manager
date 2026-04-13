'use client'
import {
	BookOpen,
	Clock3,
	Edit3,
	FolderOpen,
	MoreHorizontal,
	Trash2,
	Upload,
	Users,
	X
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { DialogCreateBook } from '@/features/dialog-create-book/ui/dialog-create-book'

import { BookSummary, books, categories, dashboardStats } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { Badge } from '@/shared/ui/badge'
import { Dialog, DialogContent } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'

import { Progress } from '../page'

export function formatDate(date: string | Date) {
	return new Intl.DateTimeFormat('ja-JP', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(new Date(date))
}

const iconMap = { BookOpen, FolderOpen, Users, Clock3 }

interface Props {
	book?: BookSummary | null
	open: boolean
	onClose: () => void
}

export function BookFormDialog({ book, open, onClose }: Props) {
	const [title, setTitle] = useState(book?.title ?? '')
	const [author, setAuthor] = useState(book?.author ?? '')
	const [categoryId, setCategoryId] = useState(book?.categoryId ?? categories[0]?.id ?? '')
	const [description, setDescription] = useState(book?.description ?? '')

	const heading = useMemo(() => (book ? '書籍要約を編集' : '新しい書籍要約を追加'), [book])

	useEffect(() => {
		if (!open) return
		setTitle(book?.title ?? '')
		setAuthor(book?.author ?? '')
		setCategoryId(book?.categoryId ?? categories[0]?.id ?? '')
		setDescription(book?.description ?? '')
	}, [open, book])

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='className="max-w-2xl"'>
				<div>
					<div className='mb-5 flex items-center justify-between'>
						<h3 className='text-foreground text-lg font-bold'>{heading}</h3>
						<Button variant='ghost' size='icon' onClick={onClose}>
							<X className='h-4 w-4' />
						</Button>
					</div>

					<div className='grid gap-4 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label>タイトル</Label>
							<Input
								value={title}
								onChange={e => setTitle(e.target.value)}
								placeholder='書籍タイトル'
							/>
						</div>
						<div className='space-y-2'>
							<Label>著者</Label>
							<Input
								value={author}
								onChange={e => setAuthor(e.target.value)}
								placeholder='著者名'
							/>
						</div>
						<div className='space-y-2 md:col-span-2'>
							<Label>カテゴリ</Label>
							<Select value={categoryId} onValueChange={e => setCategoryId(e)}>
								{categories.map(category => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</Select>
						</div>
						<div className='space-y-2 md:col-span-2'>
							<Label>説明</Label>
							<Textarea
								value={description}
								onChange={e => setDescription(e.target.value)}
								placeholder='書籍の説明...'
							/>
						</div>
					</div>

					<div className='mt-4 grid gap-3 md:grid-cols-3'>
						{['カバー画像', '音声ファイル', '動画ファイル'].map(label => (
							<button
								key={label}
								className='border-glass-border text-muted-foreground hover:border-primary/40 hover:text-foreground flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-white/5 px-4 py-5 text-sm transition-colors'
							>
								<Upload className='h-5 w-5' />
								{label}
							</button>
						))}
					</div>

					<div className='border-glass-border mt-4 rounded-2xl border bg-white/5 p-4'>
						<div className='text-muted-foreground mb-2 text-sm font-medium'>
							テキスト要約
						</div>
						<Textarea
							defaultValue={book?.textContent ?? ''}
							placeholder='Markdown 対応のテキスト要約を入力'
							className='min-h-40'
						/>
					</div>

					<div className='mt-6 flex justify-end gap-3'>
						<Button variant='outline' onClick={onClose}>
							キャンセル
						</Button>
						<Button onClick={onClose}>保存</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export function BookListTable({
	books,
	onDelete
}: {
	books: BookSummary[]
	onDelete?: (bookId: string) => void
}) {
	return (
		<div className='border-glass-border bg-card/70 overflow-hidden rounded-xl border backdrop-blur-xl'>
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y divide-white/5 text-left text-sm'>
					<thead className='text-muted-foreground bg-white/5 text-[11px] tracking-[0.08em] uppercase'>
						<tr>
							<th className='px-4 py-4 whitespace-nowrap'>書籍</th>
							<th className='px-4 py-4 whitespace-nowrap'>カテゴリ</th>
							<th className='px-4 py-4 whitespace-nowrap'>メディア</th>
							<th className='px-4 py-4 whitespace-nowrap'>進捗</th>
							<th className='px-4 py-4 whitespace-nowrap'>更新日</th>
							<th className='px-4 py-4 text-right whitespace-nowrap'>操作</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-white/5'>
						{books.map(book => (
							<tr
								key={book.id}
								className='hover:bg-surface-hover/70 transition-colors'
							>
								<td className='px-4 py-4'>
									<div className='flex items-center gap-3'>
										<div
											className={cn(
												'flex h-14 w-10 items-center justify-center rounded-xl bg-linear-to-br text-[10px] font-black text-white shadow-lg',
												book.coverTone
											)}
										>
											{book.title.slice(0, 4)}
										</div>
										<div>
											<div className='text-foreground font-semibold'>
												{book.title}
											</div>
											<div className='text-muted-foreground text-xs'>
												{book.author}
											</div>
										</div>
									</div>
								</td>
								<td className='px-4 py-4'>
									<Badge className='bg-white/5 text-white/75'>
										{book.categoryName}
									</Badge>
								</td>
								<td className='text-muted-foreground px-4 py-4'>
									{[
										book.hasText && 'Text',
										book.hasAudio && 'Audio',
										book.hasVideo && 'Video'
									]
										.filter(Boolean)
										.join(' / ')}
								</td>
								<td className='px-4 py-4'>
									<div className='flex items-center gap-3'>
										<Progress value={book.progress} className='h-2 flex-1' />
										<span className='text-muted-foreground w-10 text-right text-xs'>
											{book.progress}%
										</span>
									</div>
								</td>
								<td className='text-muted-foreground px-4 py-4'>
									{formatDate(book.updatedAt)}
								</td>
								<td className='px-4 py-4'>
									<div className='flex items-center justify-end gap-2'>
										<Link href={`/admin/books/${book.id}`}>
											<Button size='icon' variant='ghost'>
												<Edit3 className='h-4 w-4' />
											</Button>
										</Link>
										<Button size='icon' variant='ghost'>
											<MoreHorizontal className='h-4 w-4' />
										</Button>
										<Button
											size='icon'
											variant='ghost'
											onClick={() => onDelete?.(book.id)}
										>
											<Trash2 className='h-4 w-4 text-red-400' />
										</Button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default function Page() {
	const [query, setQuery] = useState('')
	const [categoryId, setCategoryId] = useState('all')
	const [dialogOpen, setDialogOpen] = useState(false)

	const filtered = useMemo(
		() =>
			books.filter(book => {
				const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase())
				const matchesCategory = categoryId === 'all' || book.categoryId === categoryId
				return matchesQuery && matchesCategory
			}),
		[categoryId, query]
	)

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between gap-4'>
				<div>
					<h1 className='text-foreground text-2xl font-black'>ダッシュボード</h1>
					<p className='text-muted-foreground text-sm'>書籍要約コンテンツを管理</p>
				</div>
				<Button onClick={() => setDialogOpen(true)}>新規追加</Button>
				<DialogCreateBook trigger={<Button>新規追加</Button>} />
			</div>

			<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				{dashboardStats.map(stat => {
					const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? BookOpen
					return (
						<div
							key={stat.label}
							className='border-glass-border bg-card/70 rounded-4xl border p-5 backdrop-blur-xl'
						>
							<div className='mb-4 flex items-center justify-between'>
								<div className='text-primary rounded-2xl bg-white/5 p-3'>
									<Icon className='h-5 w-5' />
								</div>
								<span className='text-xs font-semibold text-emerald-400'>
									{stat.change}
								</span>
							</div>
							<div className='text-foreground text-3xl font-black'>{stat.value}</div>
							<div className='text-muted-foreground text-sm'>{stat.label}</div>
						</div>
					)
				})}
			</div>

			<div className='grid gap-3 md:grid-cols-[1fr_220px]'>
				<Input
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder='書籍を検索...'
				/>
				<Select value={categoryId} onValueChange={e => setCategoryId(e)}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='カテゴリ' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>すべて</SelectItem>
						{categories.map(category => (
							<SelectItem key={category.id} value={category.id}>
								{category.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<BookListTable books={filtered} onDelete={() => undefined} />

			<BookFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
		</div>
	)
}
