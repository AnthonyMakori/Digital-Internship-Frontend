'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Plus, Trash2, Settings, Tag, BookOpen, Building2, GraduationCap, ChevronDown, ChevronRight, Pencil, Check, X, AlertTriangle } from 'lucide-react';

export default function AdminSettings() {
  // ---------- STATE ----------
  const [departments, setDepartments] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [expandedUni, setExpandedUni] = useState<string | null>(null);

  const [newDept, setNewDept] = useState('');
  const [newCat, setNewCat] = useState('');
  const [newUni, setNewUni] = useState({ name: '', location: '' });
  const [newFaculty, setNewFaculty] = useState({ name: '', universityId: '', departments: '' });
  const [showAddUni, setShowAddUni] = useState(false);
  const [showAddFaculty, setShowAddFaculty] = useState(false);

  const [evalCriteria, setEvalCriteria] = useState<any[]>([]);
  const [newCriterion, setNewCriterion] = useState({ criterion: '', weight: 10 });
  const [editingCriterion, setEditingCriterion] = useState<number | null>(null);
  const [editWeight, setEditWeight] = useState(0);

  const [systemConfig, setSystemConfig] = useState<any>({
    maxInternDuration: '6',
    maxApplicationsPerStudent: '5',
    logbookReminderDays: '3',
    autoCloseVacancyDays: '30',
    requireCoverLetter: true,
    requireCV: true,
    allowMultipleAttachments: false,
    enableEmailNotifications: true,
  });

  const totalWeight = evalCriteria.reduce((sum, c) => sum + c.weight, 0);

  // ---------- FETCH INITIAL DATA ----------
  useEffect(() => {
    fetchDepartments();
    fetchCategories();
    fetchUniversities();
    fetchFaculties();
    fetchEvalCriteria();
    fetchSystemConfig();
  }, []);

  const fetchDepartments = async () => {
    const res = await fetch('/api/departments');
    const data = await res.json();
    setDepartments(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  const fetchUniversities = async () => {
    const res = await fetch('/api/universities');
    const data = await res.json();
    setUniversities(data);
  };

  const fetchFaculties = async () => {
    const res = await fetch('/api/faculties');
    const data = await res.json();
    setFaculties(data);
  };

  const fetchEvalCriteria = async () => {
    const res = await fetch('/api/evaluation-criteria');
    const data = await res.json();
    setEvalCriteria(data);
  };

  const fetchSystemConfig = async () => {
    const res = await fetch('/api/system-config');
    const data = await res.json();
    setSystemConfig(data);
  };

  // ---------- DEPARTMENTS ----------
  const addDept = async () => {
    if (!newDept.trim()) return;
    await fetch('/api/departments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newDept.trim() }) });
    fetchDepartments();
    setNewDept('');
  };

  const deleteDept = async (name: string) => {
    await fetch(`/api/departments/${name}`, { method: 'DELETE' });
    fetchDepartments();
  };

  // ---------- CATEGORIES ----------
  const addCat = async () => {
    if (!newCat.trim()) return;
    await fetch('/api/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newCat.trim() }) });
    fetchCategories();
    setNewCat('');
  };

  const deleteCat = async (name: string) => {
    await fetch(`/api/categories/${name}`, { method: 'DELETE' });
    fetchCategories();
  };

  // ---------- UNIVERSITIES ----------
  const addUniversity = async () => {
    if (!newUni.name.trim() || !newUni.location.trim()) return;
    await fetch('/api/universities', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUni) });
    fetchUniversities();
    setNewUni({ name: '', location: '' });
    setShowAddUni(false);
  };

  const removeUniversity = async (id: string) => {
    await fetch(`/api/universities/${id}`, { method: 'DELETE' });
    fetchUniversities();
    fetchFaculties();
  };

  // ---------- FACULTIES ----------
  const addFaculty = async () => {
    if (!newFaculty.name.trim() || !newFaculty.universityId) return;
    const payload = { ...newFaculty, departments: newFaculty.departments.split(',').map(d => d.trim()) };
    await fetch('/api/faculties', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    fetchFaculties();
    setNewFaculty({ name: '', universityId: '', departments: '' });
    setShowAddFaculty(false);
  };

  const removeFaculty = async (id: string) => {
    await fetch(`/api/faculties/${id}`, { method: 'DELETE' });
    fetchFaculties();
  };

  // ---------- EVALUATION CRITERIA ----------
  const addEvalCriterion = async () => {
    if (!newCriterion.criterion.trim() || newCriterion.weight <= 0) return;
    await fetch('/api/evaluation-criteria', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCriterion) });
    fetchEvalCriteria();
    setNewCriterion({ criterion: '', weight: 10 });
  };

  const updateEvalCriterion = async (id: string, weight: number) => {
    await fetch(`/api/evaluation-criteria/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ weight }) });
    fetchEvalCriteria();
  };

  const deleteEvalCriterion = async (id: string) => {
    await fetch(`/api/evaluation-criteria/${id}`, { method: 'DELETE' });
    fetchEvalCriteria();
  };

  // ---------- SYSTEM CONFIG ----------
  const updateSystemConfig = async (key: string, value: any) => {
    await fetch('/api/system-config', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [key]: value }) });
    setSystemConfig({ ...systemConfig, [key]: value });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* SYSTEM CONFIGURATION */}
        <div>
          <h1 className="text-2xl font-bold mb-2">System Settings</h1>
          <p className="text-muted-foreground">Configure universities, faculties, evaluation templates, and system policies</p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> System Configuration</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['maxInternDuration', 'maxApplicationsPerStudent', 'logbookReminderDays', 'autoCloseVacancyDays'].map(key => (
              <div key={key}>
                <label className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1')}</label>
                <input type="number" value={systemConfig[key]}
                  onChange={(e) => updateSystemConfig(key, e.target.value)}
                  className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            {(['requireCoverLetter','requireCV','allowMultipleAttachments','enableEmailNotifications'] as const).map(key => (
              <label key={key} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-secondary/50">
                <input type="checkbox" checked={systemConfig[key]} onChange={(e) => updateSystemConfig(key, e.target.checked)}
                  className="h-4 w-4 rounded border-muted-foreground accent-primary" />
                <span className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* UNIVERSITIES & FACULTIES */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Universities & Faculties</h3>
            <div className="flex gap-2">
              <button onClick={() => setShowAddFaculty(true)} className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-secondary flex items-center gap-1"><Plus className="h-4 w-4" /> Faculty</button>
              <button onClick={() => setShowAddUni(true)} className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 flex items-center gap-1"><Plus className="h-4 w-4" /> University</button>
            </div>
          </div>
          <div className="space-y-3">
            {universities.map(uni => {
              const uniFaculties = faculties.filter(f => f.universityId === uni.id);
              const isExpanded = expandedUni === uni.id;
              return (
                <div key={uni.id} className="rounded-lg border">
                  <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-secondary/50" onClick={() => setExpandedUni(isExpanded ? null : uni.id)}>
                    <div className="flex items-center gap-3">
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      <Building2 className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium">{uni.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">• {uni.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{uniFaculties.length} faculties</span>
                      <button onClick={(e) => { e.stopPropagation(); removeUniversity(uni.id); }} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="border-t bg-secondary/20 p-3 space-y-2">
                      {uniFaculties.length === 0 ? <p className="text-sm text-muted-foreground py-2 text-center">No faculties added yet</p> :
                        uniFaculties.map(fac => (
                          <div key={fac.id} className="flex items-center justify-between rounded-lg bg-card p-2.5 border">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-accent" />
                              <div>
                                <span className="text-sm font-medium">{fac.name}</span>
                                <p className="text-xs text-muted-foreground">{fac.departments.join(', ')}</p>
                              </div>
                            </div>
                            <button onClick={() => removeFaculty(fac.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* DEPARTMENTS & CATEGORIES */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Departments */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Departments</h3>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newDept} onChange={(e) => setNewDept(e.target.value)} placeholder="New department" className="flex-1 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" onKeyDown={(e) => e.key === 'Enter' && addDept()} />
              <button onClick={addDept} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {departments.map((d, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-2.5 table-row-hover">
                  <span className="text-sm">{d}</span>
                  <button onClick={() => deleteDept(d)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Tag className="h-5 w-5 text-accent" /> Categories</h3>
            <div className="flex gap-2 mb-4">
              <input type="text" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="New category" className="flex-1 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" onKeyDown={(e) => e.key === 'Enter' && addCat()} />
              <button onClick={addCat} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" /></button>
            </div>
            <div className="space-y-2">
              {categories.map((c, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-2.5 table-row-hover">
                  <span className="text-sm">{c}</span>
                  <button onClick={() => deleteCat(c)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* EVALUATION TEMPLATE */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-5 w-5 text-warning" /> Evaluation Template</h3>
          {totalWeight !== 100 && (
            <div className="flex items-center gap-2 rounded-lg bg-warning/10 border border-warning/20 px-3 py-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm text-warning">Total weight is {totalWeight}% — should be 100%</span>
            </div>
          )}
          <div className="space-y-3 mb-4">
            {evalCriteria.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm font-medium">{item.criterion}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.weight}%` }} />
                  </div>
                  {editingCriterion === idx ? (
                    <div className="flex items-center gap-1">
                      <input type="number" value={editWeight} onChange={(e) => setEditWeight(Number(e.target.value))}
                        className="w-14 rounded border bg-card px-2 py-0.5 text-sm text-right outline-none focus:border-primary" min={1} max={100} />
                      <button onClick={() => { updateEvalCriterion(item.id, editWeight); setEditingCriterion(null); }} className="text-success"><Check className="h-4 w-4" /></button>
                      <button onClick={() => setEditingCriterion(null)} className="text-muted-foreground"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-primary w-10 text-right">{item.weight}%</span>
                      <button onClick={() => { setEditingCriterion(idx); setEditWeight(item.weight); }} className="text-muted-foreground hover:text-primary"><Pencil className="h-3.5 w-3.5" /></button>
                      <button onClick={() => deleteEvalCriterion(item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="New criterion" value={newCriterion.criterion} onChange={(e) => setNewCriterion({ ...newCriterion, criterion: e.target.value })} className="flex-1 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
            <input type="number" placeholder="Weight" value={newCriterion.weight} onChange={(e) => setNewCriterion({ ...newCriterion, weight: Number(e.target.value) })} className="w-24 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
            <button onClick={addEvalCriterion} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* ADD UNIVERSITY MODAL */}
      {showAddUni && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="rounded-xl bg-card p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add University</h3>
            <input type="text" placeholder="Name" value={newUni.name} onChange={(e) => setNewUni({ ...newUni, name: e.target.value })} className="mb-3 w-full rounded border bg-card px-3 py-2 outline-none" />
            <input type="text" placeholder="Location" value={newUni.location} onChange={(e) => setNewUni({ ...newUni, location: e.target.value })} className="mb-3 w-full rounded border bg-card px-3 py-2 outline-none" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddUni(false)} className="rounded-lg border px-3 py-2 text-sm">Cancel</button>
              <button onClick={addUniversity} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD FACULTY MODAL */}
      {showAddFaculty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="rounded-xl bg-card p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Add Faculty</h3>
            <input type="text" placeholder="Name" value={newFaculty.name} onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })} className="mb-3 w-full rounded border bg-card px-3 py-2 outline-none" />
            <select value={newFaculty.universityId} onChange={(e) => setNewFaculty({ ...newFaculty, universityId: e.target.value })} className="mb-3 w-full rounded border bg-card px-3 py-2 outline-none">
              <option value="">Select University</option>
              {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <input type="text" placeholder="Departments (comma separated)" value={newFaculty.departments} onChange={(e) => setNewFaculty({ ...newFaculty, departments: e.target.value })} className="mb-3 w-full rounded border bg-card px-3 py-2 outline-none" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddFaculty(false)} className="rounded-lg border px-3 py-2 text-sm">Cancel</button>
              <button onClick={addFaculty} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Add</button>
            </div>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}