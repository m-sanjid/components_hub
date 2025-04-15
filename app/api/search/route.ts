import { NextResponse } from 'next/server';
import { searchComponents } from '@/lib/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  const results = await searchComponents(query);
  
  return NextResponse.json(results);
}