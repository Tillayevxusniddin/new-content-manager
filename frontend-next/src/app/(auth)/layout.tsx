import AppNavigation from '@/widgets/app-navigation'
import { Navbar } from '@/widgets/navigation'

export default function Root({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='bg-background text-foreground min-h-screen overflow-x-hidden'>
			<Navbar />
			<div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[240px_minmax(0,1fr)] md:px-6 md:py-8'>
				<aside className='border-glass-border bg-card/60 h-fit rounded-2xl border p-3 backdrop-blur md:sticky md:top-24'>
					<AppNavigation />
				</aside>
				<main className='min-w-0 overflow-x-hidden'>{children}</main>
			</div>
		</div>
	)
}
