import { NextResponse } from 'next/server'
import {parse} from 'querystring';

export async function GET(req: Request) {
  const { password } = parse(req.url)

  const data = {
    status: 200,
    data: {user: '用户模块', reqp: 123}
  }

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  // post的body是一个可读流，需要await
  const body = await req.json()
  return NextResponse.json({res: body})
}