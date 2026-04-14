'use client'
import { BookOpen, Clock3, FolderOpen, Users } from 'lucide-react'

import { BookTable } from '@/widgets/book-table'

import { DialogCreateBook } from '@/features/dialog-create-book/ui/dialog-create-book'

import { dashboardStats } from '@/shared/lib/mock-data'
import { Button } from '@/shared/ui'

const iconMap = { BookOpen, FolderOpen, Users, Clock3 }

export default function Page() {
	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between gap-4'>
				<div>
					<h1 className='text-foreground text-2xl font-black'>ダッシュボード</h1>
					<p className='text-muted-foreground text-sm'>書籍要約コンテンツを管理</p>
				</div>
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

			<BookTable />
		</div>
	)
}
