// features/team/models/team-member.model.ts

export type TeamRole = 'toelettatore' | 'corsista' | 'reception' | 'lavaggio';
export type ServiceType = 'bath' | 'full-groom' | 'trim' | 'nails' | 'stripping';

export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface TimeRange {
  start: string; // '09:00'
  end: string;   // '13:00'
}

export type WeeklySchedule = Partial<Record<Weekday, TimeRange[]>>;

export type TimeOffType = 'ferie' | 'malattia' | 'corso' | 'altro';

export interface TimeOff {
  start: string; // '2026-01-12' (ISO date)
  end: string;   // '2026-01-14'
  type: TimeOffType;
  note?: string;
}

export interface TeamMember {
  id: string;

  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  photoUrl?: string;

  role: TeamRole;

  // capacità
  speedFactor: number; // 1.0 standard, >1 più veloce, <1 più lento
  difficultyLevel?: 0 | 1 | 2 | 3; // 0 solo facili, 3 anche difficili
  services: ServiceType[];
  maxConcurrentDogs?: number;

  // disponibilità
  schedule: WeeklySchedule;
  timeOff?: TimeOff[];

  notes?: string;
  isActive: boolean;
}
