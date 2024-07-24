export const GenderOptions = ['Муж', 'Жен'];

export const PatientFormDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'Муж' as Gender,
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Свидетельство о рождении',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  'Свидетельство о рождении',
  'Водительские права',
  'Медицинский полис',
  'Военный билет',
  'Загран паспорт',
  'Паспорт',
  'Разрешение на работу (виза)',
  'СНИЛС',
  'Студенческий билет',
];

export const Doctors = [
  {
    image: '/assets/images/dr-green.png',
    name: 'Евгений Зеленый',
  },
  {
    image: '/assets/images/dr-cameron.png',
    name: 'Елена Камеронова',
  },
  {
    image: '/assets/images/dr-livingston.png',
    name: 'Давид Каменщиков',
  },
  {
    image: '/assets/images/dr-peter.png',
    name: 'Иван Петров',
  },
  {
    image: '/assets/images/dr-powell.png',
    name: 'Жанна Повелевская',
  },
  {
    image: '/assets/images/dr-remirez.png',
    name: 'Алексей Ремирезов',
  },
  {
    image: '/assets/images/dr-lee.png',
    name: 'Жасмина Ли',
  },
  {
    image: '/assets/images/dr-cruz.png',
    name: 'Алена Крузина',
  },
  {
    image: '/assets/images/dr-sharma.png',
    name: 'Харитон Шарманов',
  },
];

export const StatusIcon = {
  scheduled: '/assets/icons/check.svg',
  pending: '/assets/icons/pending.svg',
  cancelled: '/assets/icons/cancelled.svg',
};
