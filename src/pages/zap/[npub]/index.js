import Image from 'next/image'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { BsLightning } from 'react-icons/bs';
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'

import { getUser } from "../../../utils/getKind0"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { npub = "" } = router.query;
  const [ loading, setLoading ] = useState(true)
  const [ profile, setProfile ] = useState({})

  useEffect(() => {          
    const setUser = async (npub) =>{
      const userProfile = await getUser(npub)
      setProfile(userProfile)
    }

    setUser(npub)
    setLoading(false)
  }, [npub]);


  return (
    <main
      className={`flex h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center w-full justify-center">
      <div className="flex flex-col items-center w-full justify-center mb-4">
      <img src={profile.picture} className="rounded-full mb-4 object-cover w-[160px] h-[160px]"/>
      <p className="font-bold text-2xl">{profile.displayName? profile.displayName : profile.display_name}</p>
      <p className="w-[300px] truncate">{npub}</p>
      </div>
        <Script src="https://cdn.jsdelivr.net/npm/nostr-zap-fork@0.21.4"></Script>
          <div id="zap-button" data-npub={npub} data-relays="wss://relay.damus.io,wss://relay.snort.social,wss://nostr.wine,wss://relay.nostr.band" className="cursor-pointer border border-[#FADA5E] p-2 text-sm hover:bg-[#FADA5E] hover:text-black flex items-center w-16">Zap
          <BsLightning className="font-light ml-2 h-4 w-auto" />
          </div>
      </div>
    </main>
  )
}
