export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  owner: User;
  medicalRecords: MedicalRecord[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'owner' | 'vet' | 'admin';
  pets: Pet[];
}

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  treatment: string;
  vet: User;
  pet: Pet;
}

export interface Doctor {
  id: string;
  user: User;
  specialization: string;
  experience: number;
  certification: {
    number: string;
    imageUrl: string;
    verificationStatus: 'pending' | 'verified' | 'rejected';
  };
  clinic?: {
    name: string;
    address: string;
    images: string[];
    license: string;
  };
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  petId: string;
  timeSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  symptoms?: string;
}