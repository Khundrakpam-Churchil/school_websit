const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/login', async (req, res) => {
  const { loginType, registrationNumber, password, username } = req.body;

  try {
    if (loginType === 'Student') {
      const [rows] = await db.execute(
        'SELECT reg_no, student_name, class_name, roll_number, photo_url FROM Students WHERE reg_no = ? AND password = ?',
        [registrationNumber, password]
      );

      if (!rows.length) {
        return res.status(401).json({ success: false, message: 'Invalid student credentials' });
      }

      return res.json({ success: true, role: 'Student', user: rows[0] });
    }

    if (loginType === 'Admin') {
      const [rows] = await db.execute(
        'SELECT username, full_name FROM Admins WHERE username = ? AND password = ?',
        [username, password]
      );

      if (!rows.length) {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
      }

      return res.json({ success: true, role: 'Admin', user: rows[0] });
    }

    if (loginType === 'Faculty') {
      return res.json({
        success: true,
        role: 'Faculty',
        user: { username: username || 'faculty', full_name: 'Faculty Member' },
      });
    }

    return res.status(400).json({ success: false, message: 'Unknown login type' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
