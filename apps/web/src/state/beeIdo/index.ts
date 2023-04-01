import { ChainId } from '@pancakeswap/sdk'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ethers, utils } from 'ethers'
import { getBeeIdoAddress, getMulticallAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import beeIdoAbi from 'config/abi/beeIdo.json'

export const fetchBeeIDOData = async (chainId?: ChainId, acconut?: string) => {
  const _acconut = acconut || ethers.constants.AddressZero

  const calls = [
    {
      address: getBeeIdoAddress(chainId),
      name: 'idoList',
      params: [0],
    },
    {
      address: getBeeIdoAddress(chainId),
      name: 'idoList',
      params: [1],
    },
    {
      address: getMulticallAddress(chainId),
      name: 'getEthBalance',
      params: [_acconut],
    },
    {
      address: getBeeIdoAddress(chainId),
      name: 'userList',
      params: [_acconut, 0],
    },
    {
      address: getBeeIdoAddress(chainId),
      name: 'userList',
      params: [_acconut, 1],
    },
    {
      address: getBeeIdoAddress(chainId),
      name: 'whiteList',
      params: [_acconut],
    },

    {
      address: getBeeIdoAddress(chainId),
      name: 'getBeePending',
      params: [_acconut],
    }
  ]

  const result = await multicallv2({
    abi: beeIdoAbi,
    calls,
    chainId: chainId,
  })
  const [ido1, ido2, balance, user1, user2, isWhite, beePendingList] = result


  return {
    balance: acconut ? Number(utils.formatEther(balance.toString())).toFixed(3) : 0,
    ido1: {
      minCore: Number(utils.formatEther(ido1[0])),
      maxCore: Number(utils.formatEther(ido1[1])),
      totleCollectCore: Number(utils.formatEther(ido1[2])),
      collectCore: Number(utils.formatEther(ido1[3])).toFixed(3),
      coreOrBee: Number(ido1[4].toString()),

      totlePartake: Number(ido1[5].toString()),
      endTime: Number(ido1[6].toString()),
      isEnd: ido1[7] ? ido1[7] : (Number(ido1[6].toString()) < (new Date().valueOf() / 1000)),

      user: acconut
        ? {
            amount: Number(utils.formatEther(user1[0])).toFixed(3),
            isDraw: user1[1],
            isBuy: user1[2],
          }
        : undefined,
    },
    ido2: {
      minCore: Number(utils.formatEther(ido2[0])),
      maxCore: Number(utils.formatEther(ido2[1])),
      totleCollectCore: Number(utils.formatEther(ido2[2])),
      collectCore: Number(utils.formatEther(ido2[3])).toFixed(3),
      coreOrBee: Number(ido2[4].toString()),

      totlePartake: Number(ido2[5].toString()),
      endTime: Number(ido2[6].toString()),
      isEnd: ido2[7] ? ido2[7] : (Number(ido2[6].toString()) < (new Date().valueOf() / 1000))  ,

      fallbackAmount: Number(utils.formatEther(beePendingList[0])).toFixed(5),
      beePending: Number(utils.formatEther(beePendingList[1])).toFixed(3),

      user: acconut
        ? {
            amount: Number(utils.formatEther(user2[0])).toFixed(3),
            isDraw: user2[1],
            isBuy: user2[2],
          }
        : undefined,
    },
    isWhite: acconut ? isWhite[0] : false,
  }
}

interface BeeIdoUserState {
  amount: number
  isDraw: boolean
  isBuy: boolean
}

interface BeeIdoState {
  minCore: number
  maxCore: number
  totleCollectCore: number
  collectCore: number
  coreOrBee: number
  totlePartake: number
  endTime: number
  isEnd: boolean

  beePending?: number
  fallbackAmount?: number

  user: BeeIdoUserState
}

interface IDOState {
  ido1?: BeeIdoState
  ido2?: BeeIdoState
  balance?: number
  isWhite?: boolean
}

const initialState: IDOState = {}

export const IdoSlice = createSlice({
  name: 'beeIdo',
  initialState,
  reducers: {
    setBeeIdoUserData: (state, action) => {
      console.log(action)
      state.ido1 = action.payload.ido1
      state.ido2 = action.payload.ido2
      state.balance = action.payload.balance
      state.isWhite = action.payload.isWhite
    },
  },
})

// Actions
export const { setBeeIdoUserData } = IdoSlice.actions

export default IdoSlice.reducer
