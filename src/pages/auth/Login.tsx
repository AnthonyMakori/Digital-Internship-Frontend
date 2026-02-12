import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { demoCredentials } from '@/utils/mockData';
import { Briefcase, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      const cred = demoCredentials.find((c) => c.email === email);
      navigate(`/${cred?.role}/dashboard`);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const quickLogin = async (cred: typeof demoCredentials[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
    const result = await login(cred.email, cred.password);
    if (result.success) navigate(`/${cred.role}/dashboard`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12" style={{ background: 'var(--gradient-primary)' }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur">
            <Briefcase className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary-foreground">InternFlow</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight text-primary-foreground">
            Manage internships<br />with confidence
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/70">
            A complete lifecycle management system for students, companies, lecturers, and administrators.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/50">© 2026 InternFlow. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">InternFlow</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Enter your email" required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border bg-card px-4 py-2.5 pr-10 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Enter your password" required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit" disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div>
            <p className="mb-3 text-center text-xs font-medium text-muted-foreground">Quick demo access</p>
            <div className="grid grid-cols-2 gap-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => quickLogin(cred)}
                  disabled={isLoading}
                  className="rounded-lg border bg-card px-3 py-2 text-left text-xs transition-all hover:border-primary/30 hover:bg-primary/5 disabled:opacity-60"
                >
                  <span className="block font-semibold capitalize">{cred.role}</span>
                  <span className="text-muted-foreground">{cred.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
