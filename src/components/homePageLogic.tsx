'use client'

import { initializeContract } from '@/web3/lottery'
import web3 from '@/web3/web3'
import React, { useEffect, useState } from 'react'
import EnterForm from './enterForm'
import { Contract, ContractAbi } from 'web3'

function HomePageLogic() {
  const [manager, setManager] = useState<string>('')
  const [players, setPlayers] = useState<string[]>([])
  const [balance, setBalance] = useState<string>('')
  const [value, setValue] = useState<string>('1')
  const [message, setMessage] = useState<string>('')
  const [contract, setContract] = useState<Contract<ContractAbi> | null>(null)
  const [contractInitialized, setContractInitialized] = useState(false)

  useEffect(() => {
    async function loadContractData() {
      const contract = await initializeContract()
      if (!contract) {
        setMessage(
          'Error connecting to the contract. Please make sure MetaMask is connected.'
        )
        return
      }

      try {
        const managerAddress = await contract.methods.manager().call()
        const players = await contract.methods.getPlayers().call()
        const balance = await web3.eth.getBalance(
          String(contract.options.address)
        )

        setManager(String(managerAddress))
        setPlayers(players as string[])
        setBalance(String(balance))
        setContract(contract as unknown as Contract<ContractAbi>)
        setContractInitialized(true)
      } catch (error) {
        console.error('Error loading web3 data:', error)
        setMessage('Error retrieving contract data.')
      }
    }

    loadContractData()
  }, [])

  if (!contractInitialized) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Lottery Contract</h1>
      <p>This contract is managed by: {manager}</p>
      <p>
        There are currently {players.length} people entered into the lottery
      </p>
      <p>
        The lottery pool that is up for grabs is{' '}
        {Number(web3.utils.fromWei(balance, 'ether')).toString()} Eth
      </p>
      <div>
        <EnterForm
          value={value}
          setValue={setValue}
          contract={contract}
          // message={message}
          setMessage={setMessage}
        />
      </div>

      <h1>{message}</h1>
    </>
  )
}

export default HomePageLogic
