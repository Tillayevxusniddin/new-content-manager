'use client'
import { NavLink } from '@/entities/navlink'

import { useSidebarModel } from '../model'

export const Sidebar = () => {
	const { navItems, roleLabel } = useSidebarModel()

	return (
		<nav className='space-y-3'>
			<div className='border-glass-border/70 bg-card/70 rounded-xl border px-3 py-2'>
				<p className='text-muted-foreground text-[11px] font-semibold tracking-[0.14em]'>
					{roleLabel}
				</p>
			</div>
			{navItems.map(item => (
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
