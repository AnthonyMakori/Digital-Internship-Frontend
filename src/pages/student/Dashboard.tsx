import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardCard } from '@/components/DashboardCard';
import { StatusBadge } from '@/components/StatusBadge';
import { mockApplications, mockLogbookEntries, mockAttachments } from '@/utils/mockData';
import { FileText, CheckCircle, BookOpen, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  // Mock: current student is stu-1
  const myApps = mockApplications.filter((a) => a.studentId === 'stu-1');
  const accepted = myApps.filter((a) => a.status === 'accepted');
  const pendingLogs = mockLogbookEntries.filter((l) => l.studentId === 'stu-1' && l.status === 'pending');
  const attachment = mockAttachments.find((a) => a.studentId === 'stu-1');
  const hasAttachment = !!attachment;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Alice 👋</h1>
          <p className="text-muted-foreground">Here's your internship journey at a glance.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Applications" value={myApps.length} icon={FileText} description="Total submitted" />
          <DashboardCard title="Accepted" value={accepted.length} icon={CheckCircle} variant="accent" />
          <DashboardCard title="Pending Logs" value={pendingLogs.length} icon={BookOpen} variant={pendingLogs.length > 0 ? 'primary' : 'default'} />
          <DashboardCard title="Attachment" value={hasAttachment ? 'Active' : 'None'} icon={Briefcase} variant={hasAttachment ? 'accent' : 'default'} />
        </div>

        {/* Conditional sections */}
        {!hasAttachment ? (
          <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 p-8 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-primary/50" />
            <h3 className="mt-3 text-lg font-semibold">No Active Attachment</h3>
            <p className="mt-1 text-sm text-muted-foreground">Browse available internships and submit your application</p>
            <Link
              to="/student/internships"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Browse Internships <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Current Attachment</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Company</p>
                <p className="font-medium">{attachment.company}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Supervisor</p>
                <p className="font-medium">{attachment.supervisorName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Period</p>
                <p className="font-medium">{attachment.startDate} → {attachment.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <StatusBadge status={attachment.status} />
              </div>
            </div>
          </div>
        )}

        {/* Recent Applications */}
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Applications</h3>
            <Link to="/student/applications" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {myApps.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-center justify-between rounded-lg border p-3 table-row-hover">
                <div>
                  <p className="font-medium text-sm">{app.vacancyTitle}</p>
                  <p className="text-xs text-muted-foreground">{app.company}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
