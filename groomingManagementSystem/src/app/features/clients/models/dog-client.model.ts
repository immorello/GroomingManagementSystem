export type DogBehavior = 'calmo' | 'normale' | 'ansioso' | 'difficile';
export type CoatType = 'corto' | 'medio' | 'lungo' | 'riccio' | 'doppio';

export interface Owner {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  preferredContact?: 'telefono' | 'whatsapp' | 'email';
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
