'use client'

import React, { ReactEventHandler } from 'react'
import classnames from 'classnames';

interface BButtonProps {
  children: React.ReactNode,
  type?: 'primary' | 'default',
  full?: boolean,
  onClick?: ReactEventHandler
}

function BButton({type = 'default', full, children, onClick, ...rest}: BButtonProps) {
  // let btnClassName: string[] = []

  // if(type === 'primary') {
  //   btnClassName.push(...['bg-primary text-white round-full text-center h-12'])
  // }

  return (
    <button className=" h-12 bg-primary text-white leading-[3rem] block w-full rounded-full hover:bg-[#14b9c2] focus:bg-[#14b9c2] active:bg-[#14b9c2] font-semibold" onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default BButton