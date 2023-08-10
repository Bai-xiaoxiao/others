import React, {
	FC,
	ReactEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react'
import dayjs from 'dayjs'
import styles from './index.module.less'
import isBetween from 'dayjs/plugin/isBetween'
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
		start: '2023-06-28 00:30:00',
		end: '2023-06-28 01:30:00',
		renderContent() {
			return (
				<div style={{ backgroundColor: 'pink' }}>
					<div>我是预定的事件</div>
					<div>
						这里可以放自定义组件 <button>123</button>
					</div>
				</div>
			)
		},
	},
]

// 假设有禁用时段
const disabledTimes = [['2023-06-28 04:00:00', '2023-06-28 05:00:00']]

const DaySchduler: FC = () => {
	const start = useRef<null | number>(null)
	const end = useRef<null | number>(0)
	const [acitveItems, setAcitveItems] = useState<number[]>([])
	const [inited, setInited] = useState(false)

	const emitNewEvent = () => {
		let arr: string[] = []

		if (start.current === null || end.current === null) return

		if (start.current > end.current + 1) {
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
		if (start.current === null) return

		setAcitveItems([...acitveItems, index])
	}

	const onPointerUp = (ev, index) => {
		// console.log('up', ev)
		end.current = index
		emitNewEvent()
	}

	const eventClik = (ev, item) => {
		ev.stopPropagation()
		alert('点击了事件')
	}

	useEffect(() => {
		setInited(true)
	}, [])

	return (
		<>
			<div className={styles.headerRow}>
				{/* header */}
				<div>
					<div style={cellStyle} className={styles.item}>
						&nbsp; &nbsp;
					</div>
					{headerItems.map(item => {
						return (
							<div key={item} style={cellStyle} className={styles.item}>
								{dayjs(item).format('HH:mm')}
							</div>
						)
					})}
				</div>
			</div>

			{/* content */}
			<div className={styles.content}>
				<div style={cellStyle} className={styles.item}>
					会议室11111
				</div>
				{headerItems.map((item, index) => {
					const className = [styles.item]

					if (acitveItems.includes(index)) {
						className.push(styles.active)
					}

          if(disabledTimes.some(arr => dayjs(item).isBetween(arr[0], arr[1]) || dayjs(item).isSame(arr[0]) || dayjs(item).isSame(arr[1]))) {
            className.push(styles.disabled)
          }

					return (
						<div
							key={item}
							style={cellStyle}
							className={className.join(' ')}
							onPointerDown={ev => onPointerDown(ev, index)}
							onPointerMove={ev => onPointerMove(ev, index)}
							onPointerUp={ev => onPointerUp(ev, index)}
						></div>
					)
				})}
			</div>

			{/* events */}
			{inited && (
				<div>
					{events.map((item, index) => {
						const eventStart = headerItems.findIndex(i =>
							dayjs(i).isSame(item.start)
						)
						const eventEnd = headerItems.findIndex(i =>
							dayjs(i).isSame(item.end)
						)
						const startEle = document.querySelectorAll(
							`.${styles.content} .${styles.item}`
						)[eventStart + 1]
						return (
							<div
								style={{
									position: 'absolute',
									left: startEle.offsetLeft + 'px',
									top: '104px',
									height: '100px',
									width: 100 * (eventEnd - eventStart) + 'px',
									backgroundColor: 'pink',
									overflow: 'hidden',
								}}
								onClick={ev => eventClik(ev, item)}
							>
								{item.renderContent()}
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}

export default DaySchduler
