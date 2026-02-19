// Types for Pet Shop Website

export type Locale = 'en' | 'zh';

export interface LocalizedString {
  en: string;
  zh: string;
}

// Pet Types
export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster';
export type PetSize = 'small' | 'medium' | 'large';
export type PetGender = 'male' | 'female';

export interface Pet {
  id: string;
  name: LocalizedString;
  species: PetSpecies;
  breed: LocalizedString;
  age: number; // in months
  size: PetSize;
  gender: PetGender;
  images: string[];
  description: LocalizedString;
  personality: LocalizedString;
  vaccinated: boolean;
  neutered: boolean;
  available: boolean;
}

// Product Types
export type ProductCategory = 'food' | 'toys' | 'accessories' | 'health' | 'grooming';

export interface Product {
  id: string;
  name: LocalizedString;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  images: string[];
  description: LocalizedString;
  stock: number;
  rating: number;
  reviews: number;
  featured: boolean;
}

// Service Types
export type ServiceCategory = 'grooming' | 'boarding' | 'veterinary' | 'training';

export interface Service {
  id: string;
  name: LocalizedString;
  category: ServiceCategory;
  description: LocalizedString;
  price: number;
  duration: number; // in minutes
  image: string;
  features: {
    en: string[];
    zh: string[];
  };
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Form Types
export interface AdoptionFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  petExperience: string;
  reason: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  petName: string;
  petType: string;
  date: string;
  time: string;
  notes: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'credit' | 'debit' | 'cash';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
