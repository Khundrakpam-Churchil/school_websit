import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';
import PDFDocument from 'pdfkit';

export async function GET(req, { params }) {
  try {
    const { reg_no } = await params;
    const { user, status, error: authError } = verifyAuth(req);

    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    if (user.reg_no !== reg_no && user.role !== 'Admin') {
      return Response.json({
        success: false,
        message: 'Cannot download other student admit cards',
      }, { status: 403 });
    }

    const { data: students, error: studentError } = await supabase
      .from('students')
      .select('reg_no, student_name, class_name, roll_number, photo_url')
      .eq('reg_no', reg_no);

    if (studentError || !students || !students.length) {
      return Response.json({
        success: false,
        message: 'Student not found',
      }, { status: 404 });
    }

    const student = students[0];

    const { data: fees, error: feeError } = await supabase
      .from('studentfees')
      .select('fee_status')
      .eq('reg_no', reg_no);

    const feeStatus = fees && fees.length ? fees[0].fee_status : 'Pending';
    if (feeStatus !== 'Paid') {
      return Response.json({
        success: false,
        message: 'Please clear your fees before downloading the admit card.',
      }, { status: 403 });
    }

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    const pdfPromise = new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });

    // Write contents to doc
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
    doc.text(`Generated: ${new Date().toLocaleDateString()}`);
    doc.moveDown(1);
    doc.text('This admit card is valid for the current examination session only.', {
      width: 420,
      align: 'left',
    });

    if (student.photo_url) {
      try {
        const imageRes = await fetch(student.photo_url);
        if (imageRes.ok) {
          const arrayBuffer = await imageRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          doc.image(buffer, 430, 140, { fit: [110, 140], align: 'center' });
        }
      } catch (imageError) {
        console.error('Error fetching image for admit card:', imageError);
      }
    }

    doc.end();

    const pdfBuffer = await pdfPromise;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=AdmitCard_${student.reg_no}.pdf`,
      },
    });

  } catch (error) {
    console.error('Admit card generation error:', error);
    return Response.json({
      success: false,
      message: 'Unable to generate admit card',
      error: error.message,
    }, { status: 500 });
  }
}
