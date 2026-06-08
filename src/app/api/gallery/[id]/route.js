import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';
import { createGallerySchema } from '@/lib/validation';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { user, status, error: authError } = verifyAuth(req, ['Admin']);
    if (!user) {
      return Response.json({ success: false, message: authError }, { status });
    }

    const body = await req.json();
    const validation = createGallerySchema.safeParse(body);

    if (!validation.success) {
      return Response.json({
        success: false,
        message: 'Validation error',
        errors: validation.error.errors.map((d) => d.message),
      }, { status: 400 });
    }

    const { category, image_url, caption } = validation.data;

    // Check if exists
    const { data: existing, error: fetchError } = await supabase
      .from('gallery')
      .select('id')
      .eq('id', id);

    if (fetchError || !existing || !existing.length) {
      return Response.json({
        success: false,
        message: 'Gallery item not found',
      }, { status: 404 });
    }

    // Update
    const { error: dbError } = await supabase
      .from('gallery')
      .update({ category, image_url, caption })
      .eq('id', id);

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Gallery item updated successfully',
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    return Response.json({
      success: false,
      message: 'Unable to update gallery item',
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
      .from('gallery')
      .select('id')
      .eq('id', id);

    if (fetchError || !existing || !existing.length) {
      return Response.json({
        success: false,
        message: 'Gallery item not found',
      }, { status: 404 });
    }

    // Delete
    const { error: dbError } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    return Response.json({
      success: false,
      message: 'Unable to delete gallery item',
      error: error.message,
    }, { status: 500 });
  }
}
