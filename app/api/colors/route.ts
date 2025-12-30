import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const colors = db.prepare('SELECT id, name FROM colors ORDER BY id').all();
    return NextResponse.json(colors);
  } catch (error) {
    console.error('Error fetching colors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colors' },
      { status: 500 }
    );
  }
}

