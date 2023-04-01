import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const MainDown = styled.div`
  display: inline-block;
  /* margin-bottom: -22px; */
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 0px;
    font-size: 13px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    /* margin-top: 8px; */
    font-size: 100%;
  }

  /* margin-top: 10px !important; */
  margin-bottom: -1px;

  .time-body {
    .time {
      /* background: linear-gradient(90deg, #524a66, #28213b) !important; */

      display: inline-block;
      line-height: 30px;
      padding: 0px 2px;
      margin-right: 10px;
      border-radius: 5px;

      text-align: center;
      height: 20px;
      width: auto;
      font-size: 12px;
      line-height: 20px;
      color: #fff;
      font-weight: 500;

      div {
        display: inline-block;
        width: 8px;
        text-align: center !important;
      }
    }
  }
`


interface PropsPrams {
  // color: string
  endTime: number
  type: string
  timeOver: () => void
}

/* eslint-disable */
const CountDown: React.FC<PropsPrams> = (props) => {
  const [state, setState] = useState({ day: '00', hour: '00', minute: '00', second: '00' })

  let timer
  const countFun = (end_time) => {
    // const end_time = new Date(time).getTime()
    let sys_second = end_time - new Date().getTime()

     timer = setInterval(() => {
      //防止倒计时出现负数
      if (sys_second > 1000) {
        sys_second -= 1000
        let day = Math.floor(sys_second / 1000 / 3600 / 24)
        let hour = Math.floor((sys_second / 1000 / 3600) % 24)
        let minute = Math.floor((sys_second / 1000 / 60) % 60)
        let second = Math.floor((sys_second / 1000) % 60)
        setState({
          day: day < 10 ? '0' + day : day + '',
          hour: hour < 10 ? '0' + hour : hour + '',
          minute: minute < 10 ? '0' + minute : minute + '',
          second: second < 10 ? '0' + second : second + '',
        })
      } else {
        clearInterval(timer)
        //倒计时结束时，触发父组件的方法
        if (props.timeOver) {
          props.timeOver()
        }
      }
    }, 1000)
  }

  useEffect(() => {
    if (props.endTime) {
      countFun(props.endTime)
    }else{
      setState({ day: '00', hour: '00', minute: '00', second: '00' })
    }

    return () => {
      clearInterval(timer)
    }
  }, [props])

  return (
    <MainDown>
      {' '}
      <div className="time-body">
        <div className="time">
          {state.day.split('').map((a, index) => {
            return <div key={index}>{a}</div>
          })}
        </div>
        <div className="time">
          {state.hour.split('').map((a, index) => {
            return <div key={index}>{a}</div>
          })}
        </div>
        <div className="time">
          {state.minute.split('').map((a, index) => {
            return <div key={index}>{a}</div>
          })}
        </div>
        <div className="time">
          {state.second.split('').map((a, index) => {
            return <div key={index}>{a}</div>
          })}
        </div>
      </div>
    </MainDown>
  )
}

export default CountDown
