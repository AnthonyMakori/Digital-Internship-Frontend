import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { mockUsers } from '@/utils/mockData';
import type { User } from '@/utils/mockData';
import { UserRole, ROLES } from '@/utils/constants';
import { ToggleLeft, ToggleRight, Shield } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const toggleStatus = (id: string) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const changeRole = (id: string, role: UserRole) => {
    setUsers(users.map((u) => u.id === id ? { ...u, role } : u));
  };

  const columns = [
    { key: 'name', header: 'Name', render: (u: User) => (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{u.name[0]}</div>
        <span className="font-medium">{u.name}</span>
      </div>
    )},
    { key: 'email', header: 'Email', render: (u: User) => <span className="text-muted-foreground">{u.email}</span> },
    { key: 'role', header: 'Role', render: (u: User) => (
      <select value={u.role} onChange={(e) => changeRole(u.id, e.target.value as UserRole)}
        className="rounded-md border bg-card px-2 py-1 text-xs font-medium outline-none focus:border-primary capitalize">
        {Object.values(ROLES).map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
    )},
    { key: 'status', header: 'Status', render: (u: User) => (
      <button onClick={() => toggleStatus(u.id)} className="flex items-center gap-1.5">
        {u.status === 'active' ? <ToggleRight className="h-5 w-5 text-success" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
        <StatusBadge status={u.status} />
      </button>
    )},
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage system users, roles, and access</p>
        </div>

        <DataTable data={users} columns={columns} searchable searchKeys={['name', 'email']} />
      </div>
    </DashboardLayout>
  );
}
