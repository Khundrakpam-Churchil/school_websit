const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/students', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT s.reg_no, s.student_name, s.class_name, s.roll_number, f.fee_status FROM Students s LEFT JOIN StudentFees f ON s.reg_no = f.reg_no ORDER BY s.student_name'
    );
    res.json({ success: true, students: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to load students' });
  }
});

router.post('/students', async (req, res) => {
  const { reg_no, student_name, password, class_name, roll_number, photo_url } = req.body;
  try {
    await db.run(
      'INSERT INTO Students (reg_no, student_name, password, class_name, roll_number, photo_url) VALUES (?, ?, ?, ?, ?, ?)',
      [reg_no, student_name, password, class_name, roll_number, photo_url]
    );
    await db.run('INSERT INTO StudentFees (reg_no, student_name, fee_status) VALUES (?, ?, ?)', [reg_no, student_name, 'Pending']);
    res.json({ success: true, message: 'Student added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to add student' });
  }
});

router.put('/students/:reg_no/fee', async (req, res) => {
  const { reg_no } = req.params;
  const { fee_status } = req.body;
  try {
    await db.run('UPDATE StudentFees SET fee_status = ? WHERE reg_no = ?', [fee_status, reg_no]);
    res.json({ success: true, message: 'Fee status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to update fee status' });
  }
});

module.exports = router;
