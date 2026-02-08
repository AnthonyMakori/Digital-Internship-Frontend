import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockLogbookEntries, mockAttachments } from '@/utils/mockData';
import { Plus, BookOpen, Calendar, X, MessageSquare } from 'lucide-react';

export default function StudentLogbook() {
  const attachment = mockAttachments.find((a) => a.studentId === 'stu-1');
  const [entries, setEntries] = useState(mockLogbookEntries.filter((l) => l.studentId === 'stu-1'));
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<typeof entries[0] | null>(null);
  const [form, setForm] = useState({ date: '', activities: '', skillsLearned: '', challenges: '' });

  if (!attachment) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold">Logbook Unavailable</h2>
          <p className="text-muted-foreground">You need an active attachment to access the logbook.</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: `log-${Date.now()}`,
      studentId: 'stu-1',
      studentName: 'Alice Mwangi',
      ...form,
      status: 'pending' as const,
    };
    setEntries([newEntry, ...entries]);
    setForm({ date: '', activities: '', skillsLearned: '', challenges: '' });
    setShowForm(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Daily Logbook</h1>
            <p className="text-muted-foreground">Document your daily internship activities</p>
          </div>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> New Entry
          </button>
        </div>

        {/* Status summary */}
        <div className="grid grid-cols-3 gap-3">
          {(['pending', 'approved', 'rejected'] as const).map((s) => (
            <div key={s} className="stat-card text-center">
              <p className="text-2xl font-bold">{entries.filter((e) => e.status === s).length}</p>
              <StatusBadge status={s} className="mt-1" />
            </div>
          ))}
        </div>

        {/* Entries list */}
        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="stat-card cursor-pointer" onClick={() => setSelected(entry)}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">{entry.date}</span>
                </div>
                <StatusBadge status={entry.status} />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{entry.activities}</p>
              {entry.supervisorComment && (
                <div className="mt-2 flex items-start gap-2 rounded-md bg-muted p-2">
                  <MessageSquare className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground">{entry.supervisorComment}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* New Entry Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-slide-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">New Logbook Entry</h3>
                <button onClick={() => setShowForm(false)} className="rounded-md p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Date</label>
                  <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Activities Performed</label>
                  <textarea rows={3} required value={form.activities} onChange={(e) => setForm({ ...form, activities: e.target.value })}
                    placeholder="Describe your activities today..." className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Skills Learned</label>
                  <textarea rows={2} required value={form.skillsLearned} onChange={(e) => setForm({ ...form, skillsLearned: e.target.value })}
                    placeholder="What skills did you learn?" className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Challenges</label>
                  <textarea rows={2} value={form.challenges} onChange={(e) => setForm({ ...form, challenges: e.target.value })}
                    placeholder="Any challenges encountered?" className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-secondary">Cancel</button>
                  <button type="submit" className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">Submit Entry</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold">{selected.date}</h3>
                  <StatusBadge status={selected.status} />
                </div>
                <button onClick={() => setSelected(null)} className="rounded-md p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div><h4 className="text-sm font-semibold mb-1">Activities</h4><p className="text-sm text-muted-foreground">{selected.activities}</p></div>
                <div><h4 className="text-sm font-semibold mb-1">Skills Learned</h4><p className="text-sm text-muted-foreground">{selected.skillsLearned}</p></div>
                {selected.challenges && <div><h4 className="text-sm font-semibold mb-1">Challenges</h4><p className="text-sm text-muted-foreground">{selected.challenges}</p></div>}
                {selected.supervisorComment && (
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-1"><MessageSquare className="h-4 w-4" /> Supervisor Comment</h4>
                    <p className="text-sm text-muted-foreground">{selected.supervisorComment}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
