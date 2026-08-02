'use server';

import { resend, NOTIFICATION_EMAIL, FROM_EMAIL } from '@/lib/email/resend';
import { ContactEmail } from '@/lib/email/templates/ContactEmail';
import { createContactMessage } from '@/lib/db/queries/messages';

export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  try {
    // 1. Save to database
    await createContactMessage(data);

    // 2. Send email notification (if API key is present and valid)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey || resendApiKey === 're_[YOUR-RESEND-API-KEY]' || resendApiKey.includes('[YOUR-RESEND-API-KEY]')) {
      console.log('Skipping email send (no valid API key). DB Record created.');
      return { success: true };
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFICATION_EMAIL],
      subject: `New Inquiry: ${data.subject} | Saiban Construction`,
      react: ContactEmail(data),
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error: 'Failed to send email.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Action error:', error);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
