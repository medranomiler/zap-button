import Image from 'next/image'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { BsLightning } from 'react-icons/bs';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main
      className={`flex h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center w-full justify-center">
      <div className="flex flex-col items-center w-full justify-center mb-4">
      <Image src="/pleblabIcon.jpeg" height="100" width="100" className="rounded-full mb-4"/>
      <p>@PlebLab</p>
      <p className="w-[300px] truncate">npub1an84q6c03wml5lf0uwcqcr20ydwv0t0lvv0xktlcfs9seattef8sdhz6yg</p>
      </div>
        <Script src="https://cdn.jsdelivr.net/npm/nostr-zap-fork@0.21.4"></Script>
          <div id="zap-button" data-npub="npub1an84q6c03wml5lf0uwcqcr20ydwv0t0lvv0xktlcfs9seattef8sdhz6yg" data-relays="wss://relay.damus.io,wss://relay.snort.social,wss://nostr.wine,wss://relay.nostr.band" className="cursor-pointer border border-[#FADA5E] p-2 text-sm hover:bg-[#FADA5E] hover:text-black flex items-center w-16">Zap
          <BsLightning className="font-light ml-2 h-4 w-auto" />
          </div>
      </div>
    </main>
  )
}
