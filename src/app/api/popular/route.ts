import { NextRequest, NextResponse } from 'next/server';
import { getPopularMovies } from '../../../utils/api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const data = await getPopularMovies({ page });
  return NextResponse.json(data);
}
