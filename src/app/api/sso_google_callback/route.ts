import { AuthJWTLSKey } from '@/app/global'
import { redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server'


export const runtime = "edge"

export async function GET(req: NextRequest) {
  // if (req.method !== 'GET') {
  //   return jsonResponse(405, { error: { message: 'Method not allowed' } })
  // }
  const url = new URL(req.url);
  const token = url.searchParams.get("id") || "";
  // const res = jsonResponse(200, 'https://dashboard.oneblock.vn/');
  let res = NextResponse.redirect('https://dashboard.oneblock.vn/');
   if  (url.hostname !== '0.0.0.0') {
    res = NextResponse.redirect(url.protocol  +  '//'  + url.hostname);
  }
  await setUserCookie(res, token);
  return res;
}

const expire = (req: NextRequest): NextResponse =>  {
    if (req.method !== 'POST') {
      return jsonResponse(405, { error: { message: 'Method not allowed' } })
    }
    return expireUserCookie(jsonResponse(200, { success: true }))
  }

const setUserCookie =  async (res: NextResponse, token:string):Promise<NextResponse> =>{
    await res.cookies.set(AuthJWTLSKey, token, {
    httpOnly: true,
    maxAge: 86400*7, // 2 hours in seconds
    })

    return res
}

const expireUserCookie = (res: NextResponse):NextResponse => {
res.cookies.set(AuthJWTLSKey, '', { httpOnly: true, maxAge: 0 })
return res
}

const jsonResponse= (status: number, data: any, init?: ResponseInit): NextResponse =>  {
    return new NextResponse(JSON.stringify(data), {
      ...init,
      status,
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json',
      },
    })
  }
