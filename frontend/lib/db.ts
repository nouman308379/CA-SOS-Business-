import { Pool } from 'pg';

// Get pool configuration with explicit port handling
function getPoolConfig() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  // Parse the connection string
  try {
    const url = new URL(databaseUrl);
    
    // Use port from URL, or default to 5433 if not specified
    const port = url.port || '5433';
    url.port = port;
    
    const correctedUrl = url.toString();
    console.log('Database connection:', {
      host: url.hostname,
      port: url.port,
      database: url.pathname.slice(1),
      user: url.username
    });
    
    return {
      connectionString: correctedUrl,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    };
  } catch (error) {
    // If URL parsing fails, try using explicit connection parameters
    // Parse manually from connection string format
    const match = databaseUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):?(\d+)?\/(.+)/);
    
    if (match) {
      const [, user, password, host, port, database] = match;
      const dbPort = port ? parseInt(port, 10) : 5433;
      console.log('Database connection (parsed):', {
        host,
        port: dbPort,
        database,
        user
      });
      
      return {
        host: host,
        port: dbPort,
        database: database,
        user: user,
        password: password,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      };
    }
    
    // Fallback: use connection string as-is
    console.warn('Could not parse DATABASE_URL, using as-is');
    return {
      connectionString: databaseUrl,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    };
  }
}

// Create a connection pool
const pool = new Pool(getPoolConfig());

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  // Don't exit process in production - let it handle errors gracefully
  if (process.env.NODE_ENV === 'development') {
    console.error('Database connection error:', err.message);
  }
});

export default pool;

