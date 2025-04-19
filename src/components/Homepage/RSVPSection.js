'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import images from '@/utils/imagesImport';
import translations from '@/utils/translations';

const RSVPSection = ({ language }) => {
  const { t, i18n, ready } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Sync language
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  if (!ready) return null;

  // Header texts from translations.js
  const { top_title, title: { main, sub }, description_1 } = translations[language].rsvp_section;
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/submit-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, language: i18n.language }),
      });
      const data = await res.json();

      if (res.ok && data.status === 'success') {
        setStatusMessage({ type: 'success', text: t('rsvpSuccessMessage') });
        setFirstName(''); setLastName(''); setEmail('');
      } else if (data.status === 'duplicate') {
        setStatusMessage({ type: 'warning', text: t('duplicateWarning') });
      } else {
        setStatusMessage({ type: 'error', text: t('generalErrorMessage') });
      }
    } catch {
      setStatusMessage({ type: 'error', text: t('generalErrorMessage') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp-section" className="py-12 px-4 sm:px-6 bg-blue text-white flex justify-center items-center flex-col overflow-hidden">

      {/* Animated Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center mb-8"
      >
        <Image src={images.glasses} alt="glass" width={95} height={95} className="mb-4 brightness-95" />
        <h3 translate="no" className="text-white font-bold text-2xl mb-2">{top_title}</h3>
        <h3 translate="no" className="text-gold text-6xl alex-brush font-light">
          {main}<span className="block">{sub}</span>
        </h3>
        <p translate="no" className="mt-4 text-center text-white max-w-lg">
          {Array.isArray(description_1)
            ? description_1.map((part, i) => typeof part === 'string' ? part : <strong key={i}>{part.text}</strong>)
            : description_1}
        </p>
      </motion.div>

      {/* Form */}
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-sm rounded-md shadow-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-white">{t('firstNameLabel')}</label>
            <input id="firstName" type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-4 py-2 bg-white text-black rounded-md focus:ring-2 focus:ring-gold" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-white">{t('lastNameLabel')}</label>
            <input id="lastName" type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-4 py-2 bg-white text-black rounded-md focus:ring-2 focus:ring-gold" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-white">{t('emailLabel')}</label>
            <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 bg-white text-black rounded-md focus:ring-2 focus:ring-gold" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={submitting} className="w-full py-2 bg-gold text-blue font-semibold rounded-lg shadow hover:bg-yellow-500 transition">
              {submitting ? t('submitButton') : t('submitButton')}
            </button>
          </div>
        </form>
        {statusMessage && (
          <div className={`mt-4 text-center ${statusMessage.type==='success'?'text-green-300':statusMessage.type==='warning'?'text-yellow-300':'text-red-300'}`}>{statusMessage.text}</div>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
