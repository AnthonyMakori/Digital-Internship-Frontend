import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DEPARTMENTS } from '@/utils/constants';
import { Plus, X, Trash2, Settings, Tag, BookOpen } from 'lucide-react';

export default function AdminSettings() {
  const [departments, setDepartments] = useState<string[]>([...DEPARTMENTS]);
  const [categories, setCategories] = useState(['Full-time', 'Part-time', 'Remote', 'Hybrid']);
  const [newDept, setNewDept] = useState('');
  const [newCat, setNewCat] = useState('');

  const addDept = () => { if (newDept.trim()) { setDepartments([...departments, newDept.trim()]); setNewDept(''); } };
  const addCat = () => { if (newCat.trim()) { setCategories([...categories, newCat.trim()]); setNewCat(''); } };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure departments, categories, and evaluation templates</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Departments */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Departments</h3>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newDept} onChange={(e) => setNewDept(e.target.value)} placeholder="New department"
                className="flex-1 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" onKeyDown={(e) => e.key === 'Enter' && addDept()} />
              <button onClick={addDept} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="space-y-2">
              {departments.map((d, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-2.5 table-row-hover">
                  <span className="text-sm">{d}</span>
                  <button onClick={() => setDepartments(departments.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Tag className="h-5 w-5 text-accent" /> Categories</h3>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category"
                className="flex-1 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" onKeyDown={(e) => e.key === 'Enter' && addCat()} />
              <button onClick={addCat} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="space-y-2">
              {categories.map((c, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-2.5 table-row-hover">
                  <span className="text-sm">{c}</span>
                  <button onClick={() => setCategories(categories.filter((_, idx) => idx !== i))} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Template */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BookOpen className="h-5 w-5 text-warning" /> Evaluation Template</h3>
          <div className="space-y-3">
            {[
              { criterion: 'Technical Skills', weight: 30 },
              { criterion: 'Communication', weight: 20 },
              { criterion: 'Teamwork', weight: 20 },
              { criterion: 'Problem Solving', weight: 15 },
              { criterion: 'Punctuality & Attendance', weight: 15 },
            ].map((item) => (
              <div key={item.criterion} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium">{item.criterion}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.weight}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-primary w-10 text-right">{item.weight}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
