import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/core/auth/authStore';
import { ShieldAlert } from 'lucide-react';

export default function ForbiddenScreen() {
  const navigate = useNavigate();
  const logoutAction = useAuthStore((state) => state.logoutAction);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-border p-8 text-center">
        <div className="w-16 h-16 bg-red-100 text-error rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldAlert size={32} />
        </div>
        <h1 className="text-2xl font-bold text-textPrimary mb-2">Access Denied</h1>
        <p className="text-textSecondary text-sm mb-6">
          You do not have the required permissions to view this content.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-border rounded-md text-textPrimary hover:bg-gray-50 text-sm font-medium transition"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={() => logoutAction()}
            className="px-4 py-2 bg-error text-white rounded-md hover:bg-red-700 text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
