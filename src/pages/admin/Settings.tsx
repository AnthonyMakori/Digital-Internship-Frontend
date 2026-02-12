import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DEPARTMENTS } from '@/utils/constants';
import { mockUniversities, mockFaculties, type University, type Faculty } from '@/utils/organizationData';
import { Plus, Trash2, Settings, Tag, BookOpen, Building2, GraduationCap, ChevronDown, ChevronRight, Pencil, Check, X, AlertTriangle } from 'lucide-react';

export default function AdminSettings() {
  const [departments, setDepartments] = useState<string[]>([...DEPARTMENTS]);
  const [categories, setCategories] = useState(['Full-time', 'Part-time', 'Remote', 'Hybrid']);
  const [universities, setUniversities] = useState<University[]>([...mockUniversities]);
  const [faculties, setFaculties] = useState<Faculty[]>([...mockFaculties]);
  const [expandedUni, setExpandedUni] = useState<string | null>(null);
  
  const [newDept, setNewDept] = useState('');
  const [newCat, setNewCat] = useState('');
  const [newUni, setNewUni] = useState({ name: '', location: '' });
  const [newFaculty, setNewFaculty] = useState({ name: '', universityId: '', departments: '' });
  const [showAddUni, setShowAddUni] = useState(false);
  const [showAddFaculty, setShowAddFaculty] = useState(false);

  // Evaluation template state
  const [evalCriteria, setEvalCriteria] = useState([
    { criterion: 'Technical Skills', weight: 30 },
    { criterion: 'Communication', weight: 20 },
    { criterion: 'Teamwork', weight: 20 },
    { criterion: 'Problem Solving', weight: 15 },
    { criterion: 'Punctuality & Attendance', weight: 15 },
  ]);
  const [newCriterion, setNewCriterion] = useState({ criterion: '', weight: 10 });
  const [editingCriterion, setEditingCriterion] = useState<number | null>(null);
  const [editWeight, setEditWeight] = useState(0);

  // System config
  const [systemConfig, setSystemConfig] = useState({
    maxInternDuration: '6',
    maxApplicationsPerStudent: '5',
    logbookReminderDays: '3',
    autoCloseVacancyDays: '30',
    requireCoverLetter: true,
    requireCV: true,
    allowMultipleAttachments: false,
    enableEmailNotifications: true,
  });

  const addDept = () => { if (newDept.trim()) { setDepartments([...departments, newDept.trim()]); setNewDept(''); } };
  const addCat = () => { if (newCat.trim()) { setCategories([...categories, newCat.trim()]); setNewCat(''); } };
  
  const addUniversity = () => {
    if (newUni.name.trim() && newUni.location.trim()) {
      const uni: University = { id: `uni-${Date.now()}`, name: newUni.name.trim(), location: newUni.location.trim() };
      setUniversities([...universities, uni]);
      setNewUni({ name: '', location: '' });
      setShowAddUni(false);
    }
  };
  
  const addFaculty = () => {
    if (newFaculty.name.trim() && newFaculty.universityId) {
      const faculty: Faculty = {
        id: `fac-${Date.now()}`,
        name: newFaculty.name.trim(),
        universityId: newFaculty.universityId,
        departments: newFaculty.departments.split(',').map(d => d.trim()).filter(d => d),
      };
      setFaculties([...faculties, faculty]);
      setNewFaculty({ name: '', universityId: '', departments: '' });
      setShowAddFaculty(false);
    }
  };

  const removeUniversity = (id: string) => {
    setUniversities(universities.filter(u => u.id !== id));
    setFaculties(faculties.filter(f => f.universityId !== id));
  };

  const removeFaculty = (id: string) => setFaculties(faculties.filter(f => f.id !== id));

  const addEvalCriterion = () => {
    if (newCriterion.criterion.trim() && newCriterion.weight > 0) {
      setEvalCriteria([...evalCriteria, { ...newCriterion, criterion: newCriterion.criterion.trim() }]);
      setNewCriterion({ criterion: '', weight: 10 });
    }
  };

  const totalWeight = evalCriteria.reduce((sum, c) => sum + c.weight, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">Configure universities, faculties, evaluation templates, and system policies</p>
        </div>

        {/* System Configuration */}
        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" /> System Configuration
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="text-sm font-medium">Max Intern Duration (months)</label>
              <input type="number" value={systemConfig.maxInternDuration}
                onChange={(e) => setSystemConfig({ ...systemConfig, maxInternDuration: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium">Max Applications per Student</label>
              <input type="number" value={systemConfig.maxApplicationsPerStudent}
                onChange={(e) => setSystemConfig({ ...systemConfig, maxApplicationsPerStudent: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium">Logbook Reminder (days)</label>
              <input type="number" value={systemConfig.logbookReminderDays}
                onChange={(e) => setSystemConfig({ ...systemConfig, logbookReminderDays: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="text-sm font-medium">Auto-close Vacancies (days)</label>
              <input type="number" value={systemConfig.autoCloseVacancyDays}
                onChange={(e) => setSystemConfig({ ...systemConfig, autoCloseVacancyDays: e.target.value })}
                className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
            {([
              { key: 'requireCoverLetter', label: 'Require Cover Letter' },
              { key: 'requireCV', label: 'Require CV Upload' },
              { key: 'allowMultipleAttachments', label: 'Allow Multiple Attachments' },
              { key: 'enableEmailNotifications', label: 'Email Notifications' },
            ] as const).map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-secondary/50">
                <input
                  type="checkbox"
                  checked={systemConfig[key]}
                  onChange={(e) => setSystemConfig({ ...systemConfig, [key]: e.target.checked })}
                  className="h-4 w-4 rounded border-muted-foreground accent-primary"
                />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Universities & Faculties Section */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" /> Universities & Faculties
            </h3>
            <div className="flex gap-2">
              <button onClick={() => setShowAddFaculty(true)} className="rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-secondary flex items-center gap-1">
                <Plus className="h-4 w-4" /> Faculty
              </button>
              <button onClick={() => setShowAddUni(true)} className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90 flex items-center gap-1">
                <Plus className="h-4 w-4" /> University
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {universities.map((uni) => {
              const uniFaculties = faculties.filter(f => f.universityId === uni.id);
              const isExpanded = expandedUni === uni.id;
              
              return (
                <div key={uni.id} className="rounded-lg border">
                  <div 
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-secondary/50"
                    onClick={() => setExpandedUni(isExpanded ? null : uni.id)}
                  >
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
                      <button onClick={(e) => { e.stopPropagation(); removeUniversity(uni.id); }} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="border-t bg-secondary/20 p-3 space-y-2">
                      {uniFaculties.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-2 text-center">No faculties added yet</p>
                      ) : (
                        uniFaculties.map(fac => (
                          <div key={fac.id} className="flex items-center justify-between rounded-lg bg-card p-2.5 border">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4 text-accent" />
                              <div>
                                <span className="text-sm font-medium">{fac.name}</span>
                                <p className="text-xs text-muted-foreground">{fac.departments.join(', ')}</p>
                              </div>
                            </div>
                            <button onClick={() => removeFaculty(fac.id)} className="text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
            <div className="space-y-2 max-h-48 overflow-y-auto">
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

        {/* Evaluation Template - Now editable */}
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
                      <button onClick={() => { setEvalCriteria(evalCriteria.map((c, i) => i === idx ? { ...c, weight: editWeight } : c)); setEditingCriterion(null); }}
                        className="text-success"><Check className="h-4 w-4" /></button>
                      <button onClick={() => setEditingCriterion(null)} className="text-muted-foreground"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-primary w-10 text-right">{item.weight}%</span>
                      <button onClick={() => { setEditingCriterion(idx); setEditWeight(item.weight); }} className="text-muted-foreground hover:text-primary">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => setEvalCriteria(evalCriteria.filter((_, i) => i !== idx))} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" value={newCriterion.criterion} onChange={(e) => setNewCriterion({ ...newCriterion, criterion: e.target.value })}
              placeholder="New criterion" className="flex-1 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
              onKeyDown={(e) => e.key === 'Enter' && addEvalCriterion()} />
            <input type="number" value={newCriterion.weight} onChange={(e) => setNewCriterion({ ...newCriterion, weight: Number(e.target.value) })}
              className="w-20 rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary text-right" min={1} max={100} placeholder="%" />
            <button onClick={addEvalCriterion} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Add University Modal */}
      {showAddUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowAddUni(false)}>
          <div className="mx-4 w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Add University</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">University Name</label>
                <input type="text" value={newUni.name} onChange={(e) => setNewUni({ ...newUni, name: e.target.value })}
                  placeholder="e.g., University of Nairobi" className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <input type="text" value={newUni.location} onChange={(e) => setNewUni({ ...newUni, location: e.target.value })}
                  placeholder="e.g., Nairobi" className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddUni(false)} className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
                <button onClick={addUniversity} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Add University</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Faculty Modal */}
      {showAddFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowAddFaculty(false)}>
          <div className="mx-4 w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Add Faculty</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">University</label>
                <select value={newFaculty.universityId} onChange={(e) => setNewFaculty({ ...newFaculty, universityId: e.target.value })}
                  className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary">
                  <option value="">Select University</option>
                  {universities.map(uni => <option key={uni.id} value={uni.id}>{uni.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Faculty/School Name</label>
                <input type="text" value={newFaculty.name} onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  placeholder="e.g., School of Computing & Informatics" className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-sm font-medium">Departments (comma-separated)</label>
                <input type="text" value={newFaculty.departments} onChange={(e) => setNewFaculty({ ...newFaculty, departments: e.target.value })}
                  placeholder="e.g., Computer Science, IT, Software Engineering" className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowAddFaculty(false)} className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary">Cancel</button>
                <button onClick={addFaculty} className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Add Faculty</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
