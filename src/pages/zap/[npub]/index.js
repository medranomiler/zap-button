import Image from 'next/image'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { BsLightning } from 'react-icons/bs';
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { convertToHex } from '@/utils/nostr-tools';
import { SimplePool } from 'nostr-tools';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { npub = "" } = router.query;
  const [ profile, setProfile ] = useState({})
  const relays = [
    'wss://relay.damus.io',
    'wss://relay.primal.net',
    'wss://relay.snort.social',
    'wss://relay.current.fyi',
    'wss://relay.nostr.band',
    'wss://offchain.pub'
  ];


  useEffect(() => {
    const fetchKind0 = async () => {
      const pool = new SimplePool();
      let sub = pool.sub(relays, [
        {
          kinds: [0],
          authors: [convertToHex(npub)],
        },
      ]);

      sub.on("event", (event) => {
        if (event.kind !== 0) {
          return;
        }
        if (!event.content) {
          console.error("!event.content")
        } else {
          const parsedContent = JSON.parse(event.content);
          event.content = parsedContent;
          setProfile(event.content)
        }
      });

      sub.on("eose", () => {
        console.log("no more events");
        sub.unsub();
      });
    };

    fetchKind0();
  }, [npub]);



  return (
    <main
      className={`flex h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
    <div className="absolute top-0 left-0 w-1/2 h-full">
      <svg className="w-full animate-pulse" fill="#FADA5E" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 483">
        <polygon  points="0 24.67 56.58 107.25 56.58 113.28 54.29 117.97 55.05 125.48 56.58 118.83 59.64 113.68 60.4 105.1 81.81 105.1 81.81 120.22 90.99 135.13 84.87 152.29 92.52 160.87 88.69 150.15 97.87 132.99 85.63 120.12 87.16 105.1 118.51 106.18 135.33 187.69 148.33 194.12 153.68 205.92 150.62 190.9 139.92 186.61 139.15 175.89 201.85 183.4 225.55 228.44 231.67 230.58 233.2 237.02 239.52 237.02 248.17 244.53 239.32 275.63 259.96 296.01 262.25 327.11 253.66 327.11 264.55 335.69 266.08 344.27 282.9 337.83 287.48 349.63 304.31 356.07 308.13 396.82 301.66 396.82 339.48 412.91 339.48 427.8 329.54 430.07 338.71 432.21 339.48 446.37 380 483 358.59 456.88 362.41 445.08 353.24 452.59 345.59 442.94 345.59 401.11 341.77 405.4 321.89 400.04 321.89 390.39 333.36 381.81 331.07 374.3 329.54 378.59 319.6 389.31 315.77 398.96 313.48 368.94 295.13 308.88 303.54 348.56 291.31 347.49 283.66 332.47 268.37 337.83 265.31 329.25 265.31 291.72 243.94 272.41 254.61 275.63 269.13 267.05 254.61 270.27 246.96 263.83 257.67 240.24 230.14 222 214.85 187.69 305.84 217.71 233.2 185.54 257.67 173.74 260.72 154.44 264.55 159.8 272.96 154.44 264.55 154.44 262.25 149.08 266.84 128.7 295.13 140.5 292.07 134.06 300.48 100.81 341.01 56.84 298.19 96.52 286.72 131.92 286.72 108.32 282.9 127.63 263.78 120.12 253.84 164.09 243.9 171.6 241.61 155.51 240.85 171.6 223.26 182.32 191.15 171.6 139.15 167.31 137.63 157.66 158.27 155.51 175.86 129.77 196.5 141.57 234.73 116.9 196.5 134.06 172.03 122.26 155.98 148 136.1 146.93 128.45 98.67 138.39 94.38 142.98 80.44 151.39 75.07 139.92 78.29 134.57 91.16 61.17 91.16 45.88 68.64 66.52 43.97 73.4 46.12 81.05 50.41 87.16 42.9 78.75 45.04 64.99 36.46 43.58 63.28 0 0 0 24.67"/>
      </svg>
    </div>

      <div className="flex flex-col items-center w-full justify-center z-10">
      <div className="flex flex-col items-center w-full justify-center mb-4">
      <img src={profile.picture} className="rounded-full mb-4 object-cover w-[160px] h-[160px]"/>
      <p className="font-bold text-2xl">{profile.displayName? profile.displayName : profile.display_name}</p>
      <p className="w-[300px] truncate">{npub}</p>
      </div>
        <Script src="https://cdn.jsdelivr.net/npm/nostr-zap-fork@0.21.4"></Script>
          <div id="zap-button" data-npub={npub} data-relays="wss://relay.damus.io,wss://relay.snort.social,wss://nostr.wine,wss://relay.nostr.band, wss://relay.primal.net" className="bg-black cursor-pointer border border-[#FADA5E] p-2 text-sm hover:bg-[#FADA5E] hover:text-black flex items-center w-16">Zap
          <BsLightning className="font-light ml-2 h-4 w-auto" />
          </div>
      </div>
    </main>
  )
}
