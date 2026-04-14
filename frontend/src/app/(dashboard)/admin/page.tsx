'use client'
import { BookOpen, Clock3, FolderOpen, Users } from 'lucide-react'

import { BookTable } from '@/widgets/books-table'

import { DialogCreateBook } from '@/features/dialog-create-book/ui/dialog-create-book'

import { dashboardStats } from '@/shared/lib/mock-data'
import { Button, Card, CardContent, CardHeader } from '@/shared/ui'

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

			<div className='grid gap-4 px-1 sm:grid-cols-2 xl:grid-cols-4'>
				{dashboardStats.map(stat => {
					const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? BookOpen
					return (
						<Card key={stat.label} className=''>
							<CardHeader className='flex items-center justify-between'>
								<div className='text-primary rounded-full bg-white/5 p-3'>
									<Icon className='h-5 w-5' />
								</div>
								<span className='text-xs font-semibold text-emerald-400'>
									{stat.change}
								</span>
							</CardHeader>
							<CardContent>
								<div className='text-foreground text-3xl font-black'>
									{stat.value}
								</div>
								<div className='text-muted-foreground text-sm'>{stat.label}</div>
							</CardContent>
						</Card>
					)
				})}
			</div>

			<BookTable />
		</div>
	)
}
