import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, User as UserIcon, Lock } from 'lucide-react';
import { loginSchema } from '@/core/auth/authSchema';
import { TextInput } from '@/shared/components/TextInput';
import { PasswordInput } from '@/shared/components/PasswordInput';
import { Button } from '@/shared/components/Button';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { LoadingOverlay } from '@/shared/components/LoadingOverlay';
import { authService } from '@/core/auth/authService';
import { useAuthStore } from '@/core/auth/authStore';
import { useRbacStore } from '@/core/rbac/store/rbacStore';
import { ROLES } from '@/core/rbac/roles';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTokens, setUser, setLoading, setError, isLoading, error } = useAuthStore();
  const syncWithUser = useRbacStore((state) => state.syncWithUser);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: 'aarav.patel@company.com',
      password: 'password123',
      role: ROLES.EMPLOYEE,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(data.identifier, data.password, data.role);
      setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
      syncWithUser(response.user);
      setLoading(false);

      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error?.message || err?.message || 'Network error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 sm:p-6 font-inter">
      <LoadingOverlay visible={isLoading} />

      <div className="w-full max-w-md animate-in fade-in duration-300">
        {/* Branding Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-bold text-textPrimary tracking-tight">WorkForce</h1>
          <p className="text-textSecondary text-sm mt-1">Sign in to your HRMS portal</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-border">
          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              control={control}
              name="identifier"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email or Employee ID"
                  placeholder="e.g. employee@company.com"
                  icon={UserIcon}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.identifier?.message}
                  autoComplete="username"
                />
              )}
            />

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-textSecondary text-sm font-medium">Password</label>
                <button
                  type="button"
                  onClick={() => alert('Please contact HR/IT administrator to reset your password.')}
                  className="text-primary text-xs font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <PasswordInput
                    placeholder="Enter your password"
                    icon={Lock}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.password?.message}
                    autoComplete="current-password"
                  />
                )}
              />
            </div>

            {/* Role Switcher for MVP Testing */}
            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <div className="pt-1">
                  <label className="block text-textSecondary text-xs font-semibold mb-2 uppercase tracking-wider">
                    Role Selector (Demo & Testing)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(ROLES).map((roleOption) => (
                      <button
                        type="button"
                        key={roleOption}
                        onClick={() => onChange(roleOption)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                          value === roleOption
                            ? 'bg-primary text-white border-primary shadow-xs'
                            : 'bg-surface text-textSecondary border-border hover:bg-gray-100'
                        }`}
                      >
                        {roleOption.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            />

            <div className="pt-2">
              <Button 
                type="submit"
                title="Sign In" 
                loading={isLoading}
                styleClass="w-full"
              />
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center text-xs text-textSecondary">
            Need access to your organization?{' '}
            <span className="text-primary font-semibold cursor-pointer hover:underline">Contact HR Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
