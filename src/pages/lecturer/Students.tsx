import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { mockUsers, mockAttachments, mockApplications } from '@/utils/mockData';
import { mockUniversities, mockFaculties, getUniversityById, getFacultyById } from '@/utils/organizationData';
import { useAuth } from '@/context/AuthContext';
import { X, Building2, GraduationCap, Info } from 'lucide-react';

export default function LecturerStudents() {
  const { user } = useAuth();
  
  // Get lecturer's university and faculty
  const lecturerUniversity = user?.universityId ? getUniversityById(user.universityId) : null;
  const lecturerFaculty = user?.facultyId ? getFacultyById(user.facultyId) : null;
  
  // Filter students by lecturer's faculty - lecturers can only see students in their faculty
  const allStudents = mockUsers.filter((u) => u.role === 'student');
  const facultyStudents = allStudents.filter((s) => s.facultyId === user?.facultyId);
  
  const [selected, setSelected] = useState<typeof allStudents[0] | null>(null);

  const columns = [
    { key: 'name', header: 'Student', render: (s: typeof allStudents[0]) => (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{s.name[0]}</div>
        <span className="font-medium">{s.name}</span>
      </div>
    )},
    { key: 'email', header: 'Email', render: (s: typeof allStudents[0]) => <span className="text-muted-foreground">{s.email}</span> },
    { key: 'department', header: 'Department' },
    { key: 'status', header: 'Placement', render: (s: typeof allStudents[0]) => {
      const att = mockAttachments.find((a) => a.studentId === s.id);
      return att ? <StatusBadge status={att.status} /> : <span className="text-xs text-muted-foreground">Not placed</span>;
    }},
  ];

  const selectedAtt = selected ? mockAttachments.find((a) => a.studentId === selected.id) : null;
  const selectedApps = selected ? mockApplications.filter((a) => a.studentId === selected.id) : [];
  const selectedUniversity = selected?.universityId ? getUniversityById(selected.universityId) : null;
  const selectedFaculty = selected?.facultyId ? getFacultyById(selected.facultyId) : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Student Monitoring</h1>
          <p className="text-muted-foreground">View student details and placement status</p>
        </div>

        {/* Faculty Info Banner */}
        <div className="rounded-xl border bg-primary/5 p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">Viewing students from your faculty</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4" /> {lecturerUniversity?.name || 'Not assigned'}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4" /> {lecturerFaculty?.name || 'Not assigned'}
              </span>
            </div>
          </div>
        </div>

        {facultyStudents.length === 0 ? (
          <div className="rounded-xl border bg-card p-8 text-center">
            <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Students in Your Faculty</h3>
            <p className="text-muted-foreground">There are no students assigned to your faculty yet.</p>
          </div>
        ) : (
          <DataTable data={facultyStudents} columns={columns} searchable searchKeys={['name', 'department']} onRowClick={setSelected} />
        )}

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="mx-4 w-full max-w-lg rounded-2xl border bg-card p-6 shadow-xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">{selected.name[0]}</div>
                  <div>
                    <h2 className="text-xl font-bold">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground">{selected.email}</p>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-md p-1.5 hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-muted-foreground">Department</p><p className="font-medium">{selected.department}</p></div>
                  <div><p className="text-xs text-muted-foreground">Status</p><p className="font-medium capitalize">{selected.status}</p></div>
                </div>
                
                {/* University & Faculty Info */}
                <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                  <h4 className="text-sm font-semibold">Academic Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">University:</span> {selectedUniversity?.name || 'N/A'}</div>
                    <div><span className="text-muted-foreground">Faculty:</span> {selectedFaculty?.name || 'N/A'}</div>
                  </div>
                </div>
                
                {selectedAtt && (
                  <div className="rounded-lg bg-muted p-4 space-y-2">
                    <h4 className="text-sm font-semibold">Attachment Details</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-muted-foreground">Company:</span> {selectedAtt.company}</div>
                      <div><span className="text-muted-foreground">Supervisor:</span> {selectedAtt.supervisorName}</div>
                      <div><span className="text-muted-foreground">Period:</span> {selectedAtt.startDate} → {selectedAtt.endDate}</div>
                      <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selectedAtt.status} /></div>
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Applications ({selectedApps.length})</h4>
                  {selectedApps.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No applications yet</p>
                  ) : (
                    selectedApps.map((app) => (
                      <div key={app.id} className="flex items-center justify-between rounded-lg border p-2 mb-1">
                        <span className="text-sm">{app.vacancyTitle}</span>
                        <StatusBadge status={app.status} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
