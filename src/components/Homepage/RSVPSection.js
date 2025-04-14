'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RSVPSection = () => {
  const { t } = useTranslation();
  
  // State for form fields and messages
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);  // Reset the message

    try {
      const response = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setStatusMessage(t('rsvpSuccessMessage'));
        // Optionally clear the fields after a successful submission
        setFirstName('');
        setLastName('');
        setEmail('');
      } else if (data.status === 'duplicate') {
        setStatusMessage(t('duplicateWarning'));
      } else {
        setStatusMessage(t('generalErrorMessage'));
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setStatusMessage(t('generalErrorMessage'));
    }
  };

  return (
    <section className="rsvp-section">
      <h2>{t('rsvpTitle')}</h2>
      <form onSubmit={handleSubmit} className="rsvp-form">
        <div className="form-group">
          <label htmlFor="firstName">{t('firstNameLabel')}</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">{t('lastNameLabel')}</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">{t('emailLabel')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">{t('submitButton')}</button>
      </form>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </section>
  );
};

export default RSVPSection;
