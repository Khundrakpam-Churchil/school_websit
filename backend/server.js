const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const noticeRoutes = require('./routes/notices');
const galleryRoutes = require('./routes/gallery');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'School Examination Registration API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
