import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';

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
        message: 'Cannot access other student profiles',
      }, { status: 403 });
    }

    const { data: students, error: studentError } = await supabase
      .from('students')
      .select('reg_no, student_name, class_name, roll_number, photo_url, email, phone, date_of_birth')
      .eq('reg_no', reg_no);

    if (studentError || !students || !students.length) {
      return Response.json({
        success: false,
        message: 'Student not found',
      }, { status: 404 });
    }

    const { data: fees, error: feeError } = await supabase
      .from('studentfees')
      .select('fee_status')
      .eq('reg_no', reg_no);

    const fee_status = fees && fees.length ? fees[0].fee_status : 'Pending';

    return Response.json({
      success: true,
      profile: {
        ...students[0],
        fee_status,
      },
    });
  } catch (error) {
    console.error('Fetch profile error:', error);
    return Response.json({
      success: false,
      message: 'Unable to load profile',
      error: error.message,
    }, { status: 500 });
  }
}
