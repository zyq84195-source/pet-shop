'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FAQPage() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    { q: 'q1', a: 'a1' },
    { q: 'q2', a: 'a2' },
    { q: 'q3', a: 'a3' },
    { q: 'q4', a: 'a4' },
    { q: 'q5', a: 'a5' },
    { q: 'q6', a: 'a6' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <p className="text-white/90 mt-2">{t('subtitle')}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {t(`questions.${item.q}`)}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{t(`questions.${item.a}`)}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Please contact our friendly team.
          </p>
          <a
            href="/en/contact"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
