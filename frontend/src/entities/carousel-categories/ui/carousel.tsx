import {
	Brain,
	Briefcase,
	Cpu,
	FolderOpen,
	Rocket,
	Sparkles,
	TrendingUp,
	Users
} from 'lucide-react'

import { categories } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import {
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	Carousel as CarouselRoot
} from '@/shared/ui/carousel'

const iconMap = { Brain, Briefcase, Cpu, FolderOpen, Rocket, Sparkles, TrendingUp, Users }

export const Carousel: React.FC = () => {
	return (
		<div className='relative w-full px-12'>
			<CarouselRoot
				opts={{
					align: 'start',
					loop: true
				}}
				className='w-full'
			>
				<CarouselContent className='-ml-3'>
					{categories.map(category => {
						const Icon = iconMap[category.icon as keyof typeof iconMap] ?? FolderOpen
						return (
							<CarouselItem key={category.id} className='basis-auto pl-3'>
								<button
									className={cn(
										'border-glass-border bg-card/70 hover:bg-surface-hover flex min-w-44 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all hover:-translate-y-0.5',
										category.accent
									)}
								>
									<span className='bg-surface flex h-10 w-10 items-center justify-center rounded-2xl'>
										<Icon className='h-4 w-4' />
									</span>
									<span className='flex-1'>
										<span className='text-foreground block text-sm font-semibold'>
											{category.name}
										</span>
										<span className='text-muted-foreground text-xs'>
											{category.count} 件
										</span>
									</span>
								</button>
							</CarouselItem>
						)
					})}
				</CarouselContent>

				<CarouselPrevious className='hidden md:flex' />
				<CarouselNext className='hidden md:flex' />
			</CarouselRoot>
		</div>
	)
}
