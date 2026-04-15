import { format } from 'date-fns'
import { Edit3, MoreHorizontal, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { books } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { Badge, Button, Progress } from '@/shared/ui'

import { Filter } from './filter'

import { bookTableModel } from '../model'

export const Table: React.FC = () => {
	const model = bookTableModel()
	const { deleteBook } = model

	return (
		<>
			<Filter model={model} />
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
											<Progress
												value={book.progress}
												className='h-2 flex-1'
											/>
											<span className='text-muted-foreground w-10 text-right text-xs'>
												{book.progress}%
											</span>
										</div>
									</td>
									<td className='text-muted-foreground px-4 py-4'>
										{format(book.updatedAt, 'yyyy/MM/dd')}
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
												onClick={() => deleteBook(book.id)}
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
		</>
	)
}
