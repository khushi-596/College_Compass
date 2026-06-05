'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

interface NotificationSubscribeProps {
  collegeId: string;
  collegeName: string;
}

export default function NotificationSubscribe({
  collegeId,
  collegeName,
}: NotificationSubscribeProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, collegeId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to subscribe');
        return;
      }

      setMessage(data.message);
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Error subscribing to notifications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        📧 Stay Updated
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Get updates and notifications about {collegeName}
      </p>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Subscribing...' : 'Subscribe to Updates'}
        </button>

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
