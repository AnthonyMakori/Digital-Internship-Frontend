import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { mockApplications } from '@/utils/mockData';
import { useState } from 'react';
import { X, FileText, MessageSquare } from 'lucide-react';

export default function StudentApplications() {
  const myApps = mockApplications.filter((a) => a.studentId === 'stu-1');
  const [selected, setSelected] = useState<typeof myApps[0] | null>(null);

  const columns = [
    { key: 'vacancyTitle', header: 'Position', render: (a: typeof myApps[0]) => <span className="font-medium">{a.vacancyTitle}</span> },
    { key: 'company', header: 'Company' },
    { key: 'appliedAt', header: 'Applied', render: (a: typeof myApps[0]) => <span className="text-muted-foreground">{a.appliedAt}</span> },
    { key: 'status', header: 'Status', render: (a: typeof myApps[0]) => <StatusBadge status={a.status} /> },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Application Tracker</h1>
          <p className="text-muted-foreground">Track the status of your internship applications</p>
        </div>

        {/* Timeline / Status overview */}
        <div className="grid grid-cols-4 gap-3">
          {['pending', 'reviewed', 'accepted', 'rejected'].map((status) => {
            const count = myApps.filter((a) => a.status === status).length;
            return (
              <div key={status} className="stat-card text-center">
                <p className="text-2xl font-bold">{count}</p>
                <StatusBadge status={status} className="mt-1" />
              </div>
            );
          })}
        </div>

        <DataTable
          data={myApps}
          columns={columns}
          searchable
          searchKeys={['vacancyTitle', 'company']}
          onRowClick={(app) => setSelected(app)}
        />

        {/* Detail Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{selected.vacancyTitle}</h2>
                  <p className="text-muted-foreground">{selected.company}</p>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-md p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <StatusBadge status={selected.status} />
                  <span className="text-sm text-muted-foreground">Applied on {selected.appliedAt}</span>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2"><FileText className="h-4 w-4" /> Application Timeline</h4>
                  <div className="relative ml-2 border-l-2 border-border pl-6 space-y-4">
                    <div className="relative">
                      <div className="absolute -left-[31px] h-3 w-3 rounded-full bg-success border-2 border-card" />
                      <p className="text-sm font-medium">Application Submitted</p>
                      <p className="text-xs text-muted-foreground">{selected.appliedAt}</p>
                    </div>
                    {selected.status !== 'pending' && (
                      <div className="relative">
                        <div className={`absolute -left-[31px] h-3 w-3 rounded-full border-2 border-card ${selected.status === 'rejected' ? 'bg-destructive' : 'bg-info'}`} />
                        <p className="text-sm font-medium">{selected.status === 'rejected' ? 'Rejected' : 'Under Review'}</p>
                      </div>
                    )}
                    {selected.status === 'accepted' && (
                      <div className="relative">
                        <div className="absolute -left-[31px] h-3 w-3 rounded-full bg-success border-2 border-card" />
                        <p className="text-sm font-medium">Accepted</p>
                        {selected.supervisorName && <p className="text-xs text-muted-foreground">Supervisor: {selected.supervisorName}</p>}
                      </div>
                    )}
                  </div>
                </div>

                {selected.feedback && (
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="text-sm font-semibold flex items-center gap-2 mb-2"><MessageSquare className="h-4 w-4" /> Company Feedback</h4>
                    <p className="text-sm text-muted-foreground">{selected.feedback}</p>
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
