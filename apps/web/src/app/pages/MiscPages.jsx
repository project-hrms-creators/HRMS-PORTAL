import React from 'react';
import { Card } from '@/shared/components/Card';
import { Settings, Shield, Bell } from 'lucide-react';
import { Button } from '@/shared/components/Button';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textPrimary flex items-center gap-2">
        <Settings size={22} className="text-primary" />
        System & Application Settings
      </h1>
      <Card>
        <h2 className="text-base font-bold text-textPrimary mb-2">Preferences</h2>
        <p className="text-textSecondary text-sm mb-4">Configure language, time zone, and notification delivery options.</p>
        <Button title="Save Preferences" variant="primary" />
      </Card>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-xl font-bold text-textPrimary mb-2">Page Not Found</h2>
      <p className="text-textSecondary text-sm mb-6 max-w-sm">
        The requested page does not exist or has been relocated.
      </p>
      <a 
        href="/dashboard" 
        className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
      >
        Return to Dashboard
      </a>
    </div>
  );
}
