import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { StatusBadge } from '@/components/StatusBadge';
import { mockAttachments } from '@/utils/mockData';
import { Building2, User, Calendar, MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentAttachment() {
  const attachment = mockAttachments.find((a) => a.studentId === 'stu-1');

  if (!attachment) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Briefcase className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">No Active Attachment</h2>
          <p className="mt-2 text-muted-foreground max-w-md">
            You need an accepted application before you can access the attachment workspace.
          </p>
          <Link
            to="/student/internships"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Browse Internships
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const startDate = new Date(attachment.startDate);
  const endDate = new Date(attachment.endDate);
  const now = new Date();
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const elapsed = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const progress = Math.min(100, Math.max(0, Math.round((elapsed / totalDays) * 100)));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Attachment Workspace</h1>
          <p className="text-muted-foreground">Your current internship placement details</p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Placement Details</h3>
            <StatusBadge status={attachment.status} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2"><Building2 className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Company</p>
                <p className="font-semibold">{attachment.company}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-accent/10 p-2"><User className="h-5 w-5 text-accent" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Supervisor</p>
                <p className="font-semibold">{attachment.supervisorName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-info/10 p-2"><Calendar className="h-5 w-5 text-info" /></div>
              <div>
                <p className="text-xs text-muted-foreground">Start Date</p>
                <p className="font-semibold">{attachment.startDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-warning/10 p-2"><Calendar className="h-5 w-5 text-warning" /></div>
              <div>
                <p className="text-xs text-muted-foreground">End Date</p>
                <p className="font-semibold">{attachment.endDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Day {Math.max(0, elapsed)} of {totalDays}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link to="/student/logbook" className="stat-card flex items-center gap-4 hover:border-primary/30">
            <div className="rounded-lg bg-primary/10 p-3"><Briefcase className="h-6 w-6 text-primary" /></div>
            <div>
              <h4 className="font-semibold">Daily Logbook</h4>
              <p className="text-sm text-muted-foreground">Record your daily activities and learnings</p>
            </div>
          </Link>
          <Link to="/student/final-report" className="stat-card flex items-center gap-4 hover:border-accent/30">
            <div className="rounded-lg bg-accent/10 p-3"><MapPin className="h-6 w-6 text-accent" /></div>
            <div>
              <h4 className="font-semibold">Final Report</h4>
              <p className="text-sm text-muted-foreground">Submit your attachment completion report</p>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
