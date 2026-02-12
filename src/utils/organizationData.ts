// Organization structure: Universities, Faculties, and Company Admin system

export interface Faculty {
  id: string;
  name: string;
  universityId: string;
  departments: string[];
}

export interface University {
  id: string;
  name: string;
  location: string;
}

export interface CompanyMember {
  id: string;
  userId: string;
  companyId: string;
  role: 'admin' | 'supervisor' | 'staff';
  name: string;
  email: string;
}

// Mock Universities
export const mockUniversities: University[] = [
  { id: 'uni-1', name: 'University of Nairobi', location: 'Nairobi' },
  { id: 'uni-2', name: 'Kenyatta University', location: 'Nairobi' },
  { id: 'uni-3', name: 'Moi University', location: 'Eldoret' },
  { id: 'uni-4', name: 'JKUAT', location: 'Juja' },
  { id: 'uni-5', name: 'Strathmore University', location: 'Nairobi' },
];

// Mock Faculties/Schools
export const mockFaculties: Faculty[] = [
  { 
    id: 'fac-1', 
    name: 'School of Computing & Informatics', 
    universityId: 'uni-1',
    departments: ['Computer Science', 'Information Technology', 'Software Engineering', 'Data Science', 'Cyber Security']
  },
  { 
    id: 'fac-2', 
    name: 'School of Engineering', 
    universityId: 'uni-1',
    departments: ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering']
  },
  { 
    id: 'fac-3', 
    name: 'School of Business', 
    universityId: 'uni-1',
    departments: ['Business Administration', 'Finance', 'Marketing']
  },
  { 
    id: 'fac-4', 
    name: 'Faculty of Information Technology', 
    universityId: 'uni-2',
    departments: ['Computer Science', 'Information Technology', 'Informatics']
  },
  { 
    id: 'fac-5', 
    name: 'School of Science & Technology', 
    universityId: 'uni-3',
    departments: ['Computer Science', 'Mathematics', 'Physics']
  },
  { 
    id: 'fac-6', 
    name: 'School of Computing', 
    universityId: 'uni-4',
    departments: ['Software Engineering', 'Computer Technology', 'Information Technology']
  },
  { 
    id: 'fac-7', 
    name: 'Faculty of Information Technology', 
    universityId: 'uni-5',
    departments: ['Computer Science', 'Business Information Technology']
  },
];

// Company Members (admin, supervisors, staff)
export const mockCompanyMembers: CompanyMember[] = [
  { id: 'cm-1', userId: 'com-1', companyId: 'com-1', role: 'admin', name: 'Jane Muthoni', email: 'jane@techcorp.co' },
  { id: 'cm-2', userId: 'sup-1', companyId: 'com-1', role: 'supervisor', name: 'John Doe', email: 'john@techcorp.co' },
  { id: 'cm-3', userId: 'staff-1', companyId: 'com-1', role: 'staff', name: 'Peter Kimani', email: 'peter@techcorp.co' },
  { id: 'cm-4', userId: 'com-2', companyId: 'com-2', role: 'admin', name: 'Mary Wanjiru', email: 'mary@dataflow.co' },
  { id: 'cm-5', userId: 'sup-2', companyId: 'com-2', role: 'supervisor', name: 'Samuel Otieno', email: 'samuel@dataflow.co' },
];

// Helper functions
export function getUniversityById(id: string): University | undefined {
  return mockUniversities.find(u => u.id === id);
}

export function getFacultyById(id: string): Faculty | undefined {
  return mockFaculties.find(f => f.id === id);
}

export function getFacultiesByUniversity(universityId: string): Faculty[] {
  return mockFaculties.filter(f => f.universityId === universityId);
}

export function getCompanyMembers(companyId: string): CompanyMember[] {
  return mockCompanyMembers.filter(m => m.companyId === companyId);
}

export function getCompanyAdmin(companyId: string): CompanyMember | undefined {
  return mockCompanyMembers.find(m => m.companyId === companyId && m.role === 'admin');
}

export function hasCompanyAdmin(companyId: string): boolean {
  return mockCompanyMembers.some(m => m.companyId === companyId && m.role === 'admin');
}
