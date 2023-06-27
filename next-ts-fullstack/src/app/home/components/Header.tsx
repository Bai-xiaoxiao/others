'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BButton from '@/components/button/BButton'
import axios from 'axios';

const menus = [
	{ name: '首页', href: '/' },
	{ name: '排行榜', href: '/ranks' },
	{ name: '发现', href: '/news' },
	{ name: '动态', href: '/activity' },
	{ name: '论坛', href: '/forum' },
	{ name: '创作者中心', href: '/create' },
]

function Header() {
  const publish = async () => {
    const data = await axios.post('/api/user', {params: {name: 123, password: 998}})
    console.log(data)
  }


	return (
		<header>
			<Link href='/'>
				<Image
					src='https://img2.tapimg.com/bbcode/images/1a667685a3d219cfd780ee3f0592a067.png'
					alt='taptap'
					width={123}
					height={63}
				/>
			</Link>

			<ul className=' list-none m-0 p-0'>
				{menus.map(menu => {
					return (
						<li key={menu.name}>
							<Link
								href={menu.href}
								className=' pl-4 block leading-[3rem] h-full text-gray-800 font-semibold text-lg hover:bg-opacity-5 hover:bg-black rounded-[2.375rem]'
							>
								{menu.name}
							</Link>
						</li>
					)
				})}
			</ul>

      {/* 发布按钮 */}
      <BButton type='primary' onClick={publish}>发布</BButton>
		</header>
	)
}

export default Header
