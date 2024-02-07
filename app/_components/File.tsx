'use client'

import { ComponentProps, useEffect, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { VariantProps, tv } from 'tailwind-variants'

const container = tv({
  base: 'flex flex-col min-w-0 rounded-md input-container p-2 border-2 border-solid transition focus-within:bg-slate-200',
  variants: {
    edit: {
      default: 'focus-within:border-[#ff3478]',
      edited: 'border-[#ff3478]',
      error: 'border-red-600',
    },
  },
  defaultVariants: {
    edit: 'default',
  },
})

type EditState = VariantProps<typeof container>['edit']

interface FileProps extends ComponentProps<'input'> {
  register: UseFormRegisterReturn
  isEdited?: boolean
  error?: string
  className?: string
}

export function File({
  className,
  isEdited,
  error,
  register,
  id,
  placeholder,
  ...rest
}: FileProps) {
  const [edit, setEditState] = useState<EditState>('default')

  useEffect(() => {
    setEditState(error ? 'error' : isEdited ? 'edited' : 'default')
  }, [error, isEdited])

  return (
    <div className={container({ className, edit })}>
      <div className="flex items-center">
        <label htmlFor={id} className="ml-2 w-full cursor-pointer">
          {placeholder}
        </label>
        <input id={id} className="cursor-pointer" {...rest} {...register} />
      </div>
      <span className="paragraph text-xs text-red-300 sm:text-sm lg:text-sm">
        {error}
      </span>
    </div>
  )
}
