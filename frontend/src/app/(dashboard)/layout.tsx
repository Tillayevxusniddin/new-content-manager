import { Header } from '@/widgets/header'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='bg-background text-foreground min-h-screen overflow-x-hidden'>
			<Header />
			<div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pt-24 pb-6 md:px-6 md:pt-28 md:pb-8'>
				{/* <aside className='border-glass-border bg-card/60 h-fit rounded-2xl border p-3 backdrop-blur md:sticky md:top-24'>
					<Sidebar />
				</aside> */}
				<main className='min-w-0 overflow-x-hidden'>{children}</main>
			</div>
		</div>
	)
}
