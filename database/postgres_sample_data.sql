INSERT INTO Admins (username, password_hash, full_name) VALUES
('admin', '$2b$10$cBnxPv8saiNVF7EwnKFtOOEWr3fpUUZCJQOddQPZZPMs2ILKAOpZi', 'School Administrator');

INSERT INTO Students (reg_no, student_name, password_hash, class_name, roll_number, photo_url) VALUES
('STU2026001', 'Aisha Patel', '$2b$10$HP3LEZRpLOE8aoRemTJ1OexC5UgzlaBa0mcqK0GfnkdcHg/AQ8CT2', '10th Grade', 'A101', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'),
('STU2026002', 'Rahul Verma', '$2b$10$HP3LEZRpLOE8aoRemTJ1OexC5UgzlaBa0mcqK0GfnkdcHg/AQ8CT2', '12th Grade', 'B203', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80');

INSERT INTO StudentFees (reg_no, student_name, fee_status) VALUES
('STU2026001', 'Aisha Patel', 'Paid'),
('STU2026002', 'Rahul Verma', 'Pending');

INSERT INTO Notices (title, content, created_at) VALUES
('Annual Examination Schedule Released', 'The annual examination timetable is now available for all classes.', CURRENT_TIMESTAMP),
('Fee Payment Reminder', 'Students with pending fees should complete payment before the admit card generation date.', CURRENT_TIMESTAMP),
('New Library Books Arrived', 'A fresh collection of reference books and journals has been added to the library.', CURRENT_TIMESTAMP),
('Sports Day Announcement', 'Sports day will be held next month with special awards for best performers.', CURRENT_TIMESTAMP);

INSERT INTO Gallery (category, image_url, caption) VALUES
('Campus', 'https://images.unsplash.com/photo-1596495577886-d920f2e6c9bf?auto=format&fit=crop&w=1200&q=80', 'Modern school campus with green spaces'),
('Classrooms', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80', 'Bright and interactive classroom environment'),
('Sports', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80', 'Students practicing athletics activities'),
('Hostel', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80', 'Comfortable hostel accommodation for students'),
('Events', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80', 'School event with performances and celebrations'),
('Campus', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80', 'Collaborative study spaces and learning zones');
