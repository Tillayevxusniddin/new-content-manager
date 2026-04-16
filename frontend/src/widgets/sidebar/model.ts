import { BookOpenText, Gauge, Layers, LayoutGrid, Settings } from 'lucide-react'
import type { ComponentType } from 'react'

import { useAuth } from '@/shared/hooks/use-auth'

type Item = {
	to: string
	label: string
	icon: ComponentType<{ className?: string }>
	end?: boolean
}

const USER_ITEMS: Item[] = [
	{ to: '/', label: 'ホーム', icon: LayoutGrid, end: true },
	{ to: '/books', label: 'ライブラリ', icon: BookOpenText }
]

const ADMIN_ITEMS: Item[] = [
	{ to: '/admin', label: 'ダッシュボード', icon: Gauge, end: true },
	{ to: '/admin/books', label: '書籍管理', icon: BookOpenText },
	{ to: '/admin/categories', label: 'カテゴリ管理', icon: Layers },
	{ to: '/admin/settings', label: '設定', icon: Settings }
]

export const useSidebarModel = () => {
	const { user } = useAuth()
	const isAdmin = user?.role === 'admin'
	return { isAdmin, userItems: USER_ITEMS, adminItems: ADMIN_ITEMS }
}
