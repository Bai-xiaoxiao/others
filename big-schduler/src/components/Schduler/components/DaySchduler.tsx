import React, { FC, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import styles from './index.module.less'
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween)

const headerItems: string[] = []
const start = dayjs().startOf('day')
for (let i = 0; i < 24; i += 0.5) {
	const timeStr = start.add(i, 'hour').format('YYYY-MM-DD HH:mm:ss')
  headerItems.push(timeStr)
  // if(i < 1) {
  //   headerItems.push(timeStr.replace('12', '00'))
  // } else {
  //   headerItems.push(timeStr)
  // }
}
const cellStyle = {
	width: '100px',
}

// 假设有预定的事件
const events = [
  {
    start: '2023-06-28 02:30:00',
    end: '2023-06-28 05:00:00',
    renderContent() {
      return <div style={{backgroundColor: 'pink'}}>
        <div>我是预定的事件，时间段是02:30 - 05:00</div>
      </div>
    }
  },
  {
    start: '2023-06-28 08:30:00',
    end: '2023-06-28 15:00:00',
    renderContent() {
      return <div style={{backgroundColor: 'pink'}}>
        <div>我是预定的事件，时间段是02:30 - 05:00</div>
      </div>
    }
  }
]

const DaySchduler: FC = () => {
  const start = useRef<null | number>(null)
  const end = useRef<null | number>(0)
  const [acitveItems, setAcitveItems] = useState<number[]>([])
  const [inited, setInited] = useState(false)

  const emitNewEvent = () => {
    let arr: string[] = []

    if(start.current === null || end.current === null) return

    if(start.current > end.current + 1) {
      arr = [headerItems[end.current], headerItems[start.current + 1]]
    } else {
      arr = [headerItems[start.current], headerItems[end.current + 1]]
    }
    console.log('触发预定事件', arr)
    alert('触发预定事件')

    start.current = null
    end.current = null
    setAcitveItems([])
  }

  const onPointerDown = (ev, index) => {
    // console.log('down', ev)
    start.current = index
    setAcitveItems([...acitveItems, index])
  }

  const onPointerMove = (ev, index) => {
    // console.log('move', ev)
    if(start.current === null) return

    setAcitveItems([...acitveItems, index])
  }

  const onPointerUp = (ev, index) => {
    // console.log('up', ev)
    end.current = index
    emitNewEvent()
  }

  useEffect(() => {
    console.log(123)
    setInited(true)
  }, [])

	return (
		<div className={styles.headerRow}>
			{/* header */}
			<div>
        {headerItems.map(item => {
          return (
            <div key={item} style={cellStyle} className={styles.item}>
              {dayjs(item).format('HH:mm')}
            </div>
          )
        })}
      </div>

      {/* content */}
      <div className='content'>
        {headerItems.map((item, index) => {
          const className = [styles.item];

          if(acitveItems.includes(index)) {
            className.push(styles.active)
          }

          const eventObj = events.find(i => dayjs(item).isBetween(i.start, i.end))
          if(eventObj) {
            className.push(styles.hasEvent)
          }

          return (
            <div key={item} style={cellStyle} className={className.join(' ')} onPointerDown={(ev) => onPointerDown(ev, index)} onPointerMove={(ev) => onPointerMove(ev, index)} onPointerUp={ev => onPointerUp(ev, index)}>
              {/* {eventObj ? } */}
            </div>
          )
        })}
      </div>

      {/* events */}
      {
        inited && (
          <div>
        {
          events.map((item, index) => {
            const eventStart = headerItems.findIndex(i => dayjs(i).isSame(item.start))
            const eventEnd = headerItems.findIndex(i => dayjs(i).isSame(item.end))
            const startEle = document.querySelectorAll(`.content .${styles.item}`)[eventStart]
            return (
              <div style={{
                position: 'absolute',
                left: startEle.offsetLeft + 'px',
                top: '100px',
                height: '100px',
                width: 100 * (eventEnd - eventStart) + 'px',
                backgroundColor: 'pink'
              }}>
                {item.renderContent()}
              </div>
            )
          })
        }
      </div>
        )
      }
      
		</div>
	)
}

export default DaySchduler
