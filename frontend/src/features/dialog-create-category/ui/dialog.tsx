import { Button, Input, Label } from '@/shared/ui'
import {
	DialogClose,
	DialogContent,
	DialogHeader,
	Dialog as DialogRoot,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui/dialog'

import { useCreateCategoryModel } from '../model'

export const Dialog: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => {
	const model = useCreateCategoryModel()
	return (
		<DialogRoot>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className='max-w-lg'>
				<DialogHeader>
					<DialogTitle>カテゴリの作成</DialogTitle>
				</DialogHeader>
				<div className='space-y-2'>
					<Label>カテゴリ名</Label>
					<Input placeholder='例: マネジメント' />
				</div>
				<div className='mt-2 flex justify-end gap-3'>
					<DialogClose asChild>
						<Button variant='outline'>キャンセル</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button>保存</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</DialogRoot>
	)
}
