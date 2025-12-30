'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface VoteResult {
  colorName: string;
  count: number;
}

export default function ResultsScreen() {
  const [results, setResults] = useState<VoteResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/results');
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to load results');
        return;
      }

      setResults(data);
      setError(null);
    } catch (err) {
      console.error('Error loading results:', err);
      setError('Failed to load results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const maxVotes = results.length > 0 ? Math.max(...results.map((r) => r.count)) : 1;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Voting Results
        </h1>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading results...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No votes recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((result) => (
                  <div key={result.colorName} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">
                        {result.colorName}
                      </span>
                      <span className="text-lg font-semibold text-gray-800">
                        {result.count} {result.count === 1 ? 'vote' : 'votes'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                      <div
                        className={`h-full rounded-full flex items-center justify-center text-white font-medium transition-all duration-500 ${
                          result.colorName === 'Blue'
                            ? 'bg-blue-600'
                            : result.colorName === 'Yellow'
                            ? 'bg-yellow-500'
                            : 'bg-green-600'
                        }`}
                        style={{
                          width: `${(result.count / maxVotes) * 100}%`,
                        }}
                      >
                        {result.count > 0 && (
                          <span className="text-sm">{result.count}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={fetchResults}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Refresh
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors inline-block text-center"
          >
            Back to Voting
          </Link>
        </div>
      </div>
    </div>
  );
}

