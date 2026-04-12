'use client'

import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from '@/shared/ui'

export function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Button size='sm' variant='outline' type='button' aria-label='Theme toggle' disabled>
				<SunMedium className='h-4 w-4' />
			</Button>
		)
	}

	const isDark = (resolvedTheme ?? theme) === 'dark'

	return (
		<Button
			size='sm'
			variant='outline'
			type='button'
			aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
		>
			{isDark ? <SunMedium className='h-4 w-4' /> : <MoonStar className='h-4 w-4' />}
			<span className='hidden md:inline'>{isDark ? 'Light' : 'Dark'}</span>
		</Button>
	)
}
