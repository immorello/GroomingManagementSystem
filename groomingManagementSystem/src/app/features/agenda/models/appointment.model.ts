import { DogBehavior } from '../../clients/models/dog-client.model';
import { ServiceType } from '../../team/models/team-member.model';

export type AppointmentStatus =
  | 'draft'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show';

export type AppointmentSource = 'telefono' | 'whatsapp' | 'email' | 'in-person' | 'web';

export interface Appointment {
  id: string;

  dogId: string;
  dogName?: string;
  ownerName?: string;

  serviceType: ServiceType;
  status: AppointmentStatus;

  startAt: string; // ISO datetime
  endAt: string; // ISO datetime
  plannedDurationMin: number;

  baseDurationMin: number;
  durationMultiplier: number;
  staffSpeedFactor: number;

  teamMemberIds: string[];

  requiresTwoPeople?: boolean;
  muzzleRequired?: boolean;
  behavior?: DogBehavior;

  notes?: string;
  source?: AppointmentSource;

  createdAt: string; // ISO datetime
  updatedAt?: string;
}
