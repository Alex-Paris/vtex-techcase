import Link from 'next/link'
import { redirect } from 'next/navigation'

interface SuccessProps {
  searchParams: {
    ticket_id: string
  }
}

export default function Success({ searchParams }: SuccessProps) {
  const ticketId = searchParams.ticket_id
  if (!ticketId) {
    redirect('/')
  }

  return (
    <div className="flex flex-col">
      <h1 className="mx-auto mb-2 text-2xl font-bold text-green-700">
        Ticket created!
      </h1>

      <span className="mx-auto mt-4 text-base">Your ticket number:</span>

      <p className="mx-auto mt-2 rounded-lg bg-slate-500 p-8 text-6xl font-bold text-white">
        {ticketId}
      </p>

      <Link
        className="mx-auto mt-20 block text-lg text-green-500 underline duration-200 hover:text-green-400"
        href="/"
      >
        Back to the form
      </Link>
    </div>
  )
}
