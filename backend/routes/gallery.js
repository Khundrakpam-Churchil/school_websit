const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Gallery ORDER BY category, id');
    res.json({ success: true, gallery: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to load gallery' });
  }
});

router.post('/', async (req, res) => {
  const { category, image_url, caption } = req.body;
  try {
    await db.run('INSERT INTO Gallery (category, image_url, caption) VALUES (?, ?, ?)', [category, image_url, caption]);
    res.json({ success: true, message: 'Gallery item created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to create gallery item' });
  }
});

module.exports = router;
