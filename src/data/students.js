// Mock database matching your SQL schema
export const students = [
  {
    reg_no: 'STU2026001',
    student_name: 'Khundrakpam Churchil',
    password: 'student123',
    class_name: '10th Grade',
    roll_number: 'A101',
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    fee_status: 'Paid',
    admit_card_status: 'approved',
    exams_registered: ['Mathematics', 'Physics', 'Chemistry', 'English Literature']
  },
  {
    reg_no: 'STU2026002',
    student_name: 'Khundrakpam Dhana',
    password: 'student123',
    class_name: '12th Grade',
    roll_number: 'B203',
    photo_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    fee_status: 'Pending',
    admit_card_status: 'declined',
    exams_registered: ['Mathematics', 'Physics']
  },
  {
    reg_no: 'STU2026003',
    student_name: 'Rahul Singh',
    password: 'student123',
    class_name: '10th Grade',
    roll_number: 'A102',
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    fee_status: 'Paid',
    admit_card_status: 'approved',
    exams_registered: ['Mathematics', 'Physics', 'Chemistry', 'English Literature', 'Biology']
  },
  {
    reg_no: 'STU2026004',
    student_name: 'Priya Devi',
    password: 'student123',
    class_name: '11th Grade',
    roll_number: 'C301',
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    fee_status: 'Pending',
    admit_card_status: 'declined',
    exams_registered: ['Mathematics', 'Chemistry']
  },
  {
    reg_no: 'STU2026005',
    student_name: 'Amit Singh',
    password: 'student123',
    class_name: '12th Grade',
    roll_number: 'B204',
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    fee_status: 'Paid',
    admit_card_status: 'approved',
    exams_registered: ['Physics', 'Chemistry', 'Biology', 'English Literature']
  },
  {
    reg_no: 'STU2026006',
    student_name: 'Sophia Devi',
    password: 'student123',
    class_name: '10th Grade',
    roll_number: 'A103',
    photo_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
    fee_status: 'Partial',
    admit_card_status: 'declined',
    exams_registered: ['Mathematics', 'English Literature']
  },
  {
    reg_no: 'STU2026007',
    student_name: 'Kumar Singh',
    password: 'student123',
    class_name: '11th Grade',
    roll_number: 'C302',
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    fee_status: 'Paid',
    admit_card_status: 'approved',
    exams_registered: ['Mathematics', 'Physics', 'Chemistry', 'English Literature', 'Computer Science']
  }
];

export const admins = [
  {
    username: 'admin',
    password: 'adminpass',
    full_name: 'School Administrator'
  }
];

export const faculty = [
  {
    username: 'faculty1',
    password: 'faculty123',
    full_name: 'Dr. Sarah Johnson',
    department: 'Mathematics'
  },
  {
    username: 'faculty2',
    password: 'faculty123',
    full_name: 'Prof. Michael Chen',
    department: 'Physics'
  }
];

export const notices = [
  {
    id: 1,
    title: 'Annual Examination Schedule Released',
    content: 'The annual examination timetable is now available for all classes. Please check your dashboard for details.',
    created_at: '2026-06-01',
    category: 'Examination',
    pinned: true
  },
  {
    id: 2,
    title: 'Fee Payment Reminder',
    content: 'Students with pending fees should complete payment before the admit card generation date. Late payments will incur a penalty of ₹50.',
    created_at: '2026-06-02',
    category: 'Administration',
    pinned: true
  },
  {
    id: 3,
    title: 'New Library Books Arrived',
    content: 'A fresh collection of reference books and journals has been added to the library. Visit during break hours.',
    created_at: '2026-06-03',
    category: 'General',
    pinned: false
  },
  {
    id: 4,
    title: 'Sports Day Announcement',
    content: 'Sports day will be held next month with special awards for best performers. Registration opens June 15.',
    created_at: '2026-06-04',
    category: 'Sports',
    pinned: false
  },
  {
    id: 5,
    title: 'Admit Card Generation Notice',
    content: 'Admit cards will only be issued to students with cleared fee status. Please verify your fee status in the portal.',
    created_at: '2026-06-05',
    category: 'Examination',
    pinned: true
  }
];

export const galleryImages = [
  { id: 1, category: 'Campus', image_url: 'https://images.unsplash.com/photo-1596495577886-d920f2e6c9bf?auto=format&fit=crop&w=1200&q=80', caption: 'Modern school campus with green spaces' },
  { id: 2, category: 'Classrooms', image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80', caption: 'Bright and interactive classroom environment' },
  { id: 3, category: 'Sports', image_url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', caption: 'Students practicing athletics activities' },
  { id: 4, category: 'Hostel', image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', caption: 'Comfortable hostel accommodation for students' },
  { id: 5, category: 'Events', image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80', caption: 'School event with performances and celebrations' },
  { id: 6, category: 'Campus', image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', caption: 'Collaborative study spaces and learning zones' },
  { id: 7, category: 'Sports', image_url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80', caption: 'Annual sports meet championship' },
  { id: 8, category: 'Events', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80', caption: 'Cultural festival performances' }
];

export const feeDetails = {
  'STU2026001': { total: 4800, paid: 4800, pending: 0, status: 'Paid', last_payment: '2026-01-15' },
  'STU2026002': { total: 4800, paid: 0, pending: 4800, status: 'Pending', last_payment: null },
  'STU2026003': { total: 4800, paid: 4800, pending: 0, status: 'Paid', last_payment: '2026-02-10' },
  'STU2026004': { total: 4800, paid: 1200, pending: 3600, status: 'Pending', last_payment: '2026-01-20' },
  'STU2026005': { total: 4800, paid: 4800, pending: 0, status: 'Paid', last_payment: '2026-03-05' },
  'STU2026006': { total: 4800, paid: 2400, pending: 2400, status: 'Partial', last_payment: '2026-02-28' },
  'STU2026007': { total: 4800, paid: 4800, pending: 0, status: 'Paid', last_payment: '2026-01-30' }
};

export const examSchedule = [
  { subject: 'Mathematics', date: 'June 15, 2026', time: '9:00 AM - 12:00 PM', room: 'Hall A', code: 'MATH101' },
  { subject: 'Physics', date: 'June 17, 2026', time: '9:00 AM - 12:00 PM', room: 'Hall B', code: 'PHY201' },
  { subject: 'Chemistry', date: 'June 19, 2026', time: '9:00 AM - 12:00 PM', room: 'Hall A', code: 'CHEM301' },
  { subject: 'English Literature', date: 'June 21, 2026', time: '1:00 PM - 4:00 PM', room: 'Hall C', code: 'ENG401' },
  { subject: 'Biology', date: 'June 23, 2026', time: '9:00 AM - 12:00 PM', room: 'Hall B', code: 'BIO501' },
  { subject: 'Computer Science', date: 'June 25, 2026', time: '1:00 PM - 4:00 PM', room: 'Lab 3', code: 'CS601' }
];