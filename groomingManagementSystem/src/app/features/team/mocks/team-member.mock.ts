import { TeamMember } from "../models/team-member.model";

export const TEAM_MEMBERS_MOCK: TeamMember[] = [
  {
    id: 't-0001-andrea',
    firstName: 'Andrea',
    lastName: 'Rinaldi',
    phone: '+39 333 120 4455',
    email: 'andrea.rinaldi@bestforpets.it',
    photoUrl: 'assets/img/team/andrea.webp',
    role: 'toelettatore',

    speedFactor: 1.05,
    difficultyLevel: 2,
    services: ['bath', 'full-groom', 'trim', 'nails'],
    maxConcurrentDogs: 1,

    schedule: {
      mon: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }],
      tue: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }],
      wed: [{ start: '09:00', end: '13:00' }],
      thu: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }],
      fri: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }],
      sat: [{ start: '09:00', end: '13:00' }],
    },

    timeOff: [
      { start: '2026-02-10', end: '2026-02-12', type: 'corso', note: 'Corso aggiornamento' },
    ],

    notes: 'Bravo con tagli standard e rifiniture. Preferisce cani medi/piccoli.',
    isActive: true,
  },
  {
    id: 't-0002-micol',
    firstName: 'Micol',
    lastName: 'Ferrari',
    phone: '+39 347 880 2211',
    email: 'micol.ferrari@bestforpets.it',
    photoUrl: 'assets/img/team/micol.jpeg',
    role: 'toelettatore',

    speedFactor: 1.25,
    difficultyLevel: 3,
    services: ['bath', 'full-groom', 'trim', 'nails', 'stripping'],
    maxConcurrentDogs: 1,

    schedule: {
      mon: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:30' }],
      tue: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:30' }],
      wed: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:30' }],
      thu: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:30' }],
      fri: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '18:00' }],
      sat: [{ start: '09:00', end: '13:00' }],
    },

    timeOff: [
      { start: '2026-01-20', end: '2026-01-22', type: 'ferie', note: 'Ferie' },
    ],

    notes: 'Molto precisa e veloce. Gestisce bene cani difficili e stripping.',
    isActive: true,
  },
  {
    id: 't-0003-mirco',
    firstName: 'Mirco',
    lastName: 'Bianchi',
    phone: '+39 329 555 9001',
    email: 'mirco.bianchi@bestforpets.it',
    photoUrl: 'assets/img/team/mirco.jpg',
    role: 'toelettatore',

    speedFactor: 0.9,
    difficultyLevel: 2,
    services: ['bath', 'full-groom', 'trim', 'nails'],
    maxConcurrentDogs: 1,

    schedule: {
      mon: [{ start: '10:00', end: '13:00' }, { start: '14:30', end: '18:00' }],
      tue: [{ start: '10:00', end: '13:00' }, { start: '14:30', end: '18:00' }],
      wed: [{ start: '10:00', end: '13:00' }, { start: '14:30', end: '18:00' }],
      thu: [{ start: '10:00', end: '13:00' }, { start: '14:30', end: '18:00' }],
      fri: [{ start: '10:00', end: '13:00' }, { start: '14:30', end: '18:00' }],
    },

    timeOff: [
      { start: '2026-03-03', end: '2026-03-07', type: 'ferie', note: 'Settimana ferie' },
    ],

    notes: 'Ottimo con bagni e routine. Con cani molto agitati serve più tempo.',
    isActive: true,
  },
  {
    id: 't-0004-sara',
    firstName: 'Sara',
    lastName: 'Neri',
    phone: '+39 320 778 6611',
    email: 'sara.neri@bestforpets.it',
    photoUrl: 'assets/img/team/sara.jpg',
    role: 'corsista',

    speedFactor: 1.0,
    difficultyLevel: 1,
    services: ['bath', 'nails'],
    maxConcurrentDogs: 2,

    schedule: {
      mon: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }],
      tue: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }],
      thu: [{ start: '09:00', end: '13:00' }, { start: '14:00', end: '17:00' }],
      fri: [{ start: '09:00', end: '13:00' }],
      sat: [{ start: '09:00', end: '13:00' }],
    },

    timeOff: [
      { start: '2026-02-24', end: '2026-02-24', type: 'altro', note: 'Permesso (mattina)' },
    ],

    notes: 'Supporto lavaggi/asciugatura e unghie. Può gestire 2 cani “in parallelo” in fase bagno.',
    isActive: true,
  },
];
