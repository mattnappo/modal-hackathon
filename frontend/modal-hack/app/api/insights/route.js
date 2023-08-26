import { NextResponse } from 'next/server'
 
export async function GET(request) {
  //const res = await fetch('');
  //const data = await res.json()

  const params = new URL(request.nextUrl).searchParams;
  const link = params.get('url');

  const data = { proc: `hi from ${link}` };

  // const data = 
 
  return NextResponse.json({ data })
}