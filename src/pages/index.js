import { Inter } from 'next/font/google'
import { useRef, useState } from "react"
import Link from "next/link"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const npubRef = useRef(null)
  const [npub, setNpub ] = useState('')

  return (
    <main
      className={`flex h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <div className="h-1/4 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4 lg:bg-zinc-800/30">
          Get started by entering a nostr npub
        </p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t  from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://primal.net/p/npub1t4s73mnwahenrl3l083mfj3hr5jgd0f8twauxhdsc0v0q0u5478sxek2x9"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            @BTCRETRIEVER
          </a>
        </div>

      </div>
      <div className="flex flex-col items-center max-w-full">
        <input 
          className="border-b bg-gradient-to-b backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit static rounded-xl border p-4 lg:bg-zinc-800/30 w-96 mb-4 truncate" 
          ref={npubRef}   
          onChange={(e) => {
            setNpub(e.target.value);
          }}
          value={npub}
        />
        <button className="py-2 px-4 border border-neutral-800 hover:bg-zinc-800/30 rounded-lg"><Link href={`/zap/${npub}`}>Enter</Link></button>
        </div>
    </main>
  )
}
