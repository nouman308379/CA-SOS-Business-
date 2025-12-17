import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    // Test database connection
    const result = await pool.query('SELECT NOW() as current_time, COUNT(*) as total_entities FROM business_entities LIMIT 1');
    
    return NextResponse.json({
      status: 'healthy',
      database: {
        connected: true,
        currentTime: result.rows[0].current_time,
        totalEntities: result.rows[0].total_entities,
      },
    });
  } catch (error) {
    console.error('Health check error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      status: 'unhealthy',
      database: {
        connected: false,
        error: errorMessage,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      },
    }, { status: 500 });
  }
}

