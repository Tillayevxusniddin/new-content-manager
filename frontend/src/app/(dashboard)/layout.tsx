import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='bg-background text-foreground min-h-screen'>
			<Header />
			<div className='mx-auto flex w-full max-w-7xl gap-6 px-4 pt-24 pb-6 md:px-6 md:pt-28 md:pb-8'>
				<Sidebar />
				<main className='flex-1'>{children}</main>
			</div>
		</div>
	)
}
