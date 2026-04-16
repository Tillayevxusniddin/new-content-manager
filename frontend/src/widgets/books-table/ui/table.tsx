import { format } from 'date-fns'
import { Edit3, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { DialogUpdateBook } from '@/features/dialog-update-book'
import { DialogWarning } from '@/features/dialog-warning'

import { books } from '@/shared/lib/mock-data'
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
				{/* ── DESKTOP TABLE (md va undan katta) ── */}
				<div className='hidden overflow-x-auto md:block'>
					<table className='w-full divide-border text-left text-sm'>
						<thead className='text-muted-foreground bg-surface w-full text-[11px] tracking-[0.08em] uppercase'>
							<tr>
								<th className='px-4 py-4 whitespace-nowrap'>書籍</th>
								<th className='px-4 py-4 whitespace-nowrap'>カテゴリ</th>
								<th className='px-4 py-4 whitespace-nowrap'>メディア</th>
								<th className='px-4 py-4 whitespace-nowrap'>進捗</th>
								<th className='px-4 py-4 whitespace-nowrap'>更新日</th>
								<th className='px-4 py-4 text-right whitespace-nowrap'>操作</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-border'>
							{books.map(book => (
								<tr
									key={book.id}
									className='hover:bg-surface-hover/70 transition-colors'
								>
									<td className='px-4 py-4'>
										<div className='flex items-center gap-3'>
											<Image
												src={book.imageUrl}
												alt={book.title}
												width={60}
												height={80}
											/>
											<div>
												<div className='text-foreground hover:text-primary font-semibold hover:underline'>
													<Link href={`/admin/books/${book.id}`}>
														{book.title}
													</Link>
												</div>
												<div className='text-muted-foreground text-xs'>
													{book.author}
												</div>
											</div>
										</div>
									</td>
									<td className='px-4 py-4'>
										<Badge>{book.categoryName}</Badge>
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
											{/* <Link href={`/admin/books/${book.id}`}> */}
											<DialogUpdateBook
												trigger={
													<Button size='icon' variant='ghost'>
														<Edit3 className='h-4 w-4' />
													</Button>
												}
											/>
											{/* </Link> */}
											{/* <Button size='icon' variant='ghost'>
												<MoreHorizontal className='h-4 w-4' />
											</Button> */}
											<DialogWarning
												isLoading={false}
												onConfirm={() => {}}
												trigger={
													<Button
														size='icon'
														variant='ghost'
														className='h-8 w-8'
													>
														<Trash2 className='h-3.5 w-3.5 text-red-400' />
													</Button>
												}
											/>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* ── MOBILE CARDS (faqat md dan kichik) ── */}
				<div className='divide-y divide-border md:hidden'>
					{books.map(book => (
						<div
							key={book.id}
							className='hover:bg-surface-hover/70 flex gap-3 p-4 transition-colors'
						>
							{/* Cover */}
							<div className='shrink-0'>
								<Image
									src={book.imageUrl}
									alt={book.title}
									width={52}
									height={70}
									className='rounded-lg object-cover'
								/>
							</div>

							{/* Content */}
							<div className='min-w-0 flex-1 space-y-2'>
								{/* Title + actions */}
								<div className='flex items-start justify-between gap-2'>
									<div className='min-w-0'>
										<p className='text-foreground truncate font-semibold'>
											{book.title}
										</p>
										<p className='text-muted-foreground text-xs'>
											{book.author}
										</p>
									</div>
									<div className='flex shrink-0 items-center gap-1'>
										<DialogUpdateBook
											trigger={
												<Button size='icon' variant='ghost'>
													<Edit3 className='h-3.5 w-3.5' />
												</Button>
											}
										/>
										{/* <Button size='icon' variant='ghost' className='h-8 w-8'>
											<MoreHorizontal className='h-3.5 w-3.5' />
										</Button> */}
										<DialogWarning
											isLoading={false}
											onConfirm={() => {}}
											trigger={
												<Button
													size='icon'
													variant='ghost'
													className='h-8 w-8'
												>
													<Trash2 className='h-3.5 w-3.5 text-red-400' />
												</Button>
											}
										/>
									</div>
								</div>

								{/* Category + Media */}
								<div className='flex flex-wrap items-center gap-2'>
									<Badge>{book.categoryName}</Badge>
									<span className='text-muted-foreground text-xs'>
										{[
											book.hasText && 'Text',
											book.hasAudio && 'Audio',
											book.hasVideo && 'Video'
										]
											.filter(Boolean)
											.join(' / ')}
									</span>
								</div>

								{/* Progress */}
								<div className='flex items-center gap-2'>
									<Progress value={book.progress} className='h-1.5 flex-1' />
									<span className='text-muted-foreground w-8 text-right text-xs'>
										{book.progress}%
									</span>
								</div>

								{/* Date */}
								<p className='text-muted-foreground text-xs'>
									{format(book.updatedAt, 'yyyy/MM/dd')}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
