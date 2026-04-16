'use client'

import { Progress as ProgressPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

function Progress({
    className,
    value = 0,
    ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
    return (
        <ProgressPrimitive.Root
            data-slot='progress'
            className={cn('bg-border relative h-2 w-full overflow-hidden rounded-full', className)}
            value={value}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot='progress-indicator'
                className='h-full w-full flex-1 rounded-full bg-linear-to-r from-emerald-400 via-emerald-300 to-cyan-300 transition-transform duration-500'
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    )
}

export { Progress }