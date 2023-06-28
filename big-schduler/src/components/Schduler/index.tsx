import React, { FC } from 'react'
import DaySchduler from './components/DaySchduler';

interface PropsInterface {
  type?: 'day' | 'month'
}

const Schduler: FC<PropsInterface> = (props) => {
  const {type = 'day'} = props

  return (
    type === 'day' ? <DaySchduler /> : null
  )
}

export default Schduler