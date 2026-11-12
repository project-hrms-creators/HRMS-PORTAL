import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function UnauthorizedScreen({ redirect = true }) {
  const location = useLocation();

  if (redirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-border p-8 text-center">
        <h1 className="text-2xl font-bold text-textPrimary mb-2">Unauthorized Access</h1>
        <p className="text-textSecondary text-sm mb-6">
          Please sign in to access this section.
        </p>
        <a
          href="/login"
          className="inline-block px-5 py-2.5 bg-primary text-white rounded-md hover:bg-blue-700 text-sm font-medium transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
