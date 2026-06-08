PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS Students (
  reg_no TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  class_name TEXT NOT NULL,
  roll_number TEXT NOT NULL,
  photo_url TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  date_of_birth TEXT,
  parent_name TEXT,
  parent_phone TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS StudentFees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reg_no TEXT NOT NULL UNIQUE,
  student_name TEXT NOT NULL,
  fee_status TEXT NOT NULL DEFAULT 'Pending',
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (reg_no) REFERENCES Students(reg_no) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS Gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Future tables for Phase 2

CREATE TABLE IF NOT EXISTS Roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS Exams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  exam_name TEXT NOT NULL,
  exam_date TEXT NOT NULL,
  total_marks INTEGER NOT NULL,
  passing_marks INTEGER NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS Hostels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hostel_name TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  warden_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS HostelAssignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reg_no TEXT NOT NULL,
  hostel_id INTEGER NOT NULL,
  room_number TEXT NOT NULL,
  assigned_date TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (reg_no) REFERENCES Students(reg_no) ON DELETE CASCADE,
  FOREIGN KEY (hostel_id) REFERENCES Hostels(id)
);

CREATE TABLE IF NOT EXISTS PaymentTransactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reg_no TEXT NOT NULL,
  amount REAL NOT NULL,
  payment_date TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (reg_no) REFERENCES Students(reg_no) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS AuditLogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  details TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
