'use client'

import { MoonStar, SunMedium } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/shared/ui'

export function ThemeToggle() {
	const { setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<Button
			size='sm'
			variant='outline'
			type='button'
			onClick={() => {
				if (!mounted) return
				setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
			}}
			className='size-10 rounded-full'
		>
			{mounted && resolvedTheme === 'dark' ? (
				<SunMedium className='h-4 w-4' />
			) : (
				<MoonStar className='h-4 w-4' />
			)}
			{/* <span className='hidden md:inline'>{resolvedTheme === 'light' ? 'Dark' : 'Light'}</span> */}
		</Button>
	)
}
