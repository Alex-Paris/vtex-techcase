import { NextRequest, NextResponse as res } from 'next/server'

import { FormInputs } from '../_components/Form'
import { base64ToBinary } from '../_functions/base64ToBinary'
import { objectToString } from '../_functions/objectToString'

export async function POST(req: NextRequest) {
  const {
    account,
    email,
    subject,
    orders,
    payments,
    catalog,
    others,
  }: FormInputs = await req.json()

  if (!account || !email || !subject) {
    return res.json({ error: 'Missing data' }, { status: 400 })
  }

  const subjectObj =
    orders || payments || (catalog && { skuId: catalog?.skuId })

  if (!subjectObj) {
    return res.json({ error: 'Missing subject' }, { status: 400 })
  }

  // Convert the object to a string
  const commentText = objectToString({
    account,
    email,
    ...subjectObj,
    detailing: others.detailing,
  })

  try {
    // Credentials
    const credentials = `${process.env.ZEN_AUTH_EMAIL}/token:${process.env.ZEN_AUTH_TOKEN}`
    const encodedCredentials = btoa(credentials)

    // Uploading attachments
    let uploads
    if (catalog && catalog.printOfPage) {
      const uploadUrl = new URL(
        '/api/v2/uploads.json',
        process.env.ZEN_BASE_URL,
      )
      uploadUrl.searchParams.set('filename', catalog.printOfPage.file_name)

      const body = base64ToBinary(catalog.printOfPage.content_binary)

      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          Authorization: `Basic "${encodedCredentials}"`,
        },
        body,
      })

      const data = await result.json()

      if (result.status !== 201) throw new Error(data)

      uploads = [data.upload.token]
    }

    // Creating the ticket
    const ticketUrl = `${process.env.ZEN_BASE_URL}/api/v2/tickets`

    const result = await fetch(ticketUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic "${encodedCredentials}"`,
      },
      body: JSON.stringify({
        ticket: {
          subject,
          comment: {
            body: commentText,
            uploads,
          },
        },
      }),
    })

    const data = await result.json()

    if (result.status !== 201) throw new Error(data)

    const TICKET_ID = data.ticket.id

    // Creating the redirection URL
    const successUrl = new URL('/success', req.url)
    successUrl.searchParams.set('ticket_id', TICKET_ID)

    return res.json({ successUrl }, { status: 201 })
    // return res.redirect(successUrl, 201)
  } catch (error) {
    console.log(error)
    return res.json(error, { status: 400 })
  }
}
