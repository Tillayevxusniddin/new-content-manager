import { categories } from '@/shared/lib/mock-data'
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'

import { bookTableModel } from '../model'

export const Filter: React.FC<{ model: ReturnType<typeof bookTableModel> }> = ({ model }) => {
	const { query, setQuery, categoryId, setCategoryId } = model

	return (
		<div className='grid gap-3 md:grid-cols-[1fr_220px]'>
			<Input
				value={query}
				onChange={e => setQuery(e.target.value)}
				placeholder='書籍を検索...'
			/>
			<Select value={categoryId} onValueChange={e => setCategoryId(e)}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='カテゴリ' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='all'>すべて</SelectItem>
					{categories.map(category => (
						<SelectItem key={category.id} value={category.id}>
							{category.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
