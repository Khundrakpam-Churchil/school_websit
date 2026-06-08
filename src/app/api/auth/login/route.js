import { supabase } from '@/lib/supabase';
import { comparePasswords } from '@/lib/hash';
import { generateToken } from '@/lib/auth';
import { studentLoginSchema, adminLoginSchema } from '@/lib/validation';

export async function POST(req) {
  try {
    const body = await req.json();
    const { loginType, registrationNumber, password, username } = body;

    if (loginType === 'Student') {
      const validation = studentLoginSchema.safeParse({ registrationNumber, password });
      if (!validation.success) {
        return Response.json({
          success: false,
          message: 'Validation error',
          error: validation.error.errors.map((d) => d.message),
        }, { status: 400 });
      }

      // Query database
      const { data: students, error: dbError } = await supabase
        .from('students')
        .select('reg_no, student_name, class_name, roll_number, photo_url, password_hash')
        .eq('reg_no', registrationNumber);

      if (dbError || !students || !students.length) {
        return Response.json({
          success: false,
          message: 'Invalid student credentials',
        }, { status: 401 });
      }

      const student = students[0];
      const passwordMatch = await comparePasswords(password, student.password_hash);
      if (!passwordMatch) {
        return Response.json({
          success: false,
          message: 'Invalid student credentials',
        }, { status: 401 });
      }

      const token = generateToken({ reg_no: student.reg_no, role: 'Student' });

      return Response.json({
        success: true,
        role: 'Student',
        token,
        user: {
          reg_no: student.reg_no,
          student_name: student.student_name,
          class_name: student.class_name,
          roll_number: student.roll_number,
          photo_url: student.photo_url,
        },
      });
    }

    if (loginType === 'Admin') {
      const validation = adminLoginSchema.safeParse({ username, password });
      if (!validation.success) {
        return Response.json({
          success: false,
          message: 'Validation error',
          error: validation.error.errors.map((d) => d.message),
        }, { status: 400 });
      }

      const { data: admins, error: dbError } = await supabase
        .from('admins')
        .select('id, username, full_name, password_hash')
        .eq('username', username);

      if (dbError || !admins || !admins.length) {
        return Response.json({
          success: false,
          message: 'Invalid admin credentials',
        }, { status: 401 });
      }

      const admin = admins[0];
      const passwordMatch = await comparePasswords(password, admin.password_hash);
      if (!passwordMatch) {
        return Response.json({
          success: false,
          message: 'Invalid admin credentials',
        }, { status: 401 });
      }

      const token = generateToken({ id: admin.id, username: admin.username, role: 'Admin' });

      return Response.json({
        success: true,
        role: 'Admin',
        token,
        user: {
          id: admin.id,
          username: admin.username,
          full_name: admin.full_name,
        },
      });
    }

    if (loginType === 'Faculty') {
      if (!username || !password) {
        return Response.json({
          success: false,
          message: 'Username and password required',
        }, { status: 400 });
      }

      if (username === 'faculty' && password === 'faculty123') {
        const token = generateToken({ username: 'faculty', role: 'Faculty' });
        return Response.json({
          success: true,
          role: 'Faculty',
          token,
          user: {
            username: 'faculty',
            full_name: 'Faculty Member',
          },
        });
      }

      return Response.json({
        success: false,
        message: 'Invalid faculty credentials',
      }, { status: 401 });
    }

    return Response.json({
      success: false,
      message: 'Unknown login type',
    }, { status: 400 });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({
      success: false,
      message: 'Login failed',
      error: error.message,
    }, { status: 500 });
  }
}
