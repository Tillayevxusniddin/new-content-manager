'use client'
import { BookOpenText, LogOut, Menu, PanelLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { useSidebarModel } from '@/widgets/sidebar/model'

import { ThemeToggle } from '@/features/theme-toggle/ui/toggle'

import { NavLink } from '@/entities/navlink'

import { Button, Dialog, DialogContent, DialogTitle } from '@/shared/ui'

import { useHeaderModel } from '../model'

export const Header = () => {
	const model = useHeaderModel()
	const { user, logout } = model
	const { isAdmin, userItems, adminItems } = useSidebarModel()
	const [mobileOpen, setMobileOpen] = useState(false)

	const closeMobile = () => setMobileOpen(false)

	return (
		<header className='bg-header border-border fixed top-0 right-0 left-0 z-40 border-b backdrop-blur-xl'>
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

					<Link href='/' className='text-foreground flex items-center gap-3 font-bold'>
						<span className='text-primary bg-card border-border flex h-11 w-11 items-center justify-center rounded-2xl border'>
							<BookOpenText className='h-5 w-5' />
						</span>
						<div className='leading-tight'>
							<div className='text-foreground text-sm md:text-base'>
								Book Summary App
							</div>
							<div className='text-muted-foreground hidden text-xs font-normal md:block'>
								社員向け要約プラットフォーム
							</div>
						</div>
					</Link>
				</div>

				<div className='flex items-center gap-2'>
					<ThemeToggle />
					{user ? (
						<Button
							size='sm'
							variant='outline'
							onClick={logout}
							className='hidden sm:inline-flex'
						>
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
					className='border-border bg-card/95 text-foreground top-0 left-0 h-dvh w-[min(86vw,22rem)] max-w-none translate-x-0 translate-y-0 rounded-l-none rounded-r-[2rem] p-0'
				>
					<DialogTitle className='sr-only'>モバイルナビゲーションメニュー</DialogTitle>
					<div className='flex h-full flex-col'>
						<div className='border-border flex items-center justify-between border-b px-5 py-4'>
							<div className='flex items-center gap-3'>
								<span className='text-primary bg-surface border-border flex h-10 w-10 items-center justify-center rounded-2xl border'>
									<PanelLeft className='h-5 w-5' />
								</span>
								<div className='font-semibold'>Navigation</div>
							</div>
							<Button
								variant='ghost'
								size='icon'
								onClick={closeMobile}
								className='text-foreground'
							>
								<X className='h-5 w-5' />
							</Button>
						</div>

						<div className='space-y-4 px-5 py-5'>
							<div className='grid gap-2'>
								{isAdmin
									? adminItems.map(item => (
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
									: userItems.map(item => (
											<NavLink
												key={item.to}
												href={item.to}
												className='flex items-center gap-3 rounded-2xl px-4 py-3 text-base'
												onClick={closeMobile}
											>
												<item.icon className='h-4 w-4' />
												<span>{item.label}</span>
											</NavLink>
										))}
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
									<Button
										variant='outline'
										onClick={() => {
											logout()
											closeMobile()
										}}
										className='bg-surface text-foreground border-border h-11 justify-start rounded-2xl'
									>
										<LogOut className='h-4 w-4' />
										ログアウト
									</Button>
								) : null}
							</div>

							<div className='border-border mt-auto border-t px-5 py-4'>
								<div className='flex items-center justify-between'>
									<div className='text-muted-foreground text-xs tracking-[0.24em] uppercase'>
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
