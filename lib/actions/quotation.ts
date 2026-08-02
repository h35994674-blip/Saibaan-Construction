'use server';

import { createQuotation } from '@/lib/db/queries/quotations';
import { resend, NOTIFICATION_EMAIL, FROM_EMAIL } from '@/lib/email/resend';
import { QuotationEmail } from '@/lib/email/templates/QuotationEmail';

export async function submitQuotationRequest(data: {
  name: string;
  email?: string;
  phone: string;
  services: string[];
  location: string;
  areaSqft: string;
  budgetRange: string;
  message?: string;
}) {
  try {
    // 1. Save to database via Prisma
    const quote = await createQuotation(data);

    // 2. Send email notification (if API key is present)
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: [NOTIFICATION_EMAIL],
        subject: `New Quotation Request from ${data.name} | Saiban Construction`,
        react: QuotationEmail(data),
      });
    } else {
      console.log('Skipping email send (no API key). DB Record created:', quote.id);
    }

    return { success: true };
  } catch (error) {
    console.error('Quotation action error:', error);
    return { success: false, error: 'Failed to submit request. Please try again.' };
  }
}
