'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { submitContactForm } from '@/lib/actions/contact';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setSuccess(true);
        reset();
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.2)] rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-white mb-2">Message Sent Successfully!</h4>
        <p className="text-[var(--text-muted)] mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
        <Button onClick={() => setSuccess(false)} variant="outline">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <input
            id="name"
            type="text"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="John Doe"
            {...register('name')}
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address *</label>
          <input
            id="email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="john@example.com"
            {...register('email')}
          />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="+92 300 1234567"
            {...register('phone')}
          />
          {errors.phone && <span className="form-error">{errors.phone.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="subject" className="form-label">Subject *</label>
          <input
            id="subject"
            type="text"
            className={`form-input ${errors.subject ? 'error' : ''}`}
            placeholder="How can we help?"
            {...register('subject')}
          />
          {errors.subject && <span className="form-error">{errors.subject.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">Message *</label>
        <textarea
          id="message"
          className={`form-textarea ${errors.message ? 'error' : ''}`}
          placeholder="Tell us about your inquiry..."
          {...register('message')}
        />
        {errors.message && <span className="form-error">{errors.message.message}</span>}
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
          {error}
        </div>
      )}

      <Button type="submit" isLoading={isSubmitting} className="w-full btn-lg">
        Send Message
      </Button>
    </form>
  );
}
