import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardCard } from '@/components/DashboardCard';
import { mockVacancies, mockApplications, mockAttachments, mockLogbookEntries } from '@/utils/mockData';
import { Briefcase, FileText, Users, BookOpen } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const myVacancies = mockVacancies.filter((v) => v.companyId === 'com-1');
const companyDepts = [...new Set(myVacancies.map((v) => v.department))];

const deptChartData = companyDepts.map((dept) => ({
  department: dept.length > 14 ? dept.slice(0, 14) + '…' : dept,
  fullName: dept,
  interns: mockAttachments.filter((a) => a.companyId === 'com-1' && a.department === dept).length + Math.floor(Math.random() * 5 + 1),
  applications: mockApplications.filter((a) => {
    const v = mockVacancies.find((v) => v.id === a.vacancyId);
    return v?.companyId === 'com-1' && v?.department === dept;
  }).length + Math.floor(Math.random() * 8 + 1),
}));

const chartConfig = {
  interns: { label: 'Interns & Attachees', color: 'hsl(270 60% 55%)' },
  applications: { label: 'Applications', color: 'hsl(45 95% 55%)' },
};

export default function CompanyDashboard() {
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

        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-1">Department Overview</h3>
          <p className="text-xs text-muted-foreground mb-4">Intern intake vs application rate per department</p>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={deptChartData} margin={{ top: 5, right: 10, left: -10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="department" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent labelKey="fullName" />} />
              <Bar dataKey="interns" fill="hsl(270 60% 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="applications" fill="hsl(45 95% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
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
