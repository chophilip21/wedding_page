'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RSVPSection = ({ language }) => {
  const { t, i18n, ready } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // 1️⃣ Sync i18n to the incoming language prop
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // 2️⃣ Wait until translations have loaded
  if (!ready) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          language: i18n.language,
        }),
      });
      const data = await res.json();

      if (res.ok && data.status === 'success') {
        setStatusMessage({ type: 'success', text: t('rsvpSuccessMessage') });
        setFirstName('');
        setLastName('');
        setEmail('');
      } else if (data.status === 'duplicate') {
        setStatusMessage({ type: 'warning', text: t('duplicateWarning') });
      } else {
        setStatusMessage({ type: 'error', text: t('generalErrorMessage') });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: t('generalErrorMessage') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp-section"
      className="flex justify-center items-center min-h-screen bg-gray-50"
    >
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('rsvpTitle')}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="md:col-span-2">
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
          <div className="md:col-span-2">
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
