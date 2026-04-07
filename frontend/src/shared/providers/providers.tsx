import { ThemeProvider } from "./theme-providers"

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
