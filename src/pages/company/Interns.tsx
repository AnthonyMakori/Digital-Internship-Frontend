import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockAttachments, mockLogbookEntries } from '@/utils/mockData';
import { User, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompanyInterns() {
  const interns = mockAttachments.filter((a) => a.companyId === 'com-1');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Intern Supervision</h1>
          <p className="text-muted-foreground">Manage and monitor your assigned interns</p>
        </div>

        {interns.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            <User className="mx-auto h-10 w-10 mb-3 opacity-40" />
            <p>No active interns</p>
          </div>
        ) : (
          <div className="space-y-4">
            {interns.map((intern) => {
              const logs = mockLogbookEntries.filter((l) => l.studentId === intern.studentId);
              const pending = logs.filter((l) => l.status === 'pending').length;
              return (
                <div key={intern.id} className="rounded-xl border bg-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {intern.studentName[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold">{intern.studentName}</h3>
                        <p className="text-sm text-muted-foreground">{intern.department}</p>
                      </div>
                    </div>
                    <StatusBadge status={intern.status} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Supervisor: {intern.supervisorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{intern.startDate} → {intern.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{logs.length} logbook entries ({pending} pending)</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link to="/company/logbooks" className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-secondary">View Logbook</Link>
                    <Link to="/company/evaluations" className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20">Evaluate</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
