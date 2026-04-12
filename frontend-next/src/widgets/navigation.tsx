import { BookOpenText } from 'lucide-react'
import Link from 'next/link'

import { ThemeToggle } from '@/widgets/theme-toggle'

import { NavLink } from '@/entities/navlink'

import { Button } from '@/shared/ui'

export function Navbar() {
	const isAdmin = true
	const user = false

	return (
		<header className='border-glass-border bg-background/65 sticky top-0 z-40 border-b backdrop-blur-xl'>
			<div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6'>
				<Link href='/' className='text-foreground flex items-center gap-3 font-bold'>
					<span className='bg-primary/15 text-primary glow-soft flex h-10 w-10 items-center justify-center rounded-2xl'>
						<BookOpenText className='h-5 w-5' />
					</span>
					<div>
						<div>Book Summary App</div>
						<div className='text-muted-foreground text-xs font-normal'>
							社員向け要約プラットフォーム
						</div>
					</div>
				</Link>

				<div className='hidden items-center gap-3 md:flex'>
					{user ? (
						<>
							{isAdmin ? (
								<>
									<NavLink
										href='/admin'
										className='text-muted-foreground hover:text-foreground text-sm'
									>
										ダッシュボード
									</NavLink>
									<NavLink
										href='/admin/books'
										className='text-muted-foreground hover:text-foreground text-sm'
									>
										書籍管理
									</NavLink>
									<NavLink
										href='/admin/categories'
										className='text-muted-foreground hover:text-foreground text-sm'
									>
										カテゴリ管理
									</NavLink>
								</>
							) : (
								<>
									<NavLink
										href='/'
										className='text-muted-foreground hover:text-foreground text-sm'
									>
										ホーム
									</NavLink>
									<NavLink
										href='/books'
										className='text-muted-foreground hover:text-foreground text-sm'
									>
										書籍一覧
									</NavLink>
								</>
							)}
							<span className='border-glass-border bg-card/60 text-muted-foreground rounded-full border px-2.5 py-1 text-xs'>
								{isAdmin ? 'ADMIN' : 'USER'}
							</span>
						</>
					) : (
						<Link
							href='/login'
							className='text-muted-foreground hover:text-foreground text-sm'
						>
							ログイン
						</Link>
					)}
					<ThemeToggle />
					{user ? (
						<Button size='sm' variant='outline'>
							ログアウト
						</Button>
					) : (
						<Link
							href='/login'
							className='bg-primary text-primary-foreground glow-primary inline-flex h-8 items-center justify-center rounded-xl px-3 text-sm font-medium transition-all hover:opacity-90'
						>
							サインイン
						</Link>
					)}
				</div>

				<div className='flex items-center gap-2 md:hidden'>
					<ThemeToggle />
					{user ? (
						<>
							<span className='border-glass-border bg-card/60 text-muted-foreground rounded-full border px-2 py-1 text-[10px]'>
								{isAdmin ? 'ADMIN' : 'USER'}
							</span>
							<Button size='sm' variant='outline'>
								ログアウト
							</Button>
						</>
					) : (
						<Link
							href='/login'
							className='bg-primary text-primary-foreground inline-flex h-8 items-center justify-center rounded-xl px-3 text-sm font-medium transition-all hover:opacity-90'
						>
							ログイン
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}
