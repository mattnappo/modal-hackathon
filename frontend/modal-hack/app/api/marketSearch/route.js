import { NextResponse } from 'next/server'
 
export async function GET(request) {
  const params = new URL(request.nextUrl).searchParams;
  const prompt = params.get('prompt');

  const res = await fetch(`http://localhost:5000/marketSearch?prompt=${prompt}`);
  console.log(res)

  const data = await res.json();
  return NextResponse.json({ data })
}
