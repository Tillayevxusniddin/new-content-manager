'use client'
import { NavLink } from '@/entities/navlink'

import { useSidebarModel } from '../model'

export const Sidebar = () => {
	const { isAdmin, userItems, adminItems } = useSidebarModel()

	return (
		<aside className='border-border bg-card sticky top-28 hidden h-fit min-w-60 rounded-[2rem] border p-4 lg:block'>
			<div className='space-y-2'>
				{isAdmin
					? adminItems.map(item => (
							<NavLink
								key={item.to}
								href={item.to}
								className='flex items-center gap-3'
							>
								<item.icon className='h-4 w-4' />

								<span>{item.label}</span>
							</NavLink>
						))
					: userItems.map(item => (
							<NavLink
								key={item.to}
								href={item.to}
								className='flex items-center gap-3'
							>
								<item.icon className='h-4 w-4' />

								<span>{item.label}</span>
							</NavLink>
						))}
			</div>
		</aside>
	)
}
