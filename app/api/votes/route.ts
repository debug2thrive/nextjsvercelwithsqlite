import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, colorId } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!colorId || typeof colorId !== 'number') {
      return NextResponse.json(
        { error: 'Valid color ID is required' },
        { status: 400 }
      );
    }

    // Verify color exists
    const color = db.prepare('SELECT id FROM colors WHERE id = ?').get(colorId);
    if (!color) {
      return NextResponse.json(
        { error: 'Invalid color selected' },
        { status: 400 }
      );
    }

    // Insert vote
    const insertVote = db.prepare('INSERT INTO votes (name, color_id) VALUES (?, ?)');
    const result = insertVote.run(name.trim(), colorId);

    return NextResponse.json({
      success: true,
      id: result.lastInsertRowid,
    });
  } catch (error) {
    console.error('Error submitting vote:', error);
    return NextResponse.json(
      { error: 'Failed to submit vote' },
      { status: 500 }
    );
  }
}

