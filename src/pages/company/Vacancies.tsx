import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockVacancies } from '@/utils/mockData';
import { DEPARTMENTS, LOCATIONS, DURATIONS } from '@/utils/constants';
import { Plus, Edit, Trash2, X, Eye, Users } from 'lucide-react';
import type { Vacancy } from '@/utils/mockData';

export default function CompanyVacancies() {
  const [vacancies, setVacancies] = useState(mockVacancies.filter((v) => v.companyId === 'com-1'));
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vacancy | null>(null);
  const [form, setForm] = useState({ title: '', department: '', location: '', duration: '', description: '', requirements: '' });

  const openForm = (vac?: Vacancy) => {
    if (vac) {
      setEditing(vac);
      setForm({ title: vac.title, department: vac.department, location: vac.location, duration: vac.duration, description: vac.description, requirements: vac.requirements.join(', ') });
    } else {
      setEditing(null);
      setForm({ title: '', department: '', location: '', duration: '', description: '', requirements: '' });
    }
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setVacancies(vacancies.map((v) => v.id === editing.id ? { ...v, ...form, requirements: form.requirements.split(',').map((r) => r.trim()) } : v));
    } else {
      const newVac: Vacancy = {
        id: `vac-${Date.now()}`, ...form, requirements: form.requirements.split(',').map((r) => r.trim()),
        company: 'TechCorp Ltd', companyId: 'com-1', status: 'open', applicants: 0, createdAt: new Date().toISOString().slice(0, 10),
      };
      setVacancies([newVac, ...vacancies]);
    }
    setShowForm(false);
  };

  const toggleStatus = (id: string) => {
    setVacancies(vacancies.map((v) => v.id === id ? { ...v, status: v.status === 'open' ? 'closed' : 'open' } : v));
  };

  const deleteVacancy = (id: string) => {
    setVacancies(vacancies.filter((v) => v.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Vacancy Management</h1>
            <p className="text-muted-foreground">Create and manage internship positions</p>
          </div>
          <button onClick={() => openForm()} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> New Vacancy
          </button>
        </div>

        <div className="space-y-3">
          {vacancies.map((vac) => (
            <div key={vac.id} className="stat-card">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{vac.title}</h3>
                  <p className="text-sm text-muted-foreground">{vac.department} • {vac.location} • {vac.duration}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {vac.applicants} applicants</span>
                    <span>Created {vac.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={vac.status} />
                  <button onClick={() => toggleStatus(vac.id)} className="rounded-md border p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary" title={vac.status === 'open' ? 'Close' : 'Reopen'}>
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => openForm(vac)} className="rounded-md border p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => deleteVacancy(vac.id)} className="rounded-md border p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/5">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-slide-up max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">{editing ? 'Edit Vacancy' : 'Create Vacancy'}</h3>
                <button onClick={() => setShowForm(false)} className="rounded-md p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Title</label>
                  <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Department</label>
                    <select required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary">
                      <option value="">Select</option>
                      {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Location</label>
                    <select required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary">
                      <option value="">Select</option>
                      {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Duration</label>
                  <select required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary">
                    <option value="">Select</option>
                    {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Description</label>
                  <textarea rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Requirements (comma-separated)</label>
                  <input type="text" required value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                    placeholder="React, TypeScript, Git" className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-secondary">Cancel</button>
                  <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">{editing ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
