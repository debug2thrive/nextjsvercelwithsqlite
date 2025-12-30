import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const results = db
      .prepare(
        `
        SELECT 
          c.name as colorName,
          COUNT(v.id) as count
        FROM colors c
        LEFT JOIN votes v ON c.id = v.color_id
        GROUP BY c.id, c.name
        ORDER BY c.id
        `
      )
      .all() as Array<{ colorName: string; count: number }>;

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}

