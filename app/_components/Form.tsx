'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
  subject: z
    .string()
    .min(5, {
      message: 'Please, insert a subject with more than 5 characters!',
    })
    .max(500, {
      message: 'Please, insert a smaller text!',
    }),
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

type FormInputs = z.infer<typeof formSchema>

export function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, dirtyFields },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  })

  async function handleSendEmail(form: FormInputs) {
    try {
      // const sectorIndex = sectors.findIndex((s) => s.name === form.sector)
      // const to = sectors[sectorIndex].email || 'secretaria@funada.com.br'

      // const sendData: IEmailContactPostProps = {
      //   ...form,
      //   to,
      //   sector: form.sector,
      //   contact: 'Contato',
      //   subject: `* [Envio de Contato ${form.sector}] - ${form.name} *`,
      // }

      // const res = await fetch('/contato/api/email-routes/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(sendData),
      // })

      // if (res.status !== 200) {
      //   const data = await res.json()
      //   throw new Error(data)
      // }

      alert('Mensagem enviada com sucesso!')
      reset()
    } catch (error) {
      console.log(error)
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

      <Input
        type="text"
        placeholder="Subject"
        isEdited={dirtyFields.subject}
        disabled={isSubmitting}
        error={errors.subject}
        register={register('subject')}
      />

      <RichText
        placeholder="Detailing"
        isEdited={dirtyFields.detailing}
        disabled={isSubmitting}
        error={errors.detailing}
        register={register('detailing')}
      />
      <button>Submit</button>
    </form>
  )
}
