'use server';

export async function uploadToImgBB(base64Image: string): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const apiKey = process.env.IMGBB_API_KEY;
    if (!apiKey) {
      throw new Error('IMGBB_API_KEY is not configured');
    }

    // ImgBB API requires base64 string WITHOUT the data:image/xxx;base64, prefix
    const base64Data = base64Image.split(',')[1] || base64Image;

    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', base64Data);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, url: data.data.url };
    } else {
      console.error('ImgBB Upload Error:', data);
      return { success: false, error: data.error?.message || 'Failed to upload image' };
    }
  } catch (error: any) {
    console.error('Error in uploadToImgBB:', error);
    return { success: false, error: error.message || 'Internal server error during upload' };
  }
}
