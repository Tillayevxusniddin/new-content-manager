import { Controller } from 'react-hook-form'
import { CheckCircle2, CircleAlert, LogIn, Sparkles } from 'lucide-react'

import {
	Badge,
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
	const { form, onSubmit, submitting, error, demoAccounts } = model
	return (
		<FormProvider {...form}>
			<div className='space-y-4'>
				<Badge className='bg-white/10 text-white/85'>
					<Sparkles className='h-3.5 w-3.5' />
					サインイン
				</Badge>

				{error && (
					<div className='border-destructive/40 bg-destructive/10 text-destructive flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm'>
						<CircleAlert className='mt-0.5 h-4 w-4 shrink-0' />
						<span>{error}</span>
					</div>
				)}

				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldSet>
						<FieldGroup className='gap-4'>
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
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
										{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
									</Field>
								)}
							/>
						</FieldGroup>

						<Button type='submit' className='mt-5 w-full' size='lg'>
							{submitting ? (
								'ログイン中...'
							) : (
								<>
									<LogIn className='h-4 w-4' />
									ログイン
								</>
							)}
						</Button>
					</FieldSet>
				</form>

				<div className='grid gap-3 sm:grid-cols-2'>
					{demoAccounts.map(account => (
						<button
							key={account.email}
							type='button'
							onClick={() => {
								form.setValue('email', account.email)
								form.setValue('password', account.password)
							}}
							className='border-glass-border/80 bg-background/35 hover:border-primary/30 hover:bg-background/50 rounded-2xl border p-4 text-left transition'
						>
							<div className='flex items-center justify-between gap-2'>
								<span className='text-foreground font-semibold'>{account.label}</span>
								<CheckCircle2 className='text-primary h-4 w-4' />
							</div>
							<div className='text-muted-foreground mt-2 text-xs'>
								{account.email}
							</div>
							<div className='text-muted-foreground text-xs'>
								{account.password}
							</div>
						</button>
					))}
				</div>
			</div>
		</FormProvider>
	)
}
