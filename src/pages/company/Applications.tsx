import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { mockApplications } from '@/utils/mockData';
import { X, Download, CheckCircle, XCircle, User } from 'lucide-react';

export default function CompanyApplications() {
  const [apps, setApps] = useState(mockApplications.filter((a) => a.company === 'TechCorp Ltd'));
  const [selected, setSelected] = useState<typeof apps[0] | null>(null);
  const [supervisorName, setSupervisorName] = useState('');

  const updateStatus = (id: string, status: 'accepted' | 'rejected') => {
    setApps(apps.map((a) => a.id === id ? { ...a, status, supervisorName: status === 'accepted' ? supervisorName || 'John Doe' : undefined } : a));
    setSelected(null);
    setSupervisorName('');
  };

  const columns = [
    { key: 'studentName', header: 'Applicant', render: (a: typeof apps[0]) => (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{a.studentName[0]}</div>
        <div><p className="font-medium text-sm">{a.studentName}</p><p className="text-xs text-muted-foreground">{a.studentEmail}</p></div>
      </div>
    )},
    { key: 'vacancyTitle', header: 'Position' },
    { key: 'appliedAt', header: 'Applied', render: (a: typeof apps[0]) => <span className="text-muted-foreground">{a.appliedAt}</span> },
    { key: 'status', header: 'Status', render: (a: typeof apps[0]) => <StatusBadge status={a.status} /> },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Application Review</h1>
          <p className="text-muted-foreground">Review and manage intern applications</p>
        </div>

        <DataTable data={apps} columns={columns} searchable searchKeys={['studentName', 'vacancyTitle']} onRowClick={setSelected} />

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">{selected.studentName[0]}</div>
                  <div>
                    <h2 className="text-xl font-bold">{selected.studentName}</h2>
                    <p className="text-sm text-muted-foreground">{selected.studentEmail}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-md p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <StatusBadge status={selected.status} />
                  <span className="text-sm text-muted-foreground">For: {selected.vacancyTitle}</span>
                </div>

                {selected.coverLetter && (
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-semibold mb-1">Cover Letter</h4>
                    <p className="text-sm text-muted-foreground">{selected.coverLetter}</p>
                  </div>
                )}

                {selected.cvUrl && (
                  <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary w-full justify-center">
                    <Download className="h-4 w-4" /> Download CV
                  </button>
                )}

                {(selected.status === 'pending' || selected.status === 'reviewed') && (
                  <div className="space-y-3 pt-2 border-t">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Assign Supervisor (on accept)</label>
                      <input type="text" value={supervisorName} onChange={(e) => setSupervisorName(e.target.value)}
                        placeholder="Supervisor name" className="w-full rounded-lg border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary" />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => updateStatus(selected.id, 'rejected')} className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-destructive/20 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5">
                        <XCircle className="h-4 w-4" /> Reject
                      </button>
                      <button onClick={() => updateStatus(selected.id, 'accepted')} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-success px-4 py-2.5 text-sm font-semibold text-success-foreground hover:opacity-90">
                        <CheckCircle className="h-4 w-4" /> Accept
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
