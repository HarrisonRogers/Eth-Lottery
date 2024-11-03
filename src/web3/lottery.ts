import Web3, { Contract, ContractAbi } from 'web3'

const abi: ContractAbi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [],
    name: 'enter',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPlayers',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'hasEntered',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pickWinner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'players',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
]

let web3: Web3 | null = null
let lotteryContract: Contract<ContractAbi> | null = null

async function initializeContract() {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    try {
      web3 = new Web3(window.ethereum)
      const lotteryAddress = '0x7c211DdA405c41f78aAfe2b8799b35A558E60b3d'

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      lotteryContract = new web3.eth.Contract(abi, lotteryAddress)
      console.log('Contract initialized:', lotteryContract)
      return lotteryContract
    } catch (error) {
      console.error('Error initializing contract:', error)
      return null
    }
  } else {
    console.error('MetaMask is not installed!')
    return null
  }
}

export { initializeContract, lotteryContract }
