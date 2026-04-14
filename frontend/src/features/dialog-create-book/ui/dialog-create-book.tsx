'use client'
import { Upload } from 'lucide-react'

import { categories } from '@/shared/lib/mock-data'
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea
} from '@/shared/ui'

export const DialogCreateBook: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='max-h-lg min-w-2xl'>
				<DialogHeader>
					<DialogTitle>新しい書籍要約を追加</DialogTitle>
				</DialogHeader>
				<ScrollArea className='h-110 rounded-md px-3'>
					<div className='px-1'>
						<div className='grid gap-4 md:grid-cols-2'>
							<div className='space-y-2'>
								<Label>タイトル</Label>
								<Input placeholder='書籍タイトル' />
							</div>
							<div className='space-y-2'>
								<Label>著者</Label>
								<Input placeholder='著者名' />
							</div>
							<div className='space-y-2 md:col-span-2'>
								<Label>カテゴリ</Label>
								<Select>
									<SelectTrigger className={'w-full'}>
										<SelectValue placeholder='カテゴリを選択' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='as'>カテゴリを選択</SelectItem>
										{categories.map(category => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2 md:col-span-2'>
								<Label>説明</Label>
								<Textarea placeholder='書籍の説明...' />
							</div>
						</div>

						<div className='mt-4 grid gap-3 md:grid-cols-3'>
							{['カバー画像', '音声ファイル', '動画ファイル'].map(label => (
								<button
									key={label}
									className='border-glass-border text-muted-foreground hover:border-primary/40 hover:text-foreground flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed bg-white/5 px-4 py-5 text-sm transition-colors'
								>
									<Upload className='h-5 w-5' />
									{label}
								</button>
							))}
						</div>

						<div className='mt-5 space-y-2'>
							<Label>テキスト要約</Label>
							<Textarea
								// defaultValue={book?.textContent ?? ''}
								placeholder='Markdown 対応のテキスト要約を入力'
								className='min-h-40'
							/>
						</div>
					</div>
				</ScrollArea>
				<div className='flex justify-end gap-3'>
					<DialogClose asChild>
						<Button variant='outline'>キャンセル</Button>
					</DialogClose>
					<Button>保存</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
