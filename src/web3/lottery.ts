import Web3, { Contract, ContractAbi } from 'web3'

const abi = [
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
    outputs: [[Object]],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [[Object]],
    name: 'hasEntered',
    outputs: [[Object]],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'manager',
    outputs: [[Object]],
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
    inputs: [[Object]],
    name: 'players',
    outputs: [[Object]],
    stateMutability: 'view',
    type: 'function',
  },
]

let web3: Web3 | null = null
let lotteryContract: Contract<ContractAbi> | null = null

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum)
  const lotteryAddress = '0x4a68AC480342F3E2f2FB373d4FF6cf3254c2f8bB'
  lotteryContract = new web3.eth.Contract(abi as ContractAbi, lotteryAddress)
} else {
  console.log('Please install MetaMask!')
}

export { lotteryContract }
