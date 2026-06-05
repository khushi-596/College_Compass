'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

interface SendComparisonEmailProps {
  colleges: any[];
}

export default function SendComparisonEmail({ colleges }: SendComparisonEmailProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/notifications/send-comparison', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, colleges }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send email');
        return;
      }

      setMessage(data.message);
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Error sending email');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 dark:bg-slate-900 border border-green-200 dark:border-green-900 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        📧 Email Comparison
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Send this comparison to your email for easy reference
      </p>

      <form onSubmit={handleSendEmail} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </div>

        {message && (
          <div className="text-green-600 dark:text-green-400 text-sm font-medium">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm font-medium">
            ✗ {error}
          </div>
        )}
      </form>
    </div>
  );
}
