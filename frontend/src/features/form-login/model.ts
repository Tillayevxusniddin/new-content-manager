import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'

import { useAuth } from '@/shared/hooks/use-auth'
import { DEMO_ACCOUNTS } from '@/shared/hooks/auth-context'

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})
type FormLoginData = z.infer<typeof schema>
export const useFormLoginModel = () => {
	const { login, isLoading: submitting } = useAuth()
	const [error, setError] = useState<string | null>(null)
	const form = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: zodResolver(schema)
	})
	const onSubmit: SubmitHandler<FormLoginData> = async data => {
		setError(null)
		const result = await login(data.email, data.password)
		if (!result.ok) setError(result.error)
	}
	return { form, onSubmit, submitting: form.formState.isSubmitting || submitting, error, demoAccounts: DEMO_ACCOUNTS }
}
