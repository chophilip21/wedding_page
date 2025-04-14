'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RSVPSection = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email })
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setStatusMessage({ type: 'success', text: t('rsvpSuccessMessage') });
        // Optionally clear the fields after successful submission
        setFirstName('');
        setLastName('');
        setEmail('');
      } else if (data.status === 'duplicate') {
        setStatusMessage({ type: 'warning', text: t('duplicateWarning') });
      } else {
        setStatusMessage({ type: 'error', text: t('generalErrorMessage') });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatusMessage({ type: 'error', text: t('generalErrorMessage') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp-section" className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('rsvpTitle')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700">
              {t('firstNameLabel')}
            </label>
            <input 
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700">
              {t('lastNameLabel')}
            </label>
            <input 
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              {t('emailLabel')}
            </label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button 
              type="submit"
              disabled={submitting}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold text-base rounded-lg shadow hover:bg-indigo-700 transition duration-150"
              >
              {submitting ? t('submitting') : t('submitButton')}
            </button>
          </div>
        </form>
        {statusMessage && (
          <div 
            className={`mt-4 text-center ${
              statusMessage.type === 'success'
                ? 'text-green-600'
                : statusMessage.type === 'warning'
                ? 'text-yellow-600'
                : 'text-red-600'
            }`}
          >
            {statusMessage.text}
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
