import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';
import { createStudentSchema } from '@/lib/validation';
import { hashPassword } from '@/lib/hash';

export async function GET(req) {
  try {
    const { user, status, error: authError } = verifyAuth(req, ['Admin']);
    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    const { data: students, error: dbError } = await supabase
      .from('students')
      .select(`
        reg_no,
        student_name,
        class_name,
        roll_number,
        studentfees ( fee_status )
      `)
      .order('student_name');

    if (dbError) throw dbError;

    const formatted = (students || []).map((s) => {
      let fee_status = 'Pending';
      if (s.studentfees) {
        if (Array.isArray(s.studentfees)) {
          fee_status = s.studentfees[0]?.fee_status || 'Pending';
        } else {
          fee_status = s.studentfees.fee_status || 'Pending';
        }
      }
      return {
        reg_no: s.reg_no,
        student_name: s.student_name,
        class_name: s.class_name,
        roll_number: s.roll_number,
        fee_status,
      };
    });

    return Response.json({ success: true, students: formatted });
  } catch (error) {
    console.error('Admin fetch students error:', error);
    return Response.json({
      success: false,
      message: 'Unable to load students',
      error: error.message,
    }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { user, status, error: authError } = verifyAuth(req, ['Admin']);
    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    const body = await req.json();
    const validation = createStudentSchema.safeParse(body);

    if (!validation.success) {
      return Response.json({
        success: false,
        message: 'Validation error',
        errors: validation.error.errors.map((d) => d.message),
      }, { status: 400 });
    }

    const {
      reg_no,
      student_name,
      password,
      class_name,
      roll_number,
      photo_url,
      email,
      phone,
      date_of_birth,
      parent_name,
      parent_phone,
    } = validation.data;

    // Hash password
    const password_hash = await hashPassword(password);

    // Insert into Students
    const { error: studentError } = await supabase
      .from('students')
      .insert({
        reg_no,
        student_name,
        password_hash,
        class_name,
        roll_number,
        photo_url: photo_url || null,
        email: email || null,
        phone: phone || null,
        date_of_birth: date_of_birth || null,
        parent_name: parent_name || null,
        parent_phone: parent_phone || null,
      });

    if (studentError) {
      if (studentError.code === '23505' || studentError.message.includes('unique') || studentError.message.includes('already exists')) {
        return Response.json({
          success: false,
          message: 'Student with this registration number already exists',
        }, { status: 409 });
      }
      throw studentError;
    }

    // Create fee record
    const { error: feeError } = await supabase
      .from('studentfees')
      .insert({
        reg_no,
        student_name,
        fee_status: 'Pending',
      });

    if (feeError) {
      console.error('Failed to create student fee record:', feeError);
    }

    return Response.json({
      success: true,
      message: 'Student added successfully',
      student: { reg_no, student_name, class_name, roll_number },
    });
  } catch (error) {
    console.error('Admin add student error:', error);
    return Response.json({
      success: false,
      message: 'Unable to add student',
      error: error.message,
    }, { status: 500 });
  }
}
