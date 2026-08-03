import * as React from 'react';

interface QuotationEmailProps {
  name: string;
  email?: string;
  phone: string;
  services: string[];
  location: string;
  areaSqft: string;
  budgetRange: string;
  message?: string;
}

export const QuotationEmail: React.FC<Readonly<QuotationEmailProps>> = ({
  name,
  email,
  phone,
  services,
  location,
  areaSqft,
  budgetRange,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#C9A84C', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
      New Quotation Request
    </h1>
    
    <div style={{ margin: '20px 0' }}>
      <h3 style={{ color: '#555', marginTop: '20px' }}>Client Details</h3>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Email:</strong> {email || 'Not provided'}</p>
      
      <h3 style={{ color: '#555', marginTop: '30px' }}>Project Details</h3>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Area:</strong> {areaSqft} Sq.Ft.</p>
      <p><strong>Estimated Budget:</strong> {budgetRange}</p>
      <p><strong>Requested Services:</strong></p>
      <ul style={{ margin: '10px 0' }}>
        {services.map(s => (
          <li key={s}>{s.replace('-', ' ')}</li>
        ))}
      </ul>
    </div>

    {message && (
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Additional Details:</p>
        <p style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{message}</p>
      </div>
    )}

    <p style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
      This email was sent from the Saibaan Construction website quotation form. You can view and manage this request in the Admin Panel.
    </p>
  </div>
);
