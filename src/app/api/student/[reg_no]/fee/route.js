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
        message: 'Cannot access other student fees',
      }, { status: 403 });
    }

    const { data: fees, error: feeError } = await supabase
      .from('studentfees')
      .select('fee_status')
      .eq('reg_no', reg_no);

    if (feeError || !fees || !fees.length) {
      return Response.json({
        success: false,
        message: 'Fee record not found',
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      feeStatus: fees[0].fee_status,
    });
  } catch (error) {
    console.error('Fetch fees error:', error);
    return Response.json({
      success: false,
      message: 'Unable to load fee status',
      error: error.message,
    }, { status: 500 });
  }
}
