import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { useAuth } from '@/context/AuthContext';
import { mockCompanyMembers, type CompanyMember } from '@/utils/organizationData';
import { Plus, X, Shield, UserCog, User, Trash2, Crown } from 'lucide-react';

export default function CompanyTeam() {
  const { user } = useAuth();
  const isCompanyAdmin = user?.companyRole === 'admin';
  
  // Get company members for this company
  const companyId = user?.companyId || user?.id;
  const [members, setMembers] = useState<CompanyMember[]>(
    mockCompanyMembers.filter(m => m.companyId === companyId)
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'staff' as 'admin' | 'supervisor' | 'staff' });
  
  const hasAdmin = members.some(m => m.role === 'admin');

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) return;
    
    // Prevent adding another admin if one exists
    if (newMember.role === 'admin' && hasAdmin) {
      alert('Your company already has an admin. Only one admin is allowed per company.');
      return;
    }
    
    const member: CompanyMember = {
      id: `cm-${Date.now()}`,
      userId: `user-${Date.now()}`,
      companyId: companyId || '',
      role: newMember.role,
      name: newMember.name.trim(),
      email: newMember.email.trim(),
    };
    
    setMembers([...members, member]);
    setNewMember({ name: '', email: '', role: 'staff' });
    setShowAddModal(false);
  };

  const handleRemoveMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (member?.role === 'admin') {
      alert('Cannot remove the company admin. Transfer admin rights first.');
      return;
    }
    setMembers(members.filter(m => m.id !== memberId));
  };

  const handleChangeRole = (memberId: string, newRole: 'admin' | 'supervisor' | 'staff') => {
    // Prevent having more than one admin
    if (newRole === 'admin' && hasAdmin) {
      const currentAdmin = members.find(m => m.role === 'admin');
      if (currentAdmin && currentAdmin.id !== memberId) {
        alert('Only one admin is allowed per company. Remove the current admin first.');
        return;
      }
    }
    
    setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  const getRoleIcon = (role: 'admin' | 'supervisor' | 'staff') => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-warning" />;
      case 'supervisor': return <UserCog className="h-4 w-4 text-primary" />;
      default: return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const columns = [
    { key: 'name', header: 'Name', render: (m: CompanyMember) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{m.name[0]}</div>
        <div>
          <span className="font-medium">{m.name}</span>
          {m.role === 'admin' && <span className="ml-2 text-xs text-warning font-medium">Admin</span>}
        </div>
      </div>
    )},
    { key: 'email', header: 'Email', render: (m: CompanyMember) => <span className="text-muted-foreground">{m.email}</span> },
    { key: 'role', header: 'Role', render: (m: CompanyMember) => (
      <div className="flex items-center gap-2">
        {getRoleIcon(m.role)}
        {isCompanyAdmin ? (
          <select 
            value={m.role} 
            onChange={(e) => handleChangeRole(m.id, e.target.value as 'admin' | 'supervisor' | 'staff')}
            className="rounded-md border bg-card px-2 py-1 text-xs font-medium outline-none focus:border-primary capitalize"
            disabled={m.role === 'admin' && m.userId === user?.id} // Can't demote yourself as admin
          >
            <option value="staff">Staff</option>
            <option value="supervisor">Supervisor</option>
            {(!hasAdmin || m.role === 'admin') && <option value="admin">Admin</option>}
          </select>
        ) : (
          <span className="capitalize text-sm">{m.role}</span>
        )}
      </div>
    )},
    ...(isCompanyAdmin ? [{ 
      key: 'actions', 
      header: 'Actions', 
      render: (m: CompanyMember) => (
        m.role !== 'admin' ? (
          <button 
            onClick={() => handleRemoveMember(m.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null
      )
    }] : []),
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">
              Manage your company team members and their roles
            </p>
          </div>
          {isCompanyAdmin && (
            <button 
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Add Team Member
            </button>
          )}
        </div>

        {/* Admin Role Info */}
        <div className="rounded-xl border bg-warning/10 p-4 flex items-start gap-3">
          <Shield className="h-5 w-5 text-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium">Company Admin Policy</p>
            <p className="text-sm text-muted-foreground mt-1">
              Each company can have only ONE admin with full control over vacancies, applications, team management, and settings.
              {!isCompanyAdmin && ' Contact your company admin to make changes.'}
            </p>
          </div>
        </div>

        <DataTable data={members} columns={columns} searchable searchKeys={['name', 'email']} />

        {/* Add Member Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
            <div className="mx-4 w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add Team Member</h2>
                <button onClick={() => setShowAddModal(false)} className="rounded-md p-1.5 hover:bg-secondary">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter full name"
                    className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="Enter email address"
                    className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Role</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value as 'admin' | 'supervisor' | 'staff' })}
                    className="mt-1 w-full rounded-lg border bg-card px-3 py-2 text-sm outline-none focus:border-primary"
                  >
                    <option value="staff">Staff</option>
                    <option value="supervisor">Supervisor</option>
                    {!hasAdmin && <option value="admin">Admin</option>}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {hasAdmin ? 'Admin role unavailable - company already has an admin' : 'Admins have full company control'}
                  </p>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    disabled={!newMember.name.trim() || !newMember.email.trim()}
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
