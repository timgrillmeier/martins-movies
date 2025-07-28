import { NextRequest, NextResponse } from 'next/server';
import { searchMovies } from '../../../utils/api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('query') || '';
  const data = await searchMovies({ query, page });
  return NextResponse.json(data);
}
