'use client'

import { ComponentProps, useEffect, useState } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
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

interface ComboboxProps extends ComponentProps<'select'> {
  register: UseFormRegisterReturn
  list: string[]
  placeholder: string
  isEdited?: boolean
  error?: FieldError
  className?: string
}

export function Combobox({
  className,
  isEdited,
  error,
  register,
  placeholder,
  list,
  ...rest
}: ComboboxProps) {
  const [edit, setEditState] = useState<EditState>('default')

  useEffect(() => {
    setEditState(error?.message ? 'error' : isEdited ? 'edited' : 'default')
  }, [error?.message, isEdited])

  return (
    <div className={container({ className, edit })}>
      <select defaultValue="" {...rest} {...register}>
        <option value="" disabled hidden>
          {` (${placeholder}...) `}
        </option>
        {list.map((item) => (
          <option key={item} value={item}>
            {` ${item} `}
          </option>
        ))}
      </select>
      <span className="paragraph text-xs text-red-300 sm:text-sm lg:text-sm">
        {error?.message}
      </span>
    </div>
  )
}
