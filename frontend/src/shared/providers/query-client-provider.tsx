'use client'
import { queryClient } from '@/shared/lib/query-client'
import { QueryClientProvider as ClientProvider } from '@tanstack/react-query'


export const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <ClientProvider client={queryClient}>{children}</ClientProvider>
}