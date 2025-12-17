// Test database connection script
// Run with: node scripts/test-db-connection.js
// Make sure DATABASE_URL is set in .env.local

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim();
    }
  });
}

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  console.error('Please create .env.local with:');
  console.error('DATABASE_URL=postgresql://web_app_user:SecureWeb2025@64.227.88.234:5432/ca_sos_entities');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
});

async function testConnection() {
  console.log('Testing database connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'NOT SET');
  
  if (process.env.DATABASE_URL) {
    // Hide password in log
    const url = new URL(process.env.DATABASE_URL);
    console.log('Host:', url.hostname);
    console.log('Port:', url.port || '5432 (default)');
    console.log('Database:', url.pathname.slice(1));
  }

  try {
    const result = await pool.query('SELECT NOW() as current_time, COUNT(*) as total FROM business_entities LIMIT 1');
    console.log('\n✅ Connection successful!');
    console.log('Current time:', result.rows[0].current_time);
    console.log('Total entities:', result.rows[0].total);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\nPossible issues:');
      console.error('1. Firewall blocking port 5432');
      console.error('2. Your IP address not whitelisted on database server');
      console.error('3. Database server not accessible from your network');
      console.error('4. VPN or network restrictions');
    }
    
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();

