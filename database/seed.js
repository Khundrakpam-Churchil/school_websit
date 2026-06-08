const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Read database password from args or environment
const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.argv[2];

if (!dbPassword) {
  console.error('Error: Please provide the Supabase database password.');
  console.error('Usage: node database/seed.js <db_password>');
  process.exit(1);
}

// Configuration using Supabase Connection Pooler (IPv4 compatible)
const client = new Client({
  host: 'aws-0-ap-northeast-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.clzhsebfvxhvyhdkrooc',
  password: dbPassword,
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    console.log('Connecting to Supabase PostgreSQL database via IPv4 Pooler...');
    await client.connect();
    console.log('Connected successfully!');

    console.log('Reading schema file...');
    const schemaPath = path.join(__dirname, 'postgres_schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema migration...');
    await client.query(schemaSql);
    console.log('Schema migration completed successfully.');

    console.log('Reading sample data file...');
    const sampleDataPath = path.join(__dirname, 'postgres_sample_data.sql');
    const sampleDataSql = fs.readFileSync(sampleDataPath, 'utf8');

    console.log('Executing sample data insertion...');
    await client.query(sampleDataSql);
    console.log('Sample data seeded successfully.');

    console.log('\nVerifying table rows:');
    const tables = ['admins', 'students', 'studentfees', 'notices', 'gallery'];
    for (const table of tables) {
      const res = await client.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`Table "${table}": ${res.rows[0].count} rows`);
    }

    console.log('\n🎉 Supabase Database is now fully seeded and ready for the demo!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  } finally {
    await client.end();
  }
}

run();
