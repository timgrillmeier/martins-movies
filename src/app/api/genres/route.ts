import { NextRequest, NextResponse } from 'next/server';
import { getMovieGenres } from '../../../utils/api';

export async function GET() {
  const data = await getMovieGenres();
  return NextResponse.json(data);
}
