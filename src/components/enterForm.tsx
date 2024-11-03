import web3 from '@/web3/web3'
import React from 'react'
import { Contract, ContractAbi } from 'web3'

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
    <form onSubmit={handleSubmit}>
      <h4>Want to try your luck?</h4>
      <div className="flex flex-col items-center">
        <div>
          <label htmlFor="value" className="mr-6">
            Amount of Ethereum to enter
          </label>
          <input
            className="text-black p-1"
            id="value"
            type="number"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <button type="submit" className="border border-white mt-3 py-1 px-6">
          Enter
        </button>
      </div>
    </form>
  )
}

export default EnterForm
