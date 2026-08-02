import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Admin client for server-side storage operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Public client for read operations
export const supabasePublic = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadImage(
  file: File,
  bucket: string = 'images',
  path?: string
): Promise<string | null> {
  const filePath = path || `${Date.now()}-${file.name}`;
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(bucket).getPublicUrl(data.path);

  return publicUrl;
}
