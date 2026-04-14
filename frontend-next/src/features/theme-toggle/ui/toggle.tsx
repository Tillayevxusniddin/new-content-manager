'use client'

import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/shared/ui'

export function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme()

	return (
		<Button
			size='sm'
			variant='outline'
			type='button'
			onClick={() => {
				setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
			}}
			className='size-10 rounded-full'
		>
			{resolvedTheme === 'dark' ? (
				<SunMedium className='h-4 w-4' />
			) : (
				<MoonStar className='h-4 w-4' />
			)}
			{/* <span className='hidden md:inline'>{resolvedTheme === 'light' ? 'Dark' : 'Light'}</span> */}
		</Button>
	)
}
