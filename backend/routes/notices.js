const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Notices ORDER BY created_at DESC');
    res.json({ success: true, notices: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to load notices' });
  }
});

router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    await db.run('INSERT INTO Notices (title, content, created_at) VALUES (?, ?, datetime(\'now\'))', [title, content]);
    res.json({ success: true, message: 'Notice created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to create notice' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await db.run('UPDATE Notices SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    res.json({ success: true, message: 'Notice updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to update notice' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('DELETE FROM Notices WHERE id = ?', [id]);
    res.json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to delete notice' });
  }
});

module.exports = router;
