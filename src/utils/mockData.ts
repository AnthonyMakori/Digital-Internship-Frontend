import type { UserRole, ApplicationStatus, LogbookStatus, AttachmentStatus } from './constants';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  status: 'active' | 'inactive';
}

export interface Vacancy {
  id: string;
  title: string;
  company: string;
  companyId: string;
  department: string;
  location: string;
  duration: string;
  description: string;
  requirements: string[];
  status: 'open' | 'closed';
  applicants: number;
  createdAt: string;
}

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  vacancyId: string;
  vacancyTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedAt: string;
  cvUrl?: string;
  coverLetter?: string;
  feedback?: string;
  supervisorId?: string;
  supervisorName?: string;
}

export interface LogbookEntry {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  activities: string;
  skillsLearned: string;
  challenges: string;
  status: LogbookStatus;
  supervisorComment?: string;
}

export interface Attachment {
  id: string;
  studentId: string;
  studentName: string;
  company: string;
  companyId: string;
  supervisorName: string;
  supervisorId: string;
  startDate: string;
  endDate: string;
  status: AttachmentStatus;
  department: string;
}

export interface Evaluation {
  id: string;
  studentId: string;
  studentName: string;
  evaluatorId: string;
  evaluatorName: string;
  type: 'supervisor' | 'lecturer';
  score: number;
  maxScore: number;
  remarks: string;
  submittedAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  { id: 'stu-1', name: 'Alice Mwangi', email: 'alice@student.edu', role: 'student', department: 'Computer Science', status: 'active' },
  { id: 'stu-2', name: 'Brian Ochieng', email: 'brian@student.edu', role: 'student', department: 'Information Technology', status: 'active' },
  { id: 'stu-3', name: 'Carol Wanjiku', email: 'carol@student.edu', role: 'student', department: 'Software Engineering', status: 'active' },
  { id: 'stu-4', name: 'David Kamau', email: 'david@student.edu', role: 'student', department: 'Data Science', status: 'inactive' },
  { id: 'com-1', name: 'TechCorp Ltd', email: 'hr@techcorp.co', role: 'company', department: 'Technology', status: 'active' },
  { id: 'com-2', name: 'DataFlow Inc', email: 'hr@dataflow.co', role: 'company', department: 'Data Analytics', status: 'active' },
  { id: 'lec-1', name: 'Dr. Sarah Njeri', email: 'sarah@university.edu', role: 'lecturer', department: 'Computer Science', status: 'active' },
  { id: 'lec-2', name: 'Prof. James Otieno', email: 'james@university.edu', role: 'lecturer', department: 'Information Technology', status: 'active' },
  { id: 'adm-1', name: 'System Admin', email: 'admin@system.edu', role: 'admin', status: 'active' },
];

export const mockVacancies: Vacancy[] = [
  {
    id: 'vac-1', title: 'Frontend Developer Intern', company: 'TechCorp Ltd', companyId: 'com-1',
    department: 'Computer Science', location: 'Nairobi', duration: '3 Months',
    description: 'Join our frontend team to build modern web applications using React and TypeScript.',
    requirements: ['React', 'TypeScript', 'HTML/CSS', 'Git'], status: 'open', applicants: 12, createdAt: '2025-12-01',
  },
  {
    id: 'vac-2', title: 'Data Analyst Intern', company: 'DataFlow Inc', companyId: 'com-2',
    department: 'Data Science', location: 'Remote', duration: '6 Months',
    description: 'Work with our data team on analytics and visualization projects.',
    requirements: ['Python', 'SQL', 'Tableau', 'Statistics'], status: 'open', applicants: 8, createdAt: '2025-12-10',
  },
  {
    id: 'vac-3', title: 'Backend Engineer Intern', company: 'TechCorp Ltd', companyId: 'com-1',
    department: 'Software Engineering', location: 'Mombasa', duration: '3 Months',
    description: 'Help build scalable APIs and microservices using Node.js.',
    requirements: ['Node.js', 'Express', 'MongoDB', 'REST APIs'], status: 'open', applicants: 5, createdAt: '2025-12-15',
  },
  {
    id: 'vac-4', title: 'IT Support Intern', company: 'DataFlow Inc', companyId: 'com-2',
    department: 'Information Technology', location: 'Kisumu', duration: '2 Months',
    description: 'Provide IT support and help maintain company infrastructure.',
    requirements: ['Networking', 'Windows/Linux', 'Troubleshooting'], status: 'closed', applicants: 15, createdAt: '2025-11-01',
  },
];

export const mockApplications: Application[] = [
  {
    id: 'app-1', studentId: 'stu-1', studentName: 'Alice Mwangi', studentEmail: 'alice@student.edu',
    vacancyId: 'vac-1', vacancyTitle: 'Frontend Developer Intern', company: 'TechCorp Ltd',
    status: 'accepted', appliedAt: '2025-12-05', cvUrl: '/cv/alice.pdf',
    coverLetter: 'I am passionate about frontend development...', feedback: 'Strong candidate, great portfolio.',
    supervisorId: 'sup-1', supervisorName: 'John Doe',
  },
  {
    id: 'app-2', studentId: 'stu-2', studentName: 'Brian Ochieng', studentEmail: 'brian@student.edu',
    vacancyId: 'vac-2', vacancyTitle: 'Data Analyst Intern', company: 'DataFlow Inc',
    status: 'pending', appliedAt: '2025-12-12', cvUrl: '/cv/brian.pdf',
    coverLetter: 'My data analysis skills make me ideal...',
  },
  {
    id: 'app-3', studentId: 'stu-3', studentName: 'Carol Wanjiku', studentEmail: 'carol@student.edu',
    vacancyId: 'vac-1', vacancyTitle: 'Frontend Developer Intern', company: 'TechCorp Ltd',
    status: 'reviewed', appliedAt: '2025-12-08', cvUrl: '/cv/carol.pdf',
    coverLetter: 'I have completed several React projects...', feedback: 'Under review — promising skills.',
  },
  {
    id: 'app-4', studentId: 'stu-1', studentName: 'Alice Mwangi', studentEmail: 'alice@student.edu',
    vacancyId: 'vac-3', vacancyTitle: 'Backend Engineer Intern', company: 'TechCorp Ltd',
    status: 'rejected', appliedAt: '2025-12-16', feedback: 'Position filled.',
  },
];

export const mockAttachments: Attachment[] = [
  {
    id: 'att-1', studentId: 'stu-1', studentName: 'Alice Mwangi',
    company: 'TechCorp Ltd', companyId: 'com-1', supervisorName: 'John Doe', supervisorId: 'sup-1',
    startDate: '2026-01-15', endDate: '2026-04-15', status: 'in_progress', department: 'Computer Science',
  },
];

export const mockLogbookEntries: LogbookEntry[] = [
  {
    id: 'log-1', studentId: 'stu-1', studentName: 'Alice Mwangi', date: '2026-01-15',
    activities: 'Set up development environment. Met with team members. Received project briefing on the dashboard redesign.',
    skillsLearned: 'React project structure, Git branching strategies, Agile standup format',
    challenges: 'Configuring ESLint with the existing codebase took longer than expected.',
    status: 'approved', supervisorComment: 'Good start. Keep up the momentum.',
  },
  {
    id: 'log-2', studentId: 'stu-1', studentName: 'Alice Mwangi', date: '2026-01-16',
    activities: 'Started working on the header component. Attended team code review session.',
    skillsLearned: 'Component composition patterns, Code review best practices',
    challenges: 'Understanding the existing component library conventions.',
    status: 'approved', supervisorComment: 'Well documented entry.',
  },
  {
    id: 'log-3', studentId: 'stu-1', studentName: 'Alice Mwangi', date: '2026-01-17',
    activities: 'Implemented responsive navigation. Fixed 3 bugs in the sidebar.',
    skillsLearned: 'CSS Grid, Mobile-first design, Debugging techniques',
    challenges: 'Cross-browser compatibility issues with Safari.',
    status: 'pending',
  },
  {
    id: 'log-4', studentId: 'stu-1', studentName: 'Alice Mwangi', date: '2026-01-20',
    activities: 'Built the analytics dashboard cards with chart integration.',
    skillsLearned: 'Recharts library, Data visualization principles',
    challenges: 'Performance optimization for large datasets.',
    status: 'rejected', supervisorComment: 'Please add more detail about the charting implementation.',
  },
];

export const mockEvaluations: Evaluation[] = [
  {
    id: 'eval-1', studentId: 'stu-1', studentName: 'Alice Mwangi',
    evaluatorId: 'sup-1', evaluatorName: 'John Doe', type: 'supervisor',
    score: 82, maxScore: 100, remarks: 'Alice has shown excellent progress in frontend development. Strong work ethic and team collaboration.',
    submittedAt: '2026-02-01',
  },
];

// Demo credentials for login
export const demoCredentials = [
  { email: 'alice@student.edu', password: 'demo123', role: 'student' as const, name: 'Alice Mwangi' },
  { email: 'hr@techcorp.co', password: 'demo123', role: 'company' as const, name: 'TechCorp Ltd' },
  { email: 'sarah@university.edu', password: 'demo123', role: 'lecturer' as const, name: 'Dr. Sarah Njeri' },
  { email: 'admin@system.edu', password: 'demo123', role: 'admin' as const, name: 'System Admin' },
];
