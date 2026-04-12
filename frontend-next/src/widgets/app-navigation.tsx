import { BookOpenText, Gauge, Layers, LayoutGrid, Settings } from 'lucide-react'
import type { ComponentType } from 'react'

import { NavLink } from '@/entities/navlink'

type Item = {
	to: string
	label: string
	icon: ComponentType<{ className?: string }>
	end?: boolean
}

const USER_ITEMS: Item[] = [
	{ to: '/', label: 'ホーム', icon: LayoutGrid, end: true },
	{ to: '/books', label: '書籍一覧', icon: BookOpenText }
]

const ADMIN_ITEMS: Item[] = [
	{ to: '/admin', label: 'ダッシュボード', icon: Gauge, end: true },
	{ to: '/admin/books', label: '書籍管理', icon: BookOpenText },
	{ to: '/admin/categories', label: 'カテゴリ管理', icon: Layers },
	{ to: '/admin/settings', label: '設定', icon: Settings }
]

export default function AppNavigation() {
	// const { user } = useAuth()
	// if (!user) return null

	// const items = user.role === 'admin' ? ADMIN_ITEMS : USER_ITEMS
	const items = ADMIN_ITEMS
	// const roleLabel = user.role === 'admin' ? '管理者メニュー' : 'ユーザーメニュー'

	return (
		<nav className='space-y-3'>
			<div className='border-glass-border/70 bg-card/70 rounded-xl border px-3 py-2'>
				<p className='text-muted-foreground text-[11px] font-semibold tracking-[0.14em]'>
					管理者メニュー
				</p>
			</div>
			{items.map(item => (
				<NavLink key={item.to} href={item.to}>
					<span className='flex items-center gap-2.5'>
						<item.icon className='h-4 w-4' />
						<span>{item.label}</span>
					</span>
				</NavLink>
			))}
		</nav>
	)
}
