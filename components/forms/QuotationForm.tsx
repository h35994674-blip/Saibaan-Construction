'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { submitQuotationRequest } from '@/lib/actions/quotation';
import { useSearchParams } from 'next/navigation';

const quotationSchema = z.object({
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  location: z.string().min(2, 'Location is required'),
  areaSqft: z.string().min(1, 'Approximate area is required'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address').or(z.literal('')),
  phone: z.string().min(10, 'Valid phone number is required'),
  message: z.string().optional(),
});

type QuotationFormData = z.infer<typeof quotationSchema>;

const STEPS = [
  { id: 'services', title: 'Services' },
  { id: 'details', title: 'Project Details' },
  { id: 'contact', title: 'Contact Info' },
];

export function QuotationForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams?.get('service');
  
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      services: initialService ? [initialService] : [],
      email: '',
      message: '',
    },
  });

  const selectedServices = watch('services');

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (currentStep === 0) fieldsToValidate = ['services'];
    if (currentStep === 1) fieldsToValidate = ['location', 'areaSqft', 'budgetRange'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: QuotationFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitQuotationRequest(data);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleService = (serviceSlug: string) => {
    const current = selectedServices || [];
    if (current.includes(serviceSlug)) {
      setValue('services', current.filter((s) => s !== serviceSlug), { shouldValidate: true });
    } else {
      setValue('services', [...current, serviceSlug], { shouldValidate: true });
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} />
        </div>
        <h3 className="text-3xl font-heading font-bold text-white mb-4">Request Submitted!</h3>
        <p className="text-[var(--text-muted)] text-lg max-w-md mx-auto mb-8">
          Thank you for choosing Saibaan Construction. Our team will review your requirements and get back to you with a customized quotation shortly.
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-10 relative">
        <div className="flex justify-between mb-2">
          {STEPS.map((step, idx) => (
            <div 
              key={step.id} 
              className={`text-sm font-semibold transition-colors ${idx <= currentStep ? 'text-gold' : 'text-[var(--text-muted)]'}`}
            >
              <span className="hidden sm:inline">Step {idx + 1}: </span>{step.title}
            </div>
          ))}
        </div>
        <div className="h-2 w-full bg-[var(--bg-surface-2)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[var(--gold-dark)] to-[var(--gold)] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* Step 1: Services */}
        {currentStep === 0 && (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-heading font-semibold text-white mb-2">What services do you need?</h3>
            <p className="text-[var(--text-muted)] mb-8">Select all that apply to your project.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {siteConfig.services.map((service) => {
                const isSelected = selectedServices?.includes(service.slug);
                return (
                  <div
                    key={service.slug}
                    onClick={() => toggleService(service.slug)}
                    className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition-all ${
                      isSelected 
                        ? 'bg-[var(--gold-subtle)] border-gold text-white shadow-[0_0_15px_rgba(201,168,76,0.15)]' 
                        : 'bg-[var(--bg-surface-2)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--gold-border)]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-gold border-gold text-black' : 'border-[var(--text-muted)]'
                    }`}>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className="font-medium">{service.title}</span>
                  </div>
                );
              })}
            </div>
            {errors.services && <span className="form-error block mt-2">{errors.services.message}</span>}
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 1 && (
          <div className="animate-fade-in-up space-y-6">
            <h3 className="text-2xl font-heading font-semibold text-white mb-8">Tell us about the project</h3>
            
            <div className="form-group">
              <label htmlFor="location" className="form-label">Project Location (City/Area) *</label>
              <input
                id="location"
                type="text"
                className={`form-input ${errors.location ? 'error' : ''}`}
                placeholder="e.g. DHA Phase 6, Lahore"
                {...register('location')}
              />
              {errors.location && <span className="form-error">{errors.location.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="areaSqft" className="form-label">Approximate Area (Sq.Ft) *</label>
                <input
                  id="areaSqft"
                  type="text"
                  className={`form-input ${errors.areaSqft ? 'error' : ''}`}
                  placeholder="e.g. 4500"
                  {...register('areaSqft')}
                />
                {errors.areaSqft && <span className="form-error">{errors.areaSqft.message}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="budgetRange" className="form-label">Estimated Budget Range *</label>
                <select
                  id="budgetRange"
                  className={`form-select ${errors.budgetRange ? 'error' : ''}`}
                  {...register('budgetRange')}
                >
                  <option value="">Select a range</option>
                  <option value="Under 5 Million PKR">Under 5 Million PKR</option>
                  <option value="5M - 15M PKR">5 Million - 15 Million PKR</option>
                  <option value="15M - 50M PKR">15 Million - 50 Million PKR</option>
                  <option value="50M - 100M PKR">50 Million - 100 Million PKR</option>
                  <option value="100M+ PKR">100+ Million PKR</option>
                  <option value="To be discussed">To be discussed</option>
                </select>
                {errors.budgetRange && <span className="form-error">{errors.budgetRange.message}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {currentStep === 2 && (
          <div className="animate-fade-in-up space-y-6">
            <h3 className="text-2xl font-heading font-semibold text-white mb-8">How can we reach you?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="q_name" className="form-label">Full Name *</label>
                <input
                  id="q_name"
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="John Doe"
                  {...register('name')}
                />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="q_phone" className="form-label">Phone Number *</label>
                <input
                  id="q_phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+92 300 1234567"
                  {...register('phone')}
                />
                {errors.phone && <span className="form-error">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="q_email" className="form-label">Email Address (Optional)</label>
              <input
                id="q_email"
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="john@example.com"
                {...register('email')}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="q_message" className="form-label">Additional Details (Optional)</label>
              <textarea
                id="q_message"
                className="form-textarea min-h-[100px]"
                placeholder="Any specific requirements or questions..."
                {...register('message')}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[var(--border)]">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            className={currentStep === 0 ? 'invisible' : ''}
          >
            <ArrowLeft size={16} className="mr-2" /> Back
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button type="button" onClick={nextStep} className="min-w-[120px]">
              Next Step <ArrowRight size={16} className="ml-2" />
            </Button>
          ) : (
            <Button type="submit" isLoading={isSubmitting} className="min-w-[160px]">
              Submit Request
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
