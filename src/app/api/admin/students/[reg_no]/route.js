import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';
import { updateStudentSchema } from '@/lib/validation';

export async function PUT(req, { params }) {
  try {
    const { reg_no } = await params;
    const { user, status, error: authError } = verifyAuth(req, ['Admin']);
    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    const body = await req.json();
    const validation = updateStudentSchema.safeParse(body);

    if (!validation.success) {
      return Response.json({
        success: false,
        message: 'Validation error',
        errors: validation.error.errors.map((d) => d.message),
      }, { status: 400 });
    }

    const value = validation.data;

    // Check if exists
    const { data: existing, error: fetchError } = await supabase
      .from('students')
      .select('reg_no')
      .eq('reg_no', reg_no);

    if (fetchError || !existing || !existing.length) {
      return Response.json({
        success: false,
        message: 'Student not found',
      }, { status: 404 });
    }

    // Update fields dynamically
    const { error: dbError } = await supabase
      .from('students')
      .update(value)
      .eq('reg_no', reg_no);

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Student updated successfully',
    });
  } catch (error) {
    console.error('Update student error:', error);
    return Response.json({
      success: false,
      message: 'Unable to update student',
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { reg_no } = await params;
    const { user, status, error: authError } = verifyAuth(req, ['Admin']);
    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    // Check if exists
    const { data: existing, error: fetchError } = await supabase
      .from('students')
      .select('reg_no')
      .eq('reg_no', reg_no);

    if (fetchError || !existing || !existing.length) {
      return Response.json({
        success: false,
        message: 'Student not found',
      }, { status: 404 });
    }

    // Delete student
    const { error: dbError } = await supabase
      .from('students')
      .delete()
      .eq('reg_no', reg_no);

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('Delete student error:', error);
    return Response.json({
      success: false,
      message: 'Unable to delete student',
      error: error.message,
    }, { status: 500 });
  }
}
