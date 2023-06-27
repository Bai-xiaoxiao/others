import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const data = {
    status: 200,
    data: {user: '登录接口'}
  }

  return NextResponse.json(data)
}