import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardCard } from '@/components/DashboardCard';
import { mockAttachments, mockLogbookEntries, mockUsers } from '@/utils/mockData';
import { GraduationCap, Building2, BookOpen, CheckCircle } from 'lucide-react';

export default function LecturerDashboard() {
  const students = mockUsers.filter((u) => u.role === 'student');
  const placed = mockAttachments.length;
  const notPlaced = students.length - placed;
  const totalLogs = mockLogbookEntries.length;
  const approvedLogs = mockLogbookEntries.filter((l) => l.status === 'approved').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Lecturer Dashboard</h1>
          <p className="text-muted-foreground">Monitor student internship progress</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Total Students" value={students.length} icon={GraduationCap} />
          <DashboardCard title="Placed" value={placed} icon={Building2} variant="accent" />
          <DashboardCard title="Not Placed" value={notPlaced} icon={GraduationCap} variant={notPlaced > 0 ? 'primary' : 'default'} />
          <DashboardCard title="Logbook Progress" value={`${approvedLogs}/${totalLogs}`} icon={BookOpen} description="approved entries" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Placement Overview</h3>
            <div className="space-y-3">
              {students.map((stu) => {
                const att = mockAttachments.find((a) => a.studentId === stu.id);
                return (
                  <div key={stu.id} className="flex items-center justify-between rounded-lg border p-3 table-row-hover">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{stu.name[0]}</div>
                      <div><p className="font-medium text-sm">{stu.name}</p><p className="text-xs text-muted-foreground">{stu.department}</p></div>
                    </div>
                    {att ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-success"><CheckCircle className="h-3 w-3" /> Placed</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not placed</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Logbook Activity</h3>
            <div className="space-y-3">
              {mockLogbookEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between rounded-lg border p-3 table-row-hover">
                  <div>
                    <p className="font-medium text-sm">{entry.studentName}</p>
                    <p className="text-xs text-muted-foreground">{entry.date}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                    entry.status === 'approved' ? 'bg-success/15 text-success' :
                    entry.status === 'rejected' ? 'bg-destructive/15 text-destructive' :
                    'bg-warning/15 text-warning'
                  }`}>{entry.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
