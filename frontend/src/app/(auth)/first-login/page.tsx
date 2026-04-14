'use client'

import { ArrowRight, BookOpenText, CheckCircle2, Sparkles, ShieldAlert } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
	hasAcceptedFirstLoginNotice,
	markFirstLoginNoticeAccepted,
	getPostLoginPath
} from '@/shared/hooks/auth-context'
import { useAuth } from '@/shared/hooks/use-auth'
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui'

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
		<div className='relative min-h-dvh overflow-hidden bg-[#05070d] px-4 py-6 text-white'>
			<div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(59,130,246,0.2),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(34,197,94,0.14),transparent_30%)]' />
			<div className='absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_18%,transparent_82%,rgba(255,255,255,0.03)_100%)]' />

			<div className='relative mx-auto flex min-h-[calc(100dvh-3rem)] max-w-4xl items-center justify-center'>
				<Card className='border-white/10 bg-white/5 w-full shadow-[0_24px_140px_rgba(0,0,0,0.45)] backdrop-blur-2xl'>
					<CardHeader className='gap-4 p-6 md:p-8'>
						<div className='flex items-center justify-between gap-3'>
							<Badge className='w-fit border-white/10 bg-white/10 text-white/85'>
								<Sparkles className='h-3.5 w-3.5' />
								First login
							</Badge>
							<div className='bg-primary/15 text-primary flex h-11 w-11 items-center justify-center rounded-2xl'>
								<BookOpenText className='h-5 w-5' />
							</div>
						</div>
						<CardTitle className='text-3xl text-white md:text-4xl'>
							初回ログインありがとうございます
						</CardTitle>
						<CardDescription className='max-w-2xl text-white/60'>
							この画面は、初回のみ表示される注意事項確認用のプレースホルダーです。
							後日共有される文章を入れる前提で、先に画面構成だけを用意しています。
						</CardDescription>
					</CardHeader>

					<CardContent className='p-6 pt-0 md:p-8 md:pt-0'>
						<div className='grid gap-6 lg:grid-cols-[1.05fr_0.95fr]'>
							<div className='space-y-4 rounded-[1.75rem] border border-white/10 bg-black/20 p-5'>
								<div className='flex items-center gap-2 text-sm font-semibold text-white'>
									<ShieldAlert className='text-primary h-4 w-4' />
									注意事項エリア
								</div>
								<div className='space-y-3 text-sm leading-7 text-white/70'>
									<p>
										・後日共有される文章がここに入ります。
									</p>
									<p>
										・本番では利用ガイドや社内ポリシーを表示してください。
									</p>
									<p>
										・UI は 1 画面で完結し、読み切ってから続行する流れにしています。
									</p>
								</div>
								<div className='border-white/10 bg-white/5 rounded-2xl border p-4 text-xs text-white/55'>
									この画面はモック実装です。チェック後は初回確認済みフラグを localStorage に保存して遷移します。
								</div>
							</div>

							<div className='space-y-4 rounded-[1.75rem] border border-white/10 bg-black/20 p-5'>
								<div className='text-sm font-semibold text-white'>確認チェック</div>
								<label className='flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10'>
									<input
										type='checkbox'
										checked={accepted}
										onChange={event => setAccepted(event.target.checked)}
										className='accent-primary mt-1 h-4 w-4 rounded'
									/>
									<div>
										<div className='text-sm font-medium text-white'>
											注意事項を読みました
										</div>
										<p className='mt-1 text-xs leading-6 text-white/60'>
											現時点ではダミー文言です。後日、正式な注意書きへ差し替えられます。
										</p>
									</div>
								</label>

								<div className='rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(168,85,247,0.14))] p-4'>
									<div className='text-xs tracking-[0.24em] text-white/60 uppercase'>
										Proceed to the app
									</div>
									<div className='mt-2 text-sm text-white/80'>
										チェック後にホームまたは管理者画面へ進みます。
									</div>
								</div>

								<Button className='w-full' size='lg' disabled={!accepted} onClick={handleContinue}>
									同意して続行
									<ArrowRight className='h-4 w-4' />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
