import { Geist_Mono, Inter } from 'next/font/google'

import { AuthProvider } from '@/shared/hooks/auth-context'
import { cn } from '@/shared/lib/utils'
import { Providers } from '@/shared/providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono'
})

export const metadata = {
	title: 'Book Summary Platform',
	description: 'AIを活用した要約管理ツール'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={cn('antialiased', fontMono.variable, 'font-sans', inter.variable)}
		>
			<body suppressHydrationWarning>
				<AuthProvider>
					<Providers>{children}</Providers>
				</AuthProvider>
			</body>
		</html>
	)
}
