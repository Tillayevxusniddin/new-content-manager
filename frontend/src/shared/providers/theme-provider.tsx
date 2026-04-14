import { ThemeProvider as ThemeProviderComponent } from 'next-themes'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ThemeProviderComponent
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProviderComponent>
	)
}
