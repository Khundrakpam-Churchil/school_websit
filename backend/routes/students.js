const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const db = require('../db');

router.get('/:reg_no/profile', async (req, res) => {
  const { reg_no } = req.params;

  try {
    const [studentRows] = await db.execute('SELECT reg_no, student_name, class_name, roll_number, photo_url FROM Students WHERE reg_no = ?', [reg_no]);
    const [feeRows] = await db.execute('SELECT fee_status FROM StudentFees WHERE reg_no = ?', [reg_no]);

    if (!studentRows.length) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    return res.json({
      success: true,
      profile: {
        ...studentRows[0],
        fee_status: feeRows.length ? feeRows[0].fee_status : 'Pending',
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to load profile' });
  }
});

router.get('/:reg_no/fee', async (req, res) => {
  const { reg_no } = req.params;

  try {
    const [rows] = await db.execute('SELECT fee_status FROM StudentFees WHERE reg_no = ?', [reg_no]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Fee record not found' });
    }

    res.json({ success: true, feeStatus: rows[0].fee_status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to load fee status' });
  }
});

router.get('/:reg_no/admit-card', async (req, res) => {
  const { reg_no } = req.params;

  try {
    const [studentRows] = await db.execute(
      'SELECT reg_no, student_name, class_name, roll_number, photo_url FROM Students WHERE reg_no = ?',
      [reg_no]
    );
    const [feeRows] = await db.execute('SELECT fee_status FROM StudentFees WHERE reg_no = ?', [reg_no]);

    if (!studentRows.length) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const feeStatus = feeRows.length ? feeRows[0].fee_status : 'Pending';
    if (feeStatus !== 'Paid') {
      return res.status(403).json({ success: false, message: 'Please clear your fees before downloading the admit card.' });
    }

    const student = studentRows[0];
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=AdmitCard_${student.reg_no}.pdf`);

    doc.fontSize(20).fillColor('#1d4ed8').text('Springfield School of Excellence', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).fillColor('#0f172a').text('Admit Card', { align: 'center' });
    doc.moveDown(1);

    doc.fontSize(12).fillColor('#1f2937');
    doc.text(`Student Name: ${student.student_name}`);
    doc.text(`Registration Number: ${student.reg_no}`);
    doc.text(`Roll Number: ${student.roll_number}`);
    doc.text(`Class: ${student.class_name}`);
    doc.text('Examination: Annual Board Examination');
    doc.text(`Fee Status: ${feeStatus}`);
    doc.moveDown(1);
    doc.text('This admit card is valid for the current examination session only.', {
      width: 420,
      align: 'left',
    });

    if (student.photo_url) {
      try {
        const imageUrl = student.photo_url;
        const https = require('https');
        const http = require('http');
        const client = imageUrl.startsWith('https') ? https : http;

        const request = client.get(imageUrl, (imageRes) => {
          const chunks = [];
          imageRes.on('data', (chunk) => chunks.push(chunk));
          imageRes.on('end', () => {
            const buffer = Buffer.concat(chunks);
            doc.image(buffer, 430, 140, { fit: [110, 140], align: 'center' });
            doc.end();
          });
        });

        request.on('error', () => {
          doc.end();
        });
      } catch (imageError) {
        doc.end();
      }
    } else {
      doc.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to generate admit card' });
  }
});

module.exports = router;
