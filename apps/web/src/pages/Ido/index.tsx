import styled from 'styled-components'
import { Button, Input, Progress } from 'antd'
import { useAppDispatch, useAppSelector, useStore } from 'state'
import { useAccount, useChainId } from 'wagmi'
import { useEffect, useState } from 'react'
import { fetchBeeIDOData, setBeeIdoUserData } from 'state/beeIdo'
import useIdo1, { useIdo2 } from './hooks'
import CountDown from './components/CountDown'

const IDOHTML = styled.div`
  width: 100%;
  margin: 0px auto;
  position: relative;
  .main {
    width: 1100px;
    height: auto;

    ${({ theme }) => theme.mediaQueries.xs} {
      width: 100%;
      position: none;
      top: 0%;
      left: 0%;
      transform: none;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 1100px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 50%);
    }
  }
  .ido {
    padding: 32px;
    background-color: #fff;
    width: 340px;
    border-radius: 20px;
    height: 451px;
    /* float: left; */
    ${({ theme }) => theme.mediaQueries.xs} {
      margin: 20px 0px;
      display: block;
      margin: 20px auto;
      float: none;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      margin: 0px 20px;
      display: inline-block;
      float: left;
    }
    p .title {
      font-weight: 600;
      font-size: 20px;
    }

    .pa {
      height: 1px;
      width: 100%;
      background-color: #fffad0;
      margin: 10px 0px 30px 0px;
    }
    .pa1 {
      height: 1px;
      width: 100%;
      background-color: #fffad0;
      margin: -10px 0px 10px 0px;
    }
    .progress {
      padding: 20px 0px;
      font-family: 'Courier New', Courier, monospace;
      .s1 {
        font-size: 13px;
        span {
          float: right;
        }
      }
      .edu {
        font-size: 12px;
        color: #ffa500;
        span:nth-child(2) {
          float: right;
        }
      }
    }

    .purchase {
      .balance {
        font-size: 14px;
        line-height: 18px;

        .ant-input-focused {
          border: 1px solid #fea803;
        }
      }
      .edu {
        font-size: 10px;
        color: #e45d25;
      }
    }
    .claimable {
      margin-top: 30px;
      font-size: 12px;
      line-height: 18px;
      > div > span {
        float: right;
      }
    }
    .claimable1 {
      margin-top: 8px;
    }
  }

  .ido2 {
    display: inline-block;
    width: 340px;
    height: 451px;
    margin: 0px auto;
    ${({ theme }) => theme.mediaQueries.xs} {
      display: block;
      margin: 0px auto;
      float: none;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      display: inline-block;
      float: left;
    }
    .tp {
      width: 100%;
      height: 100%;
      position: relative;
    }
    /* position: relative; */
    .info {
      width: 100%;
      position: absolute;
      bottom: 0px;
      font-size: 14px;
      line-height: 34px;
      border-radius: 20px;
      background-color: #fff;

      padding: 32px;
      color: #000;
      p {
        border-bottom: 1px solid #fffad0;
      }
      p > span {
        float: right;
        color: #ffa500;
      }
    }

    .white {
      position: absolute;
      top: 0px;
      width: 100%;
      background-color: #fff;
      border-radius: 20px;
      padding: 32px;
      text-align: center;
      margin-bottom: 36px;
    }
  }
`

const IdoProgress = styled(Progress)`
  .ant-progress-inner {
    background-color: #fefdcf;
  }
  .ant-progress-bg {
    height: 12px;
  }
`

const IdoInput = styled(Input)`
  padding-top: 0px;
  padding-bottom: 0px;
  border-radius: 10px;
  border: 1px solid #fea80388 !important;

  :hover {
    border: 1px solid #fea803 !important;
    box-shadow: 0 0 0 2px rgb(236 230 194 / 10%);
  }

  .ant-input-suffix {
    color: #fea803;
    font-weight: 600;
  }
  span > div {
    cursor: pointer;
  }
  .ant-input {
    height: 38px;
    border: 1px solid #ece6c2;
    border-radius: 10px !important;
    border-right: none;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    /* :hover {
      border: 1px solid #fea803;
      border-right: none;
      box-shadow: 0 0 0 2px rgb(236 230 194 / 10%);
    } */
  }

  .ant-input-group-addon {
    border: 1px solid #ece6c2;
    background: none;
    color: #fea803;
    cursor: pointer;
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    :hover {
      border: 1px solid #fea803;
      border-right: none;
      box-shadow: 0 0 0 2px rgb(236 230 194 / 10%);
    }
  }
  /* box-shadow: 0 0 0 2px rgb(236 230 194 / 10%); */
`

const IDoButton = styled(Button)`
  width: 100%;
  height: 42px;
  background-color: #fea803;
  font-weight: 500;
  border-radius: 10px;

  margin-top: 20px;
  :hover {
    opacity: 0.5;
    border: 1px solid #fea803 !important;
    color: #000 !important;
    box-shadow: 0 0 0 2px rgb(236 230 194 / 10%);
  }
`

const Div = styled.div``

const Ido = () => {
  const chanid = useChainId()
  const account = useAccount()
  const dispatch = useAppDispatch()
  const store = useAppSelector((state) => state.beeIdo)

  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')

  const { reqPurchase, reqDraw1, purchase, draw1 } = useIdo1(inputValue1 || '0')
  const { reqSubscribe, reqDraw2, subscribe, draw2 } = useIdo2(inputValue2 || '0')

  useEffect(() => {
    const init = async () => {
      const reult = await fetchBeeIDOData(chanid, account.address)
      dispatch(setBeeIdoUserData(reult))
    }
    init()
  }, [])

  // 169414 "1680440400000"
  // console.log(new Date().valueOf())
  // console.log(1680357336558)
  // console.log((1680526805000 - new Date().valueOf()) / 1000 )
  return (
    <IDOHTML>
      <div className="main">
        <div className="ido">
          <span className="title">BEE whitelist</span>
          <div className="progress">
            <div className="s1">
              BEESWAP <span>{Number((store.ido1?.collectCore * 100) / store.ido1?.totleCollectCore).toFixed(3)}%</span>
            </div>
            <IdoProgress
              percent={(store.ido1?.collectCore * 100) / store.ido1?.totleCollectCore}
              showInfo={false}
              strokeColor={'#fea803'}
            />
            <div className="edu">
              <span>{store.ido1?.collectCore || 0} CORE</span>
              <span>{store.ido1?.totleCollectCore || 0} CORE</span>
            </div>
          </div>
          <div className="pa"></div>
          <div className="purchase">
            <div className="balance">
              <span>balance: {store?.balance || 0}</span>
              <IdoInput
                value={inputValue1}
                onChange={(e) => setInputValue1(e.target.value)}
                suffix={
                  <Div
                    onClick={() => {
                      setInputValue1(`${store.balance || 0}`)
                    }}
                  >
                    MAX
                  </Div>
                }
              />
            </div>
            <IDoButton loading={reqPurchase} disabled={reqPurchase || store.ido1?.isEnd || (1680440400000 > new Date().valueOf())} onClick={purchase}>
              Purchase
            </IDoButton>
          </div>

          <div className="claimable">
            <div>
              Claimable Bee
              <span>{Number(store.ido1?.user?.amount || 0) * 100}</span>
            </div>
            <IDoButton disabled={!store.ido1?.isEnd} style={{ backgroundColor: '#fdd17a' }} onClick={draw1}>
              {(1680440400000 > new Date().valueOf()) ? (
                <CountDown endTime={1680440400000} type={null} timeOver={null} />
              ) : (
                <span>Draw</span>
              )}
            </IDoButton>
          </div>
        </div>
        <div className="ido2">
          <div className="tp">
            <div className="white">
              <span>Is it on the white list?</span>
              <div>
                <IDoButton disabled={!store.isWhite}>YES</IDoButton>
                <IDoButton disabled={store.isWhite}>NO</IDoButton>
              </div>
            </div>
            <div className="info" style={{ backgroundColor: 'none' }}>
              <p>
                Pre Sale Price: <span>1 CORE={store.ido1?.coreOrBee || 150} BEE</span>
              </p>
              <p>
                Minimun Buy: <span>{store.ido1?.minCore || 1} CORE</span>
              </p>
              <p>
                Maximun Buy <span>{store.ido1?.maxCore || 300} CORE</span>
              </p>
              <p>
                My Maximun Buy <span>{store.ido1?.user?.amount || 0} CORE</span>
              </p>
            </div>
          </div>
        </div>
        <div className="ido">
          <span className="title">Oversubscription</span>
          <div className="progress">
            <div className="s1">
              BEESWAP <span>{Number((store.ido2?.collectCore * 100) / store.ido2?.totleCollectCore).toFixed(3)}%</span>
            </div>
            <IdoProgress
              percent={(store.ido2?.collectCore * 100) / store.ido2?.totleCollectCore}
              showInfo={false}
              strokeColor={'#fea803'}
            />
            <div className="edu">
              <span>{store.ido2?.collectCore || 0} CORE</span>
              <span>{store.ido2?.totleCollectCore || 0} CORE</span>
            </div>
            <div className="edu"> Soft top: 50000 CORE</div>
          </div>
          <div className="pa1"></div>
          <div className="purchase">
            <div className="balance">
              <span>balance: {store?.balance || 0}</span>
              <IdoInput
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
                suffix={
                  <Div
                    onClick={() => {
                      setInputValue2(`${store.balance || 0}`)
                    }}
                  >
                    MAX
                  </Div>
                }
              />
            </div>
            <IDoButton loading={reqSubscribe} disabled={reqSubscribe || store.ido1?.isEnd || (1680440400000 > new Date().valueOf())} onClick={subscribe}>
              Subscrilbe
            </IDoButton>
            <span className="edu">(Descripiton: Automatic return of over 50000 CORE)</span>
          </div>

          <div className="claimable claimable1">
            <div>
              Fallback CORE <span>{store.ido2?.fallbackAmount || 0}</span>
            </div>
            <div>
              Bee received quantity:
              <span>{store.ido2?.beePending || 0}</span>
            </div>
            <IDoButton disabled={!store.ido2?.isEnd || reqDraw2} onClick={draw2} style={{ backgroundColor: '#fdd17a' }}>
              {(1680440400000 > new Date().valueOf()) ? (
                <CountDown endTime={1680440400000} type={null} timeOver={null} />
              ) : (
                <span>Receive</span>
              )}
            </IDoButton>
          </div>
        </div>
      </div>
    </IDOHTML>
  )
}

export default Ido
