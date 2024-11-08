'use client'

import { initializeContract } from '@/web3/lottery'
import web3 from '@/web3/web3'
import React, { useEffect, useState } from 'react'
import EnterForm from './enterForm'
import { Contract, ContractAbi } from 'web3'
import { Button } from './ui/button'

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

  const handleClick = async () => {
    const accounts = await web3.eth.getAccounts()

    setMessage('Waiting for transaction success...')

    await contract?.methods.pickWinner().send({
      from: accounts[0],
    })

    setMessage('A winner has been picked!')
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-2">Lottery Contract</h1>
      <p className="mb-10">This contract is managed by: {manager}</p>
      <div className="flex  justify-center flex-row gap-8 mb-8">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">People Entered</p>
          <p className="text-3xl font-bold">{players.length}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Lottery Pool</p>
          <p className="text-3xl font-bold">
            {Number(web3.utils.fromWei(balance, 'ether')).toString()} ETH
          </p>
        </div>
      </div>
      <div>
        <EnterForm
          value={value}
          setValue={setValue}
          contract={contract}
          // message={message}
          setMessage={setMessage}
        />
      </div>

      {/* Pick a winner button */}
      <div className="mt-10 border rounded p-3 flex flex-col items-center justify-center max-w-md mx-auto">
        <h4>Ready to pick a winner?</h4>
        <Button variant={'outline'} onClick={handleClick} className="mt-4">
          Pick a winner
        </Button>

        <h1 className="text-xl mt-4">{message}</h1>
      </div>
    </>
  )
}

export default HomePageLogic
