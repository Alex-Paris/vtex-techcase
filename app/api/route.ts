import { NextRequest, NextResponse as res } from 'next/server'

import { FormInputs } from '../_components/Form'

export async function POST(req: NextRequest) {
  const { account, email, subject, detailing }: FormInputs = await req.json()

  if (!account || !email || !subject || !detailing) {
    return res.json({ error: 'Missing data' }, { status: 400 })
  }

  const url = `${process.env.ZEN_BASE_URL}/api/v2/tickets`

  const body = JSON.stringify({
    ticket: {
      subject,
      comment: {
        body: `Account Name: ${account} \nEmail: ${email} \nSubject: ${subject} \nDetailing: ${detailing} }`,
      },
    },
  })

  try {
    const credentials = `${process.env.ZEN_AUTH_EMAIL}/token:${process.env.ZEN_AUTH_TOKEN}`
    const encodedCredentials = btoa(credentials)

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic "${encodedCredentials}"`,
      },
      body,
    })

    const data = await result.json()

    if (result.status !== 201) throw new Error(data)

    const TICKET_ID = data.ticket.id

    const successUrl = new URL('/success', req.url)
    successUrl.searchParams.set('ticket_id', TICKET_ID)

    return res.json({ successUrl }, { status: 201 })
    // return res.redirect(successUrl, 201)
  } catch (error) {
    console.log(error)
    return res.json(error, { status: 400 })
  }
}
