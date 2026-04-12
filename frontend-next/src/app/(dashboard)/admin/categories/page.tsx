'use client'
import { FolderOpen } from 'lucide-react'
import { useEffect, useState } from 'react'

import { categories } from '@/shared/lib/mock-data'
import { Button } from '@/shared/ui'
import { Dialog, DialogContent } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export function CategoryFormDialog({
	open,
	onClose,
	name
}: {
	open: boolean
	onClose: () => void
	name?: string
}) {
	const [value, setValue] = useState(name ?? '')

	useEffect(() => {
		if (!open) return
		setValue(name ?? '')
	}, [open, name])

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-lg'>
				<div className='space-y-2'>
					<Label>カテゴリ名</Label>
					<Input
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder='例: マネジメント'
					/>
				</div>
				<div className='mt-6 flex justify-end gap-3'>
					<Button variant='outline' onClick={onClose}>
						キャンセル
					</Button>
					<Button onClick={onClose}>保存</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default function page() {
	const [open, setOpen] = useState(false)

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between gap-4'>
				<div>
					<h1 className='text-foreground text-2xl font-black'>カテゴリ管理</h1>
					<p className='text-muted-foreground text-sm'>
						カテゴリの作成と編集を行います。
					</p>
				</div>
				<Button onClick={() => setOpen(true)}>カテゴリ追加</Button>
			</div>
			<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
				{categories.map(category => (
					<div
						key={category.id}
						className='border-glass-border bg-card/70 rounded-3xl border p-5 backdrop-blur-xl'
					>
						<div
							className={`inline-flex rounded-2xl bg-linear-to-br px-3 py-2 ${category.accent}`}
						>
							<FolderOpen className='h-5 w-5' />
						</div>
						<div className='text-foreground mt-4 text-lg font-semibold'>
							{category.name}
						</div>
						<div className='text-muted-foreground text-sm'>
							{category.count} 件の要約
						</div>
					</div>
				))}
			</div>
			<CategoryFormDialog open={open} onClose={() => setOpen(false)} />
		</div>
	)
}
