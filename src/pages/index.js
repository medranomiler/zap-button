import Image from 'next/image'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { BsLightning } from 'react-icons/bs';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main
      className={`flex h-screen flex-col items-center justify-start p-24 ${inter.className}`}
    >
      <div className="h-1/4 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4 lg:bg-zinc-800/30">
          Get started by clicking the Zap Button
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
      <div className="flex flex-col items-center w-full justify-center">
      <div className="flex flex-col items-center w-full justify-center mb-4">
      <Image src="/pleblabIcon.jpeg" height="100" width="100" className="rounded-full mb-4"/>
      <p>@PlebLab</p>
      <p className="w-96 truncate">npub1an84q6c03wml5lf0uwcqcr20ydwv0t0lvv0xktlcfs9seattef8sdhz6yg</p>
      </div>
        <Script src="https://cdn.jsdelivr.net/npm/nostr-zap-fork@0.21.4"></Script>
          <div id="zap-button" data-npub="npub1an84q6c03wml5lf0uwcqcr20ydwv0t0lvv0xktlcfs9seattef8sdhz6yg" data-relays="wss://relay.damus.io,wss://relay.snort.social,wss://nostr.wine,wss://relay.nostr.band" className="cursor-pointer border border-[#FADA5E] p-2 text-sm hover:bg-[#FADA5E] hover:text-black flex items-center w-16">Zap
          <BsLightning className="font-light ml-2 h-4 w-auto" />
          </div>
      </div>
    </main>
  )
}
