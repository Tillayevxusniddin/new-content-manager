import {
	Button,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Dialog as Root,
	Spinner
} from '@/shared/ui'

export const Dialog: React.FC<{
	trigger: React.ReactNode
	title?: string
	description?: string | React.ReactNode
	onConfirm: () => void
	isLoading: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
	actionButtonText?: string
	actionButtonLoadingText?: string
}> = ({
	trigger,
	title = '確認',
	description = 'この操作は元に戻せません。本当に実行しますか？',
	onConfirm,
	isLoading,
	open,
	onOpenChange,
	actionButtonText = '削除',
	actionButtonLoadingText = '削除中...'
}) => {
	return (
		<Root open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline' disabled={isLoading}>
							キャンセル
						</Button>
					</DialogClose>
					<Button
						type='submit'
						onClick={onConfirm}
						disabled={isLoading}
						variant={'destructive'}
					>
						{isLoading ? <Spinner text={actionButtonLoadingText} /> : actionButtonText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Root>
	)
}
