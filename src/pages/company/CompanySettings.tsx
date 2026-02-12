import { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Building2, Upload, Save, Globe, Phone, Mail, MapPin, FileText, Image } from 'lucide-react';

interface CompanyProfile {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  country: string;
  description: string;
  industry: string;
  size: string;
  logoUrl: string | null;
}

export default function CompanySettings() {
  const { user } = useAuth();
  const isCompanyAdmin = user?.companyRole === 'admin';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<CompanyProfile>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+254 700 000 000',
    website: 'https://techcorp.co',
    address: '123 Innovation Drive',
    city: 'Nairobi',
    country: 'Kenya',
    description: 'A leading technology company specializing in software development, data analytics, and IT consultancy services across East Africa.',
    industry: 'Technology',
    size: '50-200',
    logoUrl: null,
  });

  const [saved, setSaved] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, logoUrl: url });
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isCompanyAdmin) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold">Access Restricted</h2>
          <p className="text-muted-foreground mt-2">Only the company admin can manage company settings.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Company Settings</h1>
            <p className="text-muted-foreground">Manage your company profile, logo, and details</p>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Save className="h-4 w-4" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Logo Section */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" /> Company Logo
          </h3>
          <div className="flex items-center gap-6">
            <div
              className="relative flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {profile.logoUrl ? (
                <img src={profile.logoUrl} alt="Company logo" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">Upload</span>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            <div className="space-y-1">
              <p className="text-sm font-medium">Upload your company logo</p>
              <p className="text-xs text-muted-foreground">Recommended: 512x512px, PNG or JPG. This will appear across the system.</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-secondary"
              >
                Choose File
              </button>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" /> Basic Information
            </h3>
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <select
                value={profile.industry}
                onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {['Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 'Consulting', 'Media', 'Other'].map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Company Size</label>
              <select
                value={profile.size}
                onChange={(e) => setProfile({ ...profile, size: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              >
                {['1-10', '11-50', '50-200', '200-500', '500+'].map(s => (
                  <option key={s} value={s}>{s} employees</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                rows={4}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary resize-none"
              />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-accent" /> Contact & Location
            </h3>
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Website</label>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <input
                  type="text"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
