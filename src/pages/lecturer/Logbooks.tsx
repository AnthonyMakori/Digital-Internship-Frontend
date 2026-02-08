import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockLogbookEntries } from '@/utils/mockData';
import { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';

export default function LecturerLogbooks() {
  const [selected, setSelected] = useState<typeof mockLogbookEntries[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Logbook Oversight</h1>
          <p className="text-muted-foreground">Read-only view of student logbook entries and supervisor approvals</p>
        </div>

        <div className="space-y-3">
          {mockLogbookEntries.map((entry) => (
            <div key={entry.id} className="stat-card cursor-pointer" onClick={() => setSelected(entry)}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{entry.studentName[0]}</div>
                  <span className="text-sm font-semibold">{entry.studentName}</span>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
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

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
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
                {selected.supervisorComment && (
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-semibold mb-1">Supervisor Comment</h4>
                    <p className="text-sm text-muted-foreground">{selected.supervisorComment}</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground italic">This is a read-only view. Only supervisors can approve or reject entries.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
