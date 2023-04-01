import { useCallback, useState } from 'react'
import { ethers, utils } from 'ethers'

import { useAppDispatch } from 'state'
import { estimateGas } from 'utils/calls/estimateGas'
import { match } from 'utils/match'
import { useAccount, useChainId } from 'wagmi'
import { useBeeIdoContract } from 'hooks/useContract'
import { fetchBeeIDOData, setBeeIdoUserData } from 'state/beeIdo'
import { useToast } from '@pancakeswap/uikit'
// 1680526805
const useIdo1 = (valueInput: string) => {
  const chainId = useChainId()
  const account = useAccount()
  const [reqPurchase, setReqPurchase] = useState(false)
  const [reqDraw1, setReqDraw1] = useState(false)

  const { toastSuccess, toastError } = useToast()
  const dispatch = useAppDispatch()
  const beeIdoContract = useBeeIdoContract()

  const purchase = useCallback(async () => {
    try {
      setReqPurchase(true)
      const modeFonEth = utils.parseEther(valueInput)
      console.log(modeFonEth)
      // const gasLimit = await estimateGas(beeIdoContract, 'purchase', [{ value: modeFonEth }], {}, 1000)
      const tx = await beeIdoContract.purchase({ value: modeFonEth })
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(`Ido ${valueInput} Purchase Success`)
        setReqPurchase(false)

        const data = await fetchBeeIDOData(chainId, account.address)
        dispatch(setBeeIdoUserData(data))
      } else {
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
        setReqPurchase(false)
      }
    } catch (error) {
      console.log(error)
      setReqPurchase(false)
      toastError('Error', match(error.toString()))
    }
  }, [toastError, toastSuccess, beeIdoContract, dispatch, account])

  const draw1 = useCallback(async () => {
    try {
      setReqDraw1(true)
      // const gasLimit = await estimateGas(beeIdoContract, 'draw1', [], {}, 1000)
      const tx = await beeIdoContract.draw1()
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess('draw1 Success')
        setReqDraw1(false)

        const data = await fetchBeeIDOData(chainId, account.address)
        dispatch(setBeeIdoUserData(data))
      } else {
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
        setReqDraw1(false)
      }
    } catch (error) {
      console.log(error)
      setReqDraw1(false)
      toastError('Error', match(error.toString()))
    }
  }, [toastError, toastSuccess, beeIdoContract, dispatch, account])

  return { reqPurchase, reqDraw1, purchase, draw1 }
}

export const useIdo2 = (valueInput: string) => {
  const chainId = useChainId()
  const account = useAccount()
  const [reqSubscribe, setReqSubscribe] = useState(false)
  const [reqDraw2, setReqDraw2] = useState(false)

  const { toastSuccess, toastError } = useToast()
  const dispatch = useAppDispatch()
  const beeIdoContract = useBeeIdoContract()

  const subscribe = useCallback(async () => {
    try {
      setReqSubscribe(true)
      const modeFonEth = utils.parseEther(valueInput)
      // const gasLimit = await estimateGas(beeIdoContract, 'subscribe', [{ value: modeFonEth }], {}, 1000)
      const tx = await beeIdoContract.subscribe({ value: modeFonEth })
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess(`Ido ${valueInput} Purchase Success`)
        setReqSubscribe(false)

        const data = await fetchBeeIDOData(chainId, account.address)
        dispatch(setBeeIdoUserData(data))
      } else {
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
        setReqSubscribe(false)
      }
    } catch (error) {
      setReqSubscribe(false)
      toastError('Error', match(error.toString()))
    }
  }, [toastError, toastSuccess, beeIdoContract, dispatch, account])

  const draw2 = useCallback(async () => {
    try {
      setReqDraw2(true)
      // const gasLimit = await estimateGas(beeIdoContract, 'draw2', [], {}, 1000)
      const tx = await beeIdoContract.draw2()
      const receipt = await tx.wait()
      if (receipt.status) {
        toastSuccess('Draw2 Success')
        setReqDraw2(false)
        const data = await fetchBeeIDOData(chainId, account.address)
        dispatch(setBeeIdoUserData(data))
      } else {
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!')
        setReqDraw2(false)
      }
    } catch (error) {
      setReqDraw2(false)
      console.log(error)
      toastError('Error', match(error.toString()))
    }
  }, [toastError, toastSuccess, beeIdoContract, dispatch, account])

  return { reqSubscribe, reqDraw2, subscribe, draw2 }
}

export default useIdo1
