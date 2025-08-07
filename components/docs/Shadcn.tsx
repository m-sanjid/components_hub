import React from 'react'
import {Icons} from './icons'

export const Shadcn = () => {
  return (
    <div className="flex items-center gap-2">
      <Icons.shadcn className="size-6 bg-primary/10 p-1 rounded-md border backdrop-blur-md" />
      <span>CLI</span>
    </div>
  )
}
