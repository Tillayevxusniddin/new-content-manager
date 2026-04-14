'use client'
import { FolderOpen } from 'lucide-react'
import { useState } from 'react'

import { DialogCreateCategory } from '@/features/dialog-create-category'

import { categories } from '@/shared/lib/mock-data'
import { Button } from '@/shared/ui'

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
				<DialogCreateCategory trigger={<Button>カテゴリ追加</Button>} />
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
		</div>
	)
}
