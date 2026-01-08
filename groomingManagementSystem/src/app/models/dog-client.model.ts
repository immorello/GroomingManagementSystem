export type DogBehavior = 'calm' | 'normal' | 'anxious' | 'difficult';
export type CoatType = 'short' | 'medium' | 'long' | 'curly' | 'double';

export interface Owner {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  preferredContact?: 'phone' | 'whatsapp' | 'email';
}

export interface DogClient {
  id: string;
  name: string;
  breedName: string;
  photoUrl?: string;

  defaultServiceDurationMin: number;
  coatType?: CoatType;
  behavior?: DogBehavior;
  durationMultiplier?: number;

  needsTwoPeople?: boolean;
  muzzleRequired?: boolean;
  allergiesOrProducts?: string;

  notes?: string;

  lastVisitAt?: string; // ISO
  lastActualDurationMin?: number;

  owner: Owner;
  tags?: string[];
}
