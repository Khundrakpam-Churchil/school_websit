import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';
import { updateFeeSchema } from '@/lib/validation';

export async function PUT(req, { params }) {
  try {
    const { reg_no } = await params;
    const { user, status, error: authError } = verifyAuth(req, ['Admin']);
    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    const body = await req.json();
    const validation = updateFeeSchema.safeParse(body);

    if (!validation.success) {
      return Response.json({
        success: false,
        message: 'Validation error',
        errors: validation.error.errors.map((d) => d.message),
      }, { status: 400 });
    }

    const { fee_status } = validation.data;

    // Verify student exists
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

    // Update fee status
    const { error: dbError } = await supabase
      .from('studentfees')
      .update({ fee_status, updated_at: new Date().toISOString() })
      .eq('reg_no', reg_no);

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Fee status updated successfully',
      fee_status,
    });
  } catch (error) {
    console.error('Update student fee status error:', error);
    return Response.json({
      success: false,
      message: 'Unable to update fee status',
      error: error.message,
    }, { status: 500 });
  }
}
