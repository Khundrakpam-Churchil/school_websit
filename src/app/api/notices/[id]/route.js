import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';
import { createNoticeSchema } from '@/lib/validation';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { user, status, error: authError } = verifyAuth(req, ['Admin']);
    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    const body = await req.json();
    const validation = createNoticeSchema.safeParse(body);

    if (!validation.success) {
      return Response.json({
        success: false,
        message: 'Validation error',
        errors: validation.error.errors.map((d) => d.message),
      }, { status: 400 });
    }

    const { title, content } = validation.data;

    // Check if exists
    const { data: existing, error: fetchError } = await supabase
      .from('notices')
      .select('id')
      .eq('id', id);

    if (fetchError || !existing || !existing.length) {
      return Response.json({
        success: false,
        message: 'Notice not found',
      }, { status: 404 });
    }

    // Update
    const { error: dbError } = await supabase
      .from('notices')
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Notice updated successfully',
    });
  } catch (error) {
    console.error('Update notice error:', error);
    return Response.json({
      success: false,
      message: 'Unable to update notice',
      error: error.message,
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const { user, status, error: authError } = verifyAuth(req, ['Admin']);
    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    // Check if exists
    const { data: existing, error: fetchError } = await supabase
      .from('notices')
      .select('id')
      .eq('id', id);

    if (fetchError || !existing || !existing.length) {
      return Response.json({
        success: false,
        message: 'Notice not found',
      }, { status: 404 });
    }

    // Delete
    const { error: dbError } = await supabase
      .from('notices')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Notice deleted successfully',
    });
  } catch (error) {
    console.error('Delete notice error:', error);
    return Response.json({
      success: false,
      message: 'Unable to delete notice',
      error: error.message,
    }, { status: 500 });
  }
}
