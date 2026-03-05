import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { DEPARTMENTS, LOCATIONS, DURATIONS } from '@/utils/constants';
import { Plus, Edit, Trash2, X, Eye, Users } from 'lucide-react';

interface Vacancy {
  id: number;
  title: string;
  department: string;
  location: string;
  duration: string;
  description: string;
  requirements: string[];
  company_id: number;
  status: 'open' | 'closed';
  applicants: number;
  created_at: string;
}

const API_URL = 'http://localhost:8000/api';
const COMPANY_ID = 1; 

export default function CompanyVacancies() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vacancy | null>(null);
  const [form, setForm] = useState({
    title: '',
    department: '',
    location: '',
    duration: '',
    description: '',
    requirements: '',
  });

  /* ================================
     FETCH VACANCIES
  ================================= */
  const fetchVacancies = async () => {
    try {
      const res = await fetch(`${API_URL}/company/${COMPANY_ID}/vacancies`);
      const data = await res.json();
      setVacancies(data);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  /* ================================
     OPEN FORM
  ================================= */
  const openForm = (vac?: Vacancy) => {
    if (vac) {
      setEditing(vac);
      setForm({
        title: vac.title,
        department: vac.department,
        location: vac.location,
        duration: vac.duration,
        description: vac.description,
        requirements: vac.requirements.join(', '),
      });
    } else {
      setEditing(null);
      setForm({
        title: '',
        department: '',
        location: '',
        duration: '',
        description: '',
        requirements: '',
      });
    }
    setShowForm(true);
  };

  /* ================================
     CREATE / UPDATE
  ================================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      requirements: form.requirements.split(',').map((r) => r.trim()),
      company_id: COMPANY_ID,
    };

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/vacancies/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const updated = await res.json();

        setVacancies((prev) =>
          prev.map((v) => (v.id === editing.id ? updated : v))
        );
      } else {
        const res = await fetch(`${API_URL}/vacancies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const newVacancy = await res.json();
        setVacancies((prev) => [newVacancy, ...prev]);
      }

      setShowForm(false);
    } catch (error) {
      console.error('Error saving vacancy:', error);
    }
  };

  /* ================================
     TOGGLE STATUS
  ================================= */
  const toggleStatus = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/vacancies/${id}/toggle`, {
        method: 'PATCH',
      });

      const updated = await res.json();

      setVacancies((prev) =>
        prev.map((v) => (v.id === id ? updated : v))
      );
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  /* ================================
     DELETE
  ================================= */
  const deleteVacancy = async (id: number) => {
    try {
      await fetch(`${API_URL}/vacancies/${id}`, {
        method: 'DELETE',
      });

      setVacancies((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error('Error deleting vacancy:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Vacancy Management</h1>
            <p className="text-muted-foreground">
              Create and manage internship positions
            </p>
          </div>
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> New Vacancy
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading vacancies...</p>
        ) : (
          <div className="space-y-3">
            {vacancies.map((vac) => (
              <div key={vac.id} className="stat-card">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{vac.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {vac.department} • {vac.location} • {vac.duration}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {vac.applicants} applicants
                      </span>
                      <span>
                        Created {new Date(vac.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <StatusBadge status={vac.status} />

                    <button
                      onClick={() => toggleStatus(vac.id)}
                      className="rounded-md border p-1.5 hover:bg-secondary"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => openForm(vac)}
                      className="rounded-md border p-1.5 hover:bg-secondary"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => deleteVacancy(vac.id)}
                      className="rounded-md border p-1.5 hover:text-destructive hover:bg-destructive/5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= FORM MODAL ================= */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  {editing ? 'Edit Vacancy' : 'Create Vacancy'}
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-md p-1.5 hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2.5 text-sm"
                />

                <select
                  required
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                >
                  <option value="">Select Department</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <select
                  required
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                >
                  <option value="">Select Location</option>
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>

                <select
                  required
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                >
                  <option value="">Select Duration</option>
                  {DURATIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>

                <textarea
                  rows={3}
                  required
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2.5 text-sm"
                />

                <input
                  type="text"
                  required
                  placeholder="React, TypeScript, Git"
                  value={form.requirements}
                  onChange={(e) =>
                    setForm({ ...form, requirements: e.target.value })
                  }
                  className="w-full rounded-lg border px-4 py-2.5 text-sm"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 rounded-lg border px-4 py-2.5 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    {editing ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}