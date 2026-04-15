'use client'
import { BookOpenText, LogOut, Menu, PanelLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { ThemeToggle } from '@/features/theme-toggle/ui/toggle'

import { NavLink } from '@/entities/navlink'

import { Button, Dialog, DialogContent, DialogTitle } from '@/shared/ui'

import { useHeaderModel } from '../model'
import { useSidebarModel } from '@/widgets/sidebar/model'

export const Header = () => {
	const model = useHeaderModel()
	const { user, logout } = model
	const { isAdmin, userItems, adminItems } = useSidebarModel()
	const [mobileOpen, setMobileOpen] = useState(false)

	const closeMobile = () => setMobileOpen(false)

	return (
		<header className='fixed top-0 right-0 left-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl'>
			<div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6'>
				<div className='flex items-center gap-3'>
					<Button
						variant='ghost'
						size='icon'
						className='text-foreground/90 md:hidden'
						onClick={() => setMobileOpen(true)}
					>
						<Menu className='h-5 w-5' />
					</Button>

					<Link href='/' className='flex items-center gap-3 font-bold text-zinc-100'>
						<span className='text-primary flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900'>
							<BookOpenText className='h-5 w-5' />
						</span>
						<div className='leading-tight'>
							<div className='text-sm md:text-base'>Book Summary App</div>
							<div className='hidden text-xs font-normal text-zinc-400 md:block'>
								社員向け要約プラットフォーム
							</div>
						</div>
					</Link>
				</div>

				<div className='flex items-center gap-2'>
					<ThemeToggle />
					{user ? (
						<Button size='sm' variant='outline' onClick={logout} className='hidden sm:inline-flex'>
							<LogOut className='h-4 w-4' />
							ログアウト
						</Button>
					) : (
						<Link
							href='/login'
							className='bg-primary text-primary-foreground hidden h-9 items-center justify-center rounded-xl px-4 text-sm font-medium transition-opacity hover:opacity-90 sm:inline-flex'
						>
							サインイン
						</Link>
					)}
				</div>
			</div>

			<Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
				<DialogContent
					showCloseButton={false}
					className='left-0 top-0 h-dvh w-[min(86vw,22rem)] max-w-none translate-x-0 translate-y-0 rounded-r-[2rem] rounded-l-none border-zinc-800 bg-zinc-950/95 p-0 text-white'
				>
					<DialogTitle className='sr-only'>モバイルナビゲーションメニュー</DialogTitle>
					<div className='flex h-full flex-col'>
						<div className='flex items-center justify-between border-b border-zinc-800 px-5 py-4'>
							<div className='flex items-center gap-3'>
								<span className='text-primary flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900'>
									<PanelLeft className='h-5 w-5' />
								</span>
								<div className='font-semibold'>Navigation</div>
							</div>
							<Button variant='ghost' size='icon' onClick={closeMobile} className='text-white'>
								<X className='h-5 w-5' />
							</Button>
						</div>

						<div className='space-y-4 px-5 py-5'>
							<div className='grid gap-2'>
								{isAdmin ? (
									adminItems.map(item => (
										<NavLink
											key={item.to}
											href={item.to}
											className='flex items-center gap-3 rounded-2xl px-4 py-3 text-base'
											onClick={closeMobile}
										>
											<item.icon className='h-4 w-4' />
											<span>{item.label}</span>
										</NavLink>
									))
								) : (
									userItems.map(item => (
										<NavLink
											key={item.to}
											href={item.to}
											className='flex items-center gap-3 rounded-2xl px-4 py-3 text-base'
											onClick={closeMobile}
										>
											<item.icon className='h-4 w-4' />
											<span>{item.label}</span>
										</NavLink>
									))
								)}
							</div>

							<div className='grid gap-3 pt-2'>
								<Link
									href='/login'
									onClick={closeMobile}
									className='bg-primary text-primary-foreground inline-flex h-11 items-center justify-center rounded-2xl px-4 font-medium'
								>
									ログイン画面
								</Link>
								{user ? (
									<Button variant='outline' onClick={() => { logout(); closeMobile() }} className='h-11 justify-start rounded-2xl border-zinc-700 bg-zinc-900 text-white'>
										<LogOut className='h-4 w-4' />
										ログアウト
									</Button>
								) : null}
							</div>

							<div className='mt-auto border-t border-zinc-800 px-5 py-4'>
								<div className='flex items-center justify-between'>
									<div className='text-white/60 text-xs uppercase tracking-[0.24em]'>
										Theme
									</div>
									<ThemeToggle />
								</div>
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</header>
	)
}
