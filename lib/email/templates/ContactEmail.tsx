import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
  name,
  email,
  phone,
  subject,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#C9A84C', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
      New Contact Form Submission
    </h1>
    
    <div style={{ margin: '20px 0' }}>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Subject:</strong> {subject}</p>
    </div>

    <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
      <p style={{ margin: 0, fontWeight: 'bold' }}>Message:</p>
      <p style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{message}</p>
    </div>

    <p style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
      This email was sent from the Saibaan Construction website contact form.
    </p>
  </div>
);
