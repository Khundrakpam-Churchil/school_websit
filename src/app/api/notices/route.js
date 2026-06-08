import { supabase } from '@/lib/supabase';
import { verifyAuth } from '@/lib/auth';
import { createNoticeSchema } from '@/lib/validation';

export async function GET() {
  try {
    const { data: notices, error } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return Response.json({
      success: true,
      notices,
      count: notices.length,
    });
  } catch (error) {
    console.error('Fetch notices error:', error);
    return Response.json({
      success: false,
      message: 'Unable to load notices',
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
    const validation = createNoticeSchema.safeParse(body);

    if (!validation.success) {
      return Response.json({
        success: false,
        message: 'Validation error',
        errors: validation.error.errors.map((d) => d.message),
      }, { status: 400 });
    }

    const { title, content } = validation.data;

    const { error: dbError } = await supabase
      .from('notices')
      .insert({ title, content });

    if (dbError) throw dbError;

    return Response.json({
      success: true,
      message: 'Notice created successfully',
    });
  } catch (error) {
    console.error('Create notice error:', error);
    return Response.json({
      success: false,
      message: 'Unable to create notice',
      error: error.message,
    }, { status: 500 });
  }
}
