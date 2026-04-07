import { ThemeProvider as Component } from "next-themes"

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Component>{children}</Component>
}
