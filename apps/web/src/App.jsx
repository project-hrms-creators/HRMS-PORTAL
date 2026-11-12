import React from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-border p-8 text-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md text-white">
          <Building2 size={32} />
        </div>
        <h1 className="text-2xl font-bold text-textPrimary font-inter mb-2">
          WorkForce HRMS Portal
        </h1>
        <p className="text-textSecondary text-sm mb-6">
          React Web scaffold active and ready for module migration.
        </p>
        <div className="flex items-center justify-center gap-2 text-success text-sm font-semibold bg-green-50 py-2 px-4 rounded-md border border-green-200">
          <CheckCircle2 size={18} />
          <span>Vite + Tailwind + React 19 Ready</span>
        </div>
      </div>
    </div>
  );
}
