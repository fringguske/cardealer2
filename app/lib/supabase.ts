import { createClient } from '@supabase/supabase-js';


// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('WARNING: NEXT_PUBLIC_SUPABASE_URL is missing. Using placeholder.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript support
export interface Car {
  id?: string;
  name: string;
  type: string;
  seats: number;
  luggage: number;
  gearshift: 'Automatic' | 'Manual';
  images: string[];
  priceKsh: number;
  created_at?: string;
  updated_at?: string;
  color?: string;
  mileage?: string;
  year?: string;
  topSpeed?: string;
  acceleration?: string;
  fuelConsumption?: string;
  brakesType?: string;
  torque?: string;
  gasTankCapacity?: string;
}

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: Car;
        Insert: Omit<Car, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Car, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
} 