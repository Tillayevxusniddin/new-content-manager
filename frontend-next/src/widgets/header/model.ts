import { useAuth } from '@/shared/hooks/use-auth'

export const useHeaderModel = () => {
	const { user, logout } = useAuth()

	return { user, logout }
}
