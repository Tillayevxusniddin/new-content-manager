'use client'
import { BookOpenText, Sparkles } from 'lucide-react'

import { NavLink } from '@/entities/navlink'

import { Badge } from '@/shared/ui'

import { useSidebarModel } from '../model'

export const Sidebar = () => {
	const { navItems, roleLabel } = useSidebarModel()

	return (
		<aside className='border-glass-border/70 bg-background/60 sticky top-24 space-y-5 rounded-[2rem] border p-4 backdrop-blur-2xl'>
			<div className='rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(168,85,247,0.18))] p-4 text-white'>
				<div className='flex items-center gap-3'>
					<div className='bg-white/10 flex h-11 w-11 items-center justify-center rounded-2xl'>
						<BookOpenText className='h-5 w-5' />
					</div>
					<div>
						<div className='text-sm font-semibold'>Book Summary App</div>
						<div className='text-white/65 text-xs'>読む・聴く・見るを 1 か所に。</div>
					</div>
				</div>
				<div className='mt-4 flex items-center justify-between'>
					<Badge className='bg-black/20 text-white/90'>
						<Sparkles className='h-3.5 w-3.5' />
						{roleLabel}
					</Badge>
					<span className='text-white/60 text-xs'>Mock data</span>
				</div>
			</div>

			<div className='space-y-2'>
				<p className='text-muted-foreground px-2 text-[11px] font-semibold tracking-[0.18em] uppercase'>
					Navigation
				</p>
				{navItems.map(item => (
					<NavLink key={item.to} href={item.to} className='flex items-center gap-3'>
						<item.icon className='h-4 w-4' />
						<span>{item.label}</span>
					</NavLink>
				))}
			</div>
		</aside>
	)
}
