'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Combobox } from './Combobox'
import { Input } from './Input'
import { RichText } from './RichText'

const formSchema = z.object({
  account: z
    .string()
    .min(3, { message: 'Please, insert a valid account name!' })
    .max(50, {
      message: 'Please, insert a smaller text!',
    }),
  email: z.string().email({ message: 'Please, insert a valid email!' }),
  subject: z.enum(['Orders', 'Payments', 'Catalog', 'Others']),

  // Other
  Others: z
    .object({
      detailing: z
        .string()
        .min(10, {
          message:
            'Please, insert a detailing info about your request with more than 10 characters!',
        })
        .max(500, {
          message: 'Please, insert a smaller text!',
        }),
    })
    .optional(),
})

export type FormInputs = z.infer<typeof formSchema>

export function Form() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, errors, dirtyFields },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  })

  const selectedOption = watch('subject')

  const subjectList = useMemo(
    () => ['Orders', 'Payments', 'Catalog', 'Others'],
    [],
  )

  async function handleSendEmail(form: FormInputs) {
    return alert(JSON.stringify(form))

    try {
      const res = await fetch('/api', {
        method: 'POST',
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.status !== 201) throw new Error(data)

      window.location.href = data.successUrl
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  return (
    <form
      className="flex w-96 flex-col gap-2 rounded-xl bg-white p-8"
      onSubmit={handleSubmit(handleSendEmail)}
    >
      <h1 className="mx-auto mb-2 text-2xl font-bold">New Request</h1>

      <Input
        type="account"
        placeholder="Account Name"
        isEdited={dirtyFields.account}
        disabled={isSubmitting}
        error={errors.account}
        register={register('account')}
      />

      <Input
        type="email"
        placeholder="Requester Email"
        isEdited={dirtyFields.email}
        disabled={isSubmitting}
        error={errors.email}
        register={register('email')}
      />

      <Combobox
        placeholder="Choose a subject"
        list={subjectList}
        isEdited={dirtyFields.subject}
        disabled={isSubmitting}
        error={errors.subject}
        register={register('subject')}
      />

      {selectedOption === 'Others' && (
        <RichText
          placeholder="Detailing"
          isEdited={dirtyFields.Others?.detailing}
          disabled={isSubmitting}
          error={errors.Others?.detailing}
          register={register('Others.detailing')}
        />
      )}

      <button
        disabled={isSubmitting}
        className="disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        Submit
      </button>
    </form>
  )
}
