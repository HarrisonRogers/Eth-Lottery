import web3 from '@/web3/web3'
import React from 'react'
import { Contract, ContractAbi } from 'web3'
import { Button } from './ui/button'
import { Input } from './ui/input'

type EnterFormProps = {
  value: string
  // message: string
  setValue: (value: string) => void
  setMessage: (message: string) => void
  contract: Contract<ContractAbi> | null
}

function EnterForm({
  value,
  setValue,
  contract,
  // message,
  setMessage,
}: EnterFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const accounts = await web3.eth.getAccounts()
    if (!accounts || accounts.length === 0) {
      setMessage(
        'No Ethereum accounts found. Please connect your MetaMask wallet'
      )
      return
    }
    console.log(accounts)

    const etherAmount = web3.utils.toWei(value, 'ether')
    setMessage('Waiting for transaction success...')

    await contract?.methods.enter().send({
      from: accounts[0],
      value: etherAmount,
    })

    setMessage('You have been entered into the lottery!')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border rounded max-w-md mx-auto"
    >
      <h4>Want to try your luck?</h4>
      <div className="flex flex-col items-center gap-4">
        <div className="w-full">
          <label htmlFor="value" className="block mb-2">
            Amount of Ethereum to enter
          </label>
          <Input
            className="text-black p-1 w-auto mx-auto"
            id="value"
            type="number"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <Button type="submit">Enter</Button>
      </div>
    </form>
  )
}

export default EnterForm
