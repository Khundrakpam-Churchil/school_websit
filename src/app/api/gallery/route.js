import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';
import { createGallerySchema } from '@/lib/validation';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    let query = supabase.from('gallery').select('*');

    if (category) {
      query = query.eq('category', category);
    }

    // Sort by category, id
    query = query.order('category').order('id');

    const { data: gallery, error } = await query;

    if (error) throw error;

    return Response.json({
      success: true,
      gallery,
      count: gallery.length,
    });
  } catch (error) {
    console.error('Fetch gallery error:', error);
    return Response.json({
      success: false,
      message: 'Unable to load gallery',
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
    const validation = createGallerySchema.safeParse(body);

    if (!validation.success) {
      return Response.json({
        success: false,
        message: 'Validation error',
        errors: validation.error.errors.map((d) => d.message),
      }, { status: 400 });
    }

    const { category, image_url, caption } = validation.data;

    const { error: dbError } = await supabase
      .from('gallery')
      .insert({ category, image_url, caption });

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Gallery item created successfully',
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    return Response.json({
      success: false,
      message: 'Unable to create gallery item',
      error: error.message,
    }, { status: 500 });
  }
}
