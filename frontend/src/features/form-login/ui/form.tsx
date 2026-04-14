import { Controller } from 'react-hook-form'

import { DEMO_ACCOUNTS } from '@/shared/hooks/auth-context'
import {
	Button,
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
	Form as FormProvider,
	Input
} from '@/shared/ui'

import { useFormLoginModel } from '../model'

export const Form: React.FC = () => {
	const model = useFormLoginModel()
	const { form, onSubmit, submitting } = model
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FieldSet>
					<FieldGroup>
						<Controller
							name='email'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>メール</FieldLabel>
									<Input
										{...field}
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder='example@domain.com'
										autoComplete='off'
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							name='password'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor={field.name}>パスワード</FieldLabel>
									<Input
										{...field}
										id={field.name}
										type='password'
										aria-invalid={fieldState.invalid}
										autoComplete='off'
									/>

									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
					<Button type='submit'>{submitting ? 'ログイン中...' : 'ログイン'}</Button>
				</FieldSet>
			</form>

			<div className='border-glass-border/80 bg-background/45 mt-5 rounded-2xl border p-3'>
				<p className='text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase'>
					Mock Accounts
				</p>
				<div className='text-foreground/90 mt-2 space-y-2 text-xs'>
					{DEMO_ACCOUNTS.map(account => (
						<button
							key={account.email}
							type='button'
							onClick={() => {
								form.setValue('email', account.email)
								form.setValue('password', account.password)
							}}
							className='border-glass-border/80 bg-card/70 hover:border-primary/30 hover:bg-surface-hover w-full rounded-lg border px-2.5 py-2 text-left transition'
						>
							<span className='text-foreground font-semibold'>{account.label}</span>
							<span className='text-muted-foreground ml-2'>({account.role})</span>
							<div className='text-muted-foreground mt-1'>email: {account.email}</div>
							<div className='text-muted-foreground'>
								password: {account.password}
							</div>
						</button>
					))}
				</div>
			</div>
		</FormProvider>
	)
}
