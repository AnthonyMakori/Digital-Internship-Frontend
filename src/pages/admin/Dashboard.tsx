import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DashboardCard } from '@/components/DashboardCard';
import { mockUsers, mockVacancies, mockApplications, mockAttachments } from '@/utils/mockData';
import { DEPARTMENTS } from '@/utils/constants';
import { Users, Briefcase, FileText, Shield } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const departmentChartData = DEPARTMENTS.map((dept) => ({
  department: dept.length > 12 ? dept.slice(0, 12) + '…' : dept,
  fullName: dept,
  interns: mockAttachments.filter((a) => a.department === dept).length + Math.floor(Math.random() * 8 + 1),
  applications: mockApplications.filter((a) => {
    const vacancy = mockVacancies.find((v) => v.id === a.vacancyId);
    return vacancy?.department === dept;
  }).length + Math.floor(Math.random() * 12 + 2),
}));

const chartConfig = {
  interns: { label: 'Interns & Attachees', color: 'hsl(270 60% 55%)' },
  applications: { label: 'Applications', color: 'hsl(45 95% 55%)' },
};

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and analytics</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Total Users" value={mockUsers.length} icon={Users} variant="primary" />
          <DashboardCard title="Vacancies" value={mockVacancies.length} icon={Briefcase} />
          <DashboardCard title="Applications" value={mockApplications.length} icon={FileText} variant="accent" />
          <DashboardCard title="Active Roles" value={4} icon={Shield} />
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-1">Department Overview</h3>
          <p className="text-xs text-muted-foreground mb-4">Intern intake vs application rate per department</p>
          <ChartContainer config={chartConfig} className="h-[340px] w-full">
            <BarChart data={departmentChartData} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="department" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent labelKey="fullName" />} />
              <Bar dataKey="interns" fill="hsl(270 60% 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="applications" fill="hsl(45 95% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Users by Role</h3>
            <div className="space-y-3">
              {(['student', 'company', 'lecturer', 'admin'] as const).map((role) => {
                const count = mockUsers.filter((u) => u.role === role).length;
                const total = mockUsers.length;
                return (
                  <div key={role} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize font-medium">{role}</span>
                      <span className="text-muted-foreground">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(count / total) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Application Status Breakdown</h3>
            <div className="space-y-3">
              {(['pending', 'reviewed', 'accepted', 'rejected'] as const).map((status) => {
                const count = mockApplications.filter((a) => a.status === status).length;
                return (
                  <div key={status} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="capitalize text-sm font-medium">{status}</span>
                    <span className="text-lg font-bold">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
