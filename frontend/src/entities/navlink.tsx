'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/shared/lib/utils'

interface NavLinkProps {
	href: string
	active?: boolean
	children: React.ReactNode
	className?: string
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function NavLink({ href, active, children, className, onClick }: NavLinkProps) {
	const pathname = usePathname()
	const isActive = active !== undefined ? active : pathname === href
	return (
		<Link
			href={href}
			onClick={onClick}
			className={cn(
				'block rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium transition-all',
				isActive
					? 'border-primary/25 bg-primary/15 text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.15)_inset]'
					: 'text-muted-foreground hover:border-glass-border hover:bg-surface-hover hover:text-foreground',
				className
			)}
		>
			{children}
		</Link>
	)
}