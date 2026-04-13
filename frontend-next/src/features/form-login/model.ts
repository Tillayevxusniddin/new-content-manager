import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'

import { useAuth } from '@/shared/hooks/use-auth'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})
type FormLoginData = z.infer<typeof schema>
export const useFormLoginModel = () => {
	const { login, isLoading: submitting } = useAuth()
	const form = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: zodResolver(schema)
	})
	const onSubmit: SubmitHandler<FormLoginData> = data => {
		login(data.email, data.password)
	}
	return { form, onSubmit, submitting }
}
