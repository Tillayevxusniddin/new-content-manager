'use client'

import { ArrowRight, BookOpenText, ShieldAlert, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import {
	getPostLoginPath,
	hasAcceptedFirstLoginNotice,
	markFirstLoginNoticeAccepted
} from '@/shared/hooks/auth-context'
import { useAuth } from '@/shared/hooks/use-auth'
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/shared/ui'

export default function FirstLoginPage() {
	const { user, isLoading } = useAuth()
	const router = useRouter()
	const [accepted, setAccepted] = useState(false)
	const [ready, setReady] = useState(false)

	const landingPath = useMemo(() => {
		if (!user) return '/login'
		return getPostLoginPath(user)
	}, [user])

	useEffect(() => {
		if (isLoading) return
		if (!user) {
			router.replace('/login')
			return
		}
		if (hasAcceptedFirstLoginNotice(user.email)) {
			router.replace(landingPath)
			return
		}
		setReady(true)
	}, [isLoading, landingPath, router, user])

	const handleContinue = () => {
		if (!user || !accepted) return
		markFirstLoginNoticeAccepted(user.email)
		router.replace(landingPath)
	}

	if (isLoading || !ready) return null

	return (
		<div className='bg-background text-foreground relative flex min-h-screen items-center justify-center px-4'>
			<Card className='max-w-4xl'>
				<CardHeader className='gap-4 p-6 md:p-8'>
					<div className='flex items-center justify-between gap-3'>
						<Badge className='border-border bg-surface text-foreground w-fit'>
							<Sparkles className='h-3.5 w-3.5' />
							First login
						</Badge>
						<div className='bg-primary/15 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
							<BookOpenText className='h-5 w-5' />
						</div>
					</div>
					<CardTitle className='text-foreground text-3xl md:text-4xl'>
						初回ログインありがとうございます
					</CardTitle>
					<CardDescription className='text-muted-foreground max-w-2xl'>
						この画面は、初回のみ表示される注意事項確認用のプレースホルダーです。
						後日共有される文章を入れる前提で、先に画面構成だけを用意しています。
					</CardDescription>
				</CardHeader>

				<CardContent className='p-6 pt-0 md:p-8 md:pt-0'>
					<div className='grid gap-6 lg:grid-cols-[1.05fr_0.95fr]'>
						<div className='border-border space-y-4 rounded-[1.75rem] border p-5'>
							<div className='text-foreground flex items-center gap-2 text-sm font-semibold'>
								<ShieldAlert className='text-primary h-4 w-4' />
								注意事項エリア
							</div>
							<div className='text-muted-foreground space-y-3 text-sm leading-7'>
								<p>・後日共有される文章がここに入ります。</p>
								<p>・本番では利用ガイドや社内ポリシーを表示してください。</p>
								<p>
									・UI は 1 画面で完結し、読み切ってから続行する流れにしています。
								</p>
							</div>
							<div className='border-border bg-surface text-muted-foreground rounded-2xl border p-4 text-xs'>
								この画面はモック実装です。チェック後は初回確認済みフラグを
								localStorage に保存して遷移します。
							</div>
						</div>

						<div className='border-border space-y-4 rounded-[1.75rem] border p-5'>
							<div className='text-foreground text-sm font-semibold'>
								確認チェック
							</div>
							<label className='border-border bg-card/60 hover:bg-surface-hover flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition'>
								<input
									type='checkbox'
									checked={accepted}
									onChange={event => setAccepted(event.target.checked)}
									className='accent-primary mt-1 h-4 w-4 rounded'
								/>
								<div>
									<div className='text-foreground text-sm font-medium'>
										注意事項を読みました
									</div>
									<p className='text-muted-foreground mt-1 text-xs leading-6'>
										現時点ではダミー文言です。後日、正式な注意書きへ差し替えられます。
									</p>
								</div>
							</label>

							<div className='border-border rounded-2xl border bg-[linear-gradient(135deg,hsl(var(--surface)),hsl(var(--primary)/0.16),hsl(var(--accent)/0.14))] p-4'>
								<div className='text-muted-foreground text-xs tracking-[0.24em] uppercase'>
									Proceed to the app
								</div>
								<div className='text-foreground mt-2 text-sm'>
									チェック後にホームまたは管理者画面へ進みます。
								</div>
							</div>

							<Button
								className='w-full'
								size='lg'
								disabled={!accepted}
								onClick={handleContinue}
							>
								同意して続行
								<ArrowRight className='h-4 w-4' />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
