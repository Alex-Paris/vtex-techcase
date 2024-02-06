import Image from 'next/image'

import { Form } from './_components/Form'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Image
          src="/vtex.svg"
          alt="VTex Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none dark:from-black dark:via-black">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://alexparis.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Alex Paris
          </a>
        </div>
      </div>

      <Form />

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left"></div>
    </main>
  )
}
