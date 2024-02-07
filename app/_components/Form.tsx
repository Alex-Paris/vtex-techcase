'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { readFileDataUrl } from '../_functions/readDataUrl'
import { Checkbox } from './Checkbox'
import { Combobox } from './Combobox'
import { File } from './File'
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

  // Orders
  orders: z
    .object({
      orderNumber: z
        .string()
        .min(1, {
          message: 'Please, insert the order number!',
        })
        .max(500, {
          message: 'Please, insert a smaller text!',
        })
        .transform((orderNumber) => {
          return parseInt(orderNumber)
        }),
      affectUsers: z.boolean(),
    })
    .optional(),

  // Payments
  payments: z
    .object({
      transactionNumber: z
        .string()
        .min(1, {
          message: 'Please, insert the transaction number!',
        })
        .max(500, {
          message: 'Please, insert a smaller text!',
        })
        .transform((value) => {
          return parseInt(value)
        }),
      transactionStatus: z
        .string()
        .min(3, {
          message: 'Please, inform the transaction status!',
        })
        .max(500, {
          message: 'Please, insert a smaller text!',
        }),
      paymentAcquirer: z
        .string()
        .min(5, {
          message: 'Please, inform the Payment Acquirer!',
        })
        .max(500, {
          message: 'Please, insert a smaller text!',
        }),
    })
    .optional(),

  // Catalog
  catalog: z
    .object({
      skuId: z
        .string()
        .min(1, {
          message: 'Please, inform the skuId number!',
        })
        .max(500, {
          message: 'Please, insert a smaller text!',
        })
        .transform((value) => {
          return parseInt(value)
        }),
      printOfPage: z
        .custom<File[]>()
        .optional()
        .refine(
          (file) =>
            !file ||
            file.length === 0 ||
            ['image/png', 'image/jpeg', 'image/webp'].includes(file[0].type),
          'Accepted files: .png, .jpg, .jpeg, .webp',
        )
        .refine(
          (file) => !file || file.length === 0 || file[0].size <= 5000000,
          'Max size of 5MB',
        )
        .transform(async (file) => {
          return file?.[0] && (await readFileDataUrl(file[0]))
        }),
    })
    .optional(),

  // Other
  others: z.object({
    detailing: z
      .string()
      .min(10, {
        message:
          'Please, insert a detailing info about your request with more than 10 characters!',
      })
      .max(500, {
        message: 'Please, insert a smaller text!',
      }),
  }),
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

      {selectedOption === 'Orders' && (
        <>
          <Input
            type="number"
            placeholder="Order Number"
            isEdited={dirtyFields.orders?.orderNumber}
            disabled={isSubmitting}
            error={errors.orders?.orderNumber}
            register={register('orders.orderNumber')}
          />
          <Checkbox
            id="affectUsers"
            type="checkbox"
            placeholder="Affecting all users?"
            isEdited={dirtyFields.orders?.affectUsers}
            disabled={isSubmitting}
            error={errors.orders?.affectUsers}
            register={register('orders.affectUsers')}
          />
        </>
      )}

      {selectedOption === 'Payments' && (
        <>
          <Input
            type="number"
            placeholder="Transaction Number"
            isEdited={dirtyFields.payments?.transactionNumber}
            disabled={isSubmitting}
            error={errors.payments?.transactionNumber}
            register={register('payments.transactionNumber')}
          />
          <Input
            type="text"
            placeholder="Transaction Status"
            isEdited={dirtyFields.payments?.transactionStatus}
            disabled={isSubmitting}
            error={errors.payments?.transactionStatus}
            register={register('payments.transactionStatus')}
          />
          <Input
            type="text"
            placeholder="Payment Acquirer"
            isEdited={dirtyFields.payments?.paymentAcquirer}
            disabled={isSubmitting}
            error={errors.payments?.paymentAcquirer}
            register={register('payments.paymentAcquirer')}
          />
        </>
      )}

      {selectedOption === 'Catalog' && (
        <>
          <Input
            type="number"
            placeholder="SkuId"
            isEdited={dirtyFields.catalog?.skuId}
            disabled={isSubmitting}
            error={errors.catalog?.skuId}
            register={register('catalog.skuId')}
          />
          <File
            id="printOfPage"
            type="file"
            placeholder="Print of the page"
            isEdited={dirtyFields.catalog?.printOfPage?.file_name}
            disabled={isSubmitting}
            error={errors.catalog?.printOfPage?.message}
            register={register('catalog.printOfPage')}
          />
        </>
      )}

      {selectedOption && (
        <RichText
          placeholder="Detailing"
          isEdited={dirtyFields.others?.detailing}
          disabled={isSubmitting}
          error={errors.others?.detailing}
          register={register('others.detailing')}
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
