const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const databaseFile = path.join(__dirname, '../database/school_exam_portal.db');

async function openDb() {
  const db = await open({
    filename: databaseFile,
    driver: sqlite3.Database,
  });
  await db.run('PRAGMA foreign_keys = ON');
  return db;
}

const dbPromise = openDb();

async function execute(sql, params = []) {
  const db = await dbPromise;
  const rows = await db.all(sql, params);
  return [rows];
}

async function run(sql, params = []) {
  const db = await dbPromise;
  return db.run(sql, params);
}

module.exports = {
  execute,
  run,
};
