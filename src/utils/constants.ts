export const ROLES = {
  STUDENT: 'Student',
  COMPANY: 'Company',
  LECTURER: 'Lecturer',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

export const LOGBOOK_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type LogbookStatus = typeof LOGBOOK_STATUS[keyof typeof LOGBOOK_STATUS];

export const ATTACHMENT_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

export type AttachmentStatus = typeof ATTACHMENT_STATUS[keyof typeof ATTACHMENT_STATUS];

export const VACANCY_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
} as const;

export const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Software Engineering',
  'Data Science',
  'Cyber Security',
  'Business Administration',
  'Electrical Engineering',
] as const;

export const LOCATIONS = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Remote',
] as const;

export const DURATIONS = ['1 Month', '2 Months', '3 Months', '6 Months'] as const;

export const STATUS_COLORS: Record<string, string> = {
  pending: 'warning',
  reviewed: 'info',
  accepted: 'success',
  rejected: 'destructive',
  approved: 'success',
  open: 'success',
  closed: 'muted',
  in_progress: 'info',
  completed: 'success',
  not_started: 'muted',
  active: 'success',
  inactive: 'muted',
};
