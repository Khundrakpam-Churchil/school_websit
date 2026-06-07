const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFile = path.join(__dirname, '../database/school_exam_portal.db');
const schemaFile = path.join(__dirname, '../database/schema.sql');
const sampleDataFile = path.join(__dirname, '../database/sample_data.sql');

function loadSqlFile(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf8' });
}

function runSql(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
}

(async () => {
  try {
    const schemaSql = loadSqlFile(schemaFile);
    const sampleSql = loadSqlFile(sampleDataFile);

    const db = new sqlite3.Database(dbFile);
    await runSql(db, schemaSql);
    await runSql(db, sampleSql);
    db.close();

    console.log('SQLite database initialized successfully:', dbFile);
  } catch (error) {
    console.error('Failed to initialize SQLite database:', error);
    process.exit(1);
  }
})();
