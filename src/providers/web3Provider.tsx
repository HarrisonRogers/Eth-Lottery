'use client'

// src/components/Web3Provider.tsx
import { useEffect, useState } from 'react'
import { getWeb3 } from '@/web3/getWeb3'
import Web3 from 'web3'

type Web3ProviderProps = {
  children: React.ReactNode
}

export default function Web3Provider({ children }: Web3ProviderProps) {
  const [web3, setWeb3] = useState<Web3 | null>(null)

  useEffect(() => {
    const initializeWeb3 = async () => {
      const web3Instance = await getWeb3()
      setWeb3(web3Instance)
    }

    initializeWeb3()
  }, [])

  if (!web3) {
    return <h1>Please Install MetaMask</h1>
  }

  return <div>{children}</div>
}
