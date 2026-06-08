const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local manually to get Supabase credentials
const envPath = path.join(__dirname, '..', '.env.local');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.error('Error: Could not read .env.local file in the project root.');
  process.exit(1);
}

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1);
    }
    env[key] = value.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

const adminsData = [
  {
    username: 'admin',
    password_hash: '$2b$10$cBnxPv8saiNVF7EwnKFtOOEWr3fpUUZCJQOddQPZZPMs2ILKAOpZi',
    full_name: 'School Administrator'
  }
];

const studentsData = [
  {
    reg_no: 'STU2026001',
    student_name: 'Aisha Patel',
    password_hash: '$2b$10$HP3LEZRpLOE8aoRemTJ1OexC5UgzlaBa0mcqK0GfnkdcHg/AQ8CT2',
    class_name: '10th Grade',
    roll_number: 'A101',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
  },
  {
    reg_no: 'STU2026002',
    student_name: 'Rahul Verma',
    password_hash: '$2b$10$HP3LEZRpLOE8aoRemTJ1OexC5UgzlaBa0mcqK0GfnkdcHg/AQ8CT2',
    class_name: '12th Grade',
    roll_number: 'B203',
    photo_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
  }
];

const studentFeesData = [
  {
    reg_no: 'STU2026001',
    student_name: 'Aisha Patel',
    fee_status: 'Paid'
  },
  {
    reg_no: 'STU2026002',
    student_name: 'Rahul Verma',
    fee_status: 'Pending'
  }
];

const noticesData = [
  {
    title: 'Annual Examination Schedule Released',
    content: 'The annual examination timetable is now available for all classes.'
  },
  {
    title: 'Fee Payment Reminder',
    content: 'Students with pending fees should complete payment before the admit card generation date.'
  },
  {
    title: 'New Library Books Arrived',
    content: 'A fresh collection of reference books and journals has been added to the library.'
  },
  {
    title: 'Sports Day Announcement',
    content: 'Sports day will be held next month with special awards for best performers.'
  }
];

const galleryData = [
  {
    category: 'Campus',
    image_url: '/slides/infrastructure.png',
    caption: 'Modern school campus with green spaces'
  },
  {
    category: 'Classrooms',
    image_url: '/slides/academics.png',
    caption: 'Bright and interactive classroom environment'
  },
  {
    category: 'Sports',
    image_url: '/slides/sports.png',
    caption: 'Students practicing athletics activities'
  },
  {
    category: 'Hostel',
    image_url: '/slides/hostel.png',
    caption: 'Comfortable hostel accommodation for students'
  },
  {
    category: 'Events',
    image_url: '/slides/playground.png',
    caption: 'Outdoor campus activities and school events'
  },
  {
    category: 'Campus',
    image_url: '/slides/infrastructure.png',
    caption: 'Collaborative study spaces and learning zones'
  }
];

async function seedTable(tableName, data, uniqueKey) {
  console.log(`Seeding "${tableName}" table...`);
  
  // Clean/upsert rows
  for (const item of data) {
    const query = supabase.from(tableName).upsert(item, { onConflict: uniqueKey });
    const { error } = await query;
    if (error) {
      console.error(`Error seeding item in "${tableName}":`, error.message);
      return false;
    }
  }
  console.log(`Successfully seeded "${tableName}" table.`);
  return true;
}

async function run() {
  console.log('Starting Supabase Seeder via API Client...');
  console.log('Target URL:', supabaseUrl);

  // Seed order is important due to foreign keys (Students -> StudentFees)
  const adminsSuccess = await seedTable('admins', adminsData, 'username');
  if (!adminsSuccess) process.exit(1);

  const studentsSuccess = await seedTable('students', studentsData, 'reg_no');
  if (!studentsSuccess) process.exit(1);

  const feesSuccess = await seedTable('studentfees', studentFeesData, 'reg_no');
  if (!feesSuccess) process.exit(1);

  const noticesSuccess = await seedTable('notices', noticesData, 'title');
  if (!noticesSuccess) process.exit(1);

  const gallerySuccess = await seedTable('gallery', galleryData, 'image_url');
  if (!gallerySuccess) process.exit(1);

  console.log('\n🎉 All tables seeded successfully via REST API!');
}

run();
