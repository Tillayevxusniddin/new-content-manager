import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='bg-background text-foreground min-h-screen'>
			<Header />
			<div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pt-24 pb-6 md:px-6 md:pt-28 md:pb-8 lg:grid-cols-[280px_minmax(0,1fr)]'>
				<aside className='hidden lg:block'>
					<Sidebar />
				</aside>
				<main className='min-w-0 overflow-x-hidden'>{children}</main>
			</div>
		</div>
	)
}
