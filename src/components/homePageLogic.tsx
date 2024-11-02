'use client'

import { lotteryContract } from '@/web3/lottery'
import React, { useEffect, useState } from 'react'
import web3 from '@/web3/web3'

function HomePageLogic() {
  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState<string[]>([''])
  const [balance, setBalance] = useState('')
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadWeb3() {
      const manager = await lotteryContract?.methods.manager().call()
      const lotteryPlayers = await lotteryContract?.methods.getPlayers().call()
      const balance = await web3.eth.getBalance(
        String(lotteryContract?.options.address)
      )

      setManager(String(manager))
      setPlayers(lotteryPlayers as string[])
      setBalance(String(balance))
    }

    loadWeb3()
  }, [])
  return <div>Beans</div>
}

export default HomePageLogic
