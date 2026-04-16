import { Loader2Icon } from 'lucide-react'

function Spinner({ className, text, ...props }: React.ComponentProps<'svg'> & { text?: string }) {
	return typeof text === 'string' ? (
		<div className={className}>
			<Loader2Icon {...props} />
			<span className='ml-2'>{text}</span>
		</div>
	) : (
		<Loader2Icon className={className} {...props} />
	)
}

export { Spinner }
