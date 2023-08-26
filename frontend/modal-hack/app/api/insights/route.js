import { NextResponse } from 'next/server'
 
export async function GET(request) {
  const params = new URL(request.nextUrl).searchParams;
  const link = params.get('url');

  const res = await fetch(`http://localhost:5000/insights?url=${link}`);

  const data = await res.json();
  return NextResponse.json({ data })
}