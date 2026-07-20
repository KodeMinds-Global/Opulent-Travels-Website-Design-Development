import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { authService } from '../services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export function AdminLoginPage() {
  const base = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await authService.login(data.email, data.password);
      navigate('/admin/dashboard');
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ══════════════════════════════════════
          LEFT PANEL — Hero image
      ══════════════════════════════════════ */}
      <div
        className="hidden md:flex md:w-1/2 relative flex-col justify-end"
        style={{
          backgroundImage: `url('${base}assets/images/Sri_Lanka_bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* decorative gold lines top-left */}
        <div className="absolute top-10 left-10 flex flex-col gap-1.5">
          <span className="block w-10 h-0.5 bg-[#FFD700]" />
          <span className="block w-6 h-0.5 bg-[#FFD700]/50" />
        </div>

        <div className="relative z-10 p-10 pb-14">
          <span className="inline-block text-[#FFD700] font-montserrat text-xs tracking-[0.3em] uppercase mb-4">
            Admin Portal
          </span>
          <h1 className="font-playfair font-bold text-5xl text-white leading-tight">
            Opulnet
            <br />
            <span className="text-[#FFD700]">Travels</span>
          </h1>
          <p className="font-lora text-white/65 mt-4 text-base leading-relaxed max-w-xs">
            Curating extraordinary journeys across Sri Lanka &amp; the Maldives.
          </p>
          <div className="mt-8 flex items-center gap-2">
            <span className="block w-10 h-1 rounded-full bg-[#FFD700]" />
            <span className="block w-3 h-1 rounded-full bg-white/30" />
            <span className="block w-3 h-1 rounded-full bg-white/30" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT PANEL — Light background
      ══════════════════════════════════════ */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #F8F5EE 0%, #FDF9F2 50%, #F5F0E8 100%)' }}
      >
        {/* Soft decorative blobs */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #D4A853 0%, transparent 70%)' }}
        />

        {/* Form card */}
        <div
          className="relative z-10 w-full max-w-md rounded-2xl p-8"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 8px 40px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
            border: '1px solid rgba(212, 168, 83, 0.20)',
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-7">
            <img
              src={`${base}assets/images/logo-dark.png`}
              alt="Opulnet Travels"
              className="h-12 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h2 className="font-playfair font-bold text-2xl text-gray-900">
              Welcome Back
            </h2>
            <p className="font-lora text-gray-500 mt-1.5 text-sm">
              Sign in to manage your portal
            </p>
            <div className="flex justify-center mt-4">
              <span className="block w-12 h-0.5 rounded-full bg-[#FFD700]" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="font-montserrat text-xs font-semibold tracking-wider uppercase text-gray-500"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@opulnettravels.com"
                  autoComplete="email"
                  className="h-11 pl-10 font-lora text-sm bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#D4A853] focus:ring-[#D4A853]/20 rounded-xl"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-lora pl-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="font-montserrat text-xs font-semibold tracking-wider uppercase text-gray-500"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 pl-10 pr-10 font-lora text-sm bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#D4A853] focus:ring-[#D4A853]/20 rounded-xl"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#D4A853] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-lora pl-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 font-montserrat font-bold text-sm tracking-widest uppercase rounded-xl shadow-md transition-all duration-200 hover:shadow-[0_4px_20px_rgba(212,168,83,0.45)] hover:scale-[1.02] active:scale-[0.99]"
                disabled={loading}
                style={{ background: 'linear-gradient(135deg, #FFD700 0%, #D4A853 100%)', color: '#1A1A1A' }}
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-400 font-lora">
            © {new Date().getFullYear()} Opulnet Travels. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}