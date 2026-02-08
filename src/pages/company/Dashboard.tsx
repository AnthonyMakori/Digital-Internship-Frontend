import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardCard } from '@/components/DashboardCard';
import { mockVacancies, mockApplications, mockAttachments, mockLogbookEntries } from '@/utils/mockData';
import { Briefcase, FileText, Users, BookOpen } from 'lucide-react';

export default function CompanyDashboard() {
  const myVacancies = mockVacancies.filter((v) => v.companyId === 'com-1');
  const openVacancies = myVacancies.filter((v) => v.status === 'open');
  const pendingApps = mockApplications.filter((a) => a.company === 'TechCorp Ltd' && a.status === 'pending');
  const activeInterns = mockAttachments.filter((a) => a.companyId === 'com-1' && a.status === 'in_progress');
  const pendingLogs = mockLogbookEntries.filter((l) => l.status === 'pending');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Company Dashboard</h1>
          <p className="text-muted-foreground">Overview of your internship program</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Active Vacancies" value={openVacancies.length} icon={Briefcase} variant="primary" />
          <DashboardCard title="Pending Applications" value={pendingApps.length} icon={FileText} variant={pendingApps.length > 0 ? 'accent' : 'default'} />
          <DashboardCard title="Active Interns" value={activeInterns.length} icon={Users} />
          <DashboardCard title="Logbooks to Review" value={pendingLogs.length} icon={BookOpen} variant={pendingLogs.length > 0 ? 'primary' : 'default'} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Your Vacancies</h3>
            <div className="space-y-3">
              {myVacancies.map((v) => (
                <div key={v.id} className="flex items-center justify-between rounded-lg border p-3 table-row-hover">
                  <div>
                    <p className="font-medium text-sm">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.applicants} applicants • {v.location}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${v.status === 'open' ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'}`}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
            <div className="space-y-3">
              {mockApplications.filter((a) => a.company === 'TechCorp Ltd').slice(0, 4).map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg border p-3 table-row-hover">
                  <div>
                    <p className="font-medium text-sm">{a.studentName}</p>
                    <p className="text-xs text-muted-foreground">{a.vacancyTitle}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    a.status === 'pending' ? 'bg-warning/15 text-warning' :
                    a.status === 'accepted' ? 'bg-success/15 text-success' :
                    a.status === 'rejected' ? 'bg-destructive/15 text-destructive' :
                    'bg-info/15 text-info'
                  }`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
