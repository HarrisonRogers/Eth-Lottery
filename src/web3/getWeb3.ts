import Web3 from 'web3'

let web3: Web3 | null = null

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>
      isMetaMask?: boolean
    }
  }
}

export const getWeb3 = async (): Promise<Web3 | null> => {
  if (typeof window === 'undefined') {
    console.log('Running on the server - returning null')
    return null
  }

  if (!web3) {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        web3 = new Web3(window.ethereum)
        console.log('Web3 initialized successfully')
      } catch (error) {
        console.error('User denied account access', error)
      }
    } else {
      console.warn('MetaMask is not installed!')
    }
  }

  return web3
}
