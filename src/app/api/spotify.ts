import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get('mood');

  const response = await fetch(`http://localhost:5000/spotify/recommendations?mood=${mood}`);
  const data = await response.json();

  return NextResponse.json(data);
}
