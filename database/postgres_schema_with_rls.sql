-- ==========================================
-- School Management Schema with RLS
-- ==========================================

-- 1. Create Tables (Using consistent lowercase to prevent case-folding mismatches)

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  reg_no VARCHAR(50) PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  class_name VARCHAR(100) NOT NULL,
  roll_number VARCHAR(50) NOT NULL,
  photo_url TEXT,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  date_of_birth VARCHAR(50),
  parent_name VARCHAR(255),
  parent_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS studentfees (
  id SERIAL PRIMARY KEY,
  reg_no VARCHAR(50) NOT NULL UNIQUE,
  student_name VARCHAR(255) NOT NULL,
  fee_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reg_no) REFERENCES students(reg_no) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notices (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  caption VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exams (
  id SERIAL PRIMARY KEY,
  exam_name VARCHAR(255) NOT NULL,
  exam_date VARCHAR(100) NOT NULL,
  total_marks INTEGER NOT NULL,
  passing_marks INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hostels (
  id SERIAL PRIMARY KEY,
  hostel_name VARCHAR(255) NOT NULL,
  capacity INTEGER NOT NULL,
  warden_name VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hostelassignments (
  id SERIAL PRIMARY KEY,
  reg_no VARCHAR(50) NOT NULL,
  hostel_id INTEGER NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reg_no) REFERENCES students(reg_no) ON DELETE CASCADE,
  FOREIGN KEY (hostel_id) REFERENCES hostels(id)
);

CREATE TABLE IF NOT EXISTS paymenttransactions (
  id SERIAL PRIMARY KEY,
  reg_no VARCHAR(50) NOT NULL,
  amount REAL NOT NULL,
  payment_date VARCHAR(100) NOT NULL,
  payment_method VARCHAR(100) NOT NULL,
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reg_no) REFERENCES students(reg_no) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS auditlogs (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255),
  action VARCHAR(255) NOT NULL,
  resource_type VARCHAR(255) NOT NULL,
  resource_id VARCHAR(255),
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Enable Row Level Security (RLS) on all tables

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE studentfees ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE hostelassignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE paymenttransactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditlogs ENABLE ROW LEVEL SECURITY;

-- 3. Define RLS Policies
-- Note: The server-side API uses the Service Role Key (service_role), which automatically bypasses RLS checks.
-- We can add public policies for tables that need to be read publicly (like notices and gallery).

-- Notices: Anyone (even anonymous users) can view notices. Writes are disabled for the public.
CREATE POLICY "Allow public read access to notices" ON notices FOR SELECT TO public USING (true);

-- Gallery: Anyone can view gallery images. Writes are disabled for the public.
CREATE POLICY "Allow public read access to gallery" ON gallery FOR SELECT TO public USING (true);
