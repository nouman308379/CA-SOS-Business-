import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { SearchResult } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 25;
    const offset = (page - 1) * limit;

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Check database connection
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set');
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    // Search by entity name using ILIKE for case-insensitive partial matching
    const searchQuery = `%${query.trim()}%`;
    
    const result = await pool.query<SearchResult>(
      `SELECT 
        entity_number, 
        entity_name, 
        status, 
        formation_date, 
        entity_type
      FROM business_entities 
      WHERE entity_name ILIKE $1
      ORDER BY entity_name
      LIMIT $2 OFFSET $3`,
      [searchQuery, limit, offset]
    );

    // Get total count for pagination
    const countResult = await pool.query(
      `SELECT COUNT(*) as total
      FROM business_entities 
      WHERE entity_name ILIKE $1`,
      [searchQuery]
    );

    const total = parseInt(countResult.rows[0].total, 10);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      results: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

