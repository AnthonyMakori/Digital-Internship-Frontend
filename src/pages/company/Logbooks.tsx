import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockLogbookEntries } from '@/utils/mockData';
import { CheckCircle, XCircle, X, MessageSquare } from 'lucide-react';

export default function CompanyLogbooks() {
  const [entries, setEntries] = useState(mockLogbookEntries);
  const [selected, setSelected] = useState<typeof entries[0] | null>(null);
  const [comment, setComment] = useState('');

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    setEntries(entries.map((e) => e.id === id ? { ...e, status, supervisorComment: comment || e.supervisorComment } : e));
    setSelected(null);
    setComment('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Logbook Review</h1>
          <p className="text-muted-foreground">Review and approve intern logbook entries</p>
        </div>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="stat-card cursor-pointer" onClick={() => { setSelected(entry); setComment(entry.supervisorComment || ''); }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{entry.studentName[0]}</div>
                  <span className="text-sm font-semibold">{entry.studentName}</span>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
                <StatusBadge status={entry.status} />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{entry.activities}</p>
            </div>
          ))}
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-slide-up max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{selected.studentName} — {selected.date}</h3>
                  <StatusBadge status={selected.status} className="mt-1" />
                </div>
                <button onClick={() => setSelected(null)} className="rounded-md p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div><h4 className="text-sm font-semibold mb-1">Activities</h4><p className="text-sm text-muted-foreground">{selected.activities}</p></div>
                <div><h4 className="text-sm font-semibold mb-1">Skills Learned</h4><p className="text-sm text-muted-foreground">{selected.skillsLearned}</p></div>
                {selected.challenges && <div><h4 className="text-sm font-semibold mb-1">Challenges</h4><p className="text-sm text-muted-foreground">{selected.challenges}</p></div>}

                {selected.status === 'pending' && (
                  <div className="space-y-3 pt-2 border-t">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Comment</label>
                      <textarea rows={2} value={comment} onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment..." className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleAction(selected.id, 'rejected')} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-destructive/20 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5">
                        <XCircle className="h-4 w-4" /> Reject
                      </button>
                      <button onClick={() => handleAction(selected.id, 'approved')} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:opacity-90">
                        <CheckCircle className="h-4 w-4" /> Approve
                      </button>
                    </div>
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
