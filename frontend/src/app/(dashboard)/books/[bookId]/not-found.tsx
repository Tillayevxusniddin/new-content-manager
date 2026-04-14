import Link from 'next/link'

import { Button } from '@/shared/ui'

export default function NotFound() {
	return (
		<div className='flex min-h-screen items-center justify-center px-4'>
			<div className='border-glass-border bg-card/70 rounded-[2rem] border p-8 text-center backdrop-blur-xl'>
				<div className='text-primary text-6xl font-black'>404</div>
				<div className='text-foreground mt-2 text-lg font-semibold'>
					ページが見つかりません
				</div>
				<p className='text-muted-foreground mt-2 text-sm'>
					存在しない URL にアクセスしました。
				</p>
				<Link href='/'>
					<Button className='mt-6'>ホームに戻る</Button>
				</Link>
			</div>
		</div>
	)
}
