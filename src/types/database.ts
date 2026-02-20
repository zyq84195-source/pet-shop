export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          avatar_url: string | null
          role: 'customer' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          name_zh: string | null
          description: string | null
          description_zh: string | null
          price: number
          original_price: number | null
          image_url: string | null
          category: string | null
          stock: number
          rating: number
          reviews: number
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_zh?: string | null
          description?: string | null
          description_zh?: string | null
          price: number
          original_price?: number | null
          image_url?: string | null
          category?: string | null
          stock?: number
          rating?: number
          reviews?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_zh?: string | null
          description?: string | null
          description_zh?: string | null
          price?: number
          original_price?: number | null
          image_url?: string | null
          category?: string | null
          stock?: number
          rating?: number
          reviews?: number
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      pets: {
        Row: {
          id: string
          name: string
          species: string
          breed: string | null
          age: string | null
          gender: string | null
          color: string | null
          size: string | null
          description: string | null
          description_zh: string | null
          image_url: string | null
          images: string[] | null
          status: 'available' | 'pending' | 'adopted'
          vaccinated: boolean
          neutered: boolean
          good_with_kids: boolean
          good_with_pets: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          species: string
          breed?: string | null
          age?: string | null
          gender?: string | null
          color?: string | null
          size?: string | null
          description?: string | null
          description_zh?: string | null
          image_url?: string | null
          images?: string[] | null
          status?: 'available' | 'pending' | 'adopted'
          vaccinated?: boolean
          neutered?: boolean
          good_with_kids?: boolean
          good_with_pets?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          species?: string
          breed?: string | null
          age?: string | null
          gender?: string | null
          color?: string | null
          size?: string | null
          description?: string | null
          description_zh?: string | null
          image_url?: string | null
          images?: string[] | null
          status?: 'available' | 'pending' | 'adopted'
          vaccinated?: boolean
          neutered?: boolean
          good_with_kids?: boolean
          good_with_pets?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          name_zh: string | null
          description: string | null
          description_zh: string | null
          price: number
          duration: string | null
          image_url: string | null
          category: string | null
          available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_zh?: string | null
          description?: string | null
          description_zh?: string | null
          price: number
          duration?: string | null
          image_url?: string | null
          category?: string | null
          available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_zh?: string | null
          description?: string | null
          description_zh?: string | null
          price?: number
          duration?: string | null
          image_url?: string | null
          category?: string | null
          available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          order_number: string
          items: Json
          total_amount: number
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address: string | null
          phone: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_number?: string
          items: Json
          total_amount: number
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address?: string | null
          phone?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          order_number?: string
          items?: Json
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          shipping_address?: string | null
          phone?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string | null
          service_id: string | null
          pet_name: string
          pet_type: string
          date: string
          time: string
          notes: string | null
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          pet_name: string
          pet_type: string
          date: string
          time: string
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          service_id?: string | null
          pet_name?: string
          pet_type?: string
          date?: string
          time?: string
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
      }
      adoptions: {
        Row: {
          id: string
          user_id: string | null
          pet_id: string | null
          applicant_name: string
          applicant_email: string
          applicant_phone: string
          applicant_address: string
          pet_experience: string | null
          reason: string | null
          status: 'pending' | 'approved' | 'rejected' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          pet_id?: string | null
          applicant_name: string
          applicant_email: string
          applicant_phone: string
          applicant_address: string
          pet_experience?: string | null
          reason?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          pet_id?: string | null
          applicant_name?: string
          applicant_email?: string
          applicant_phone?: string
          applicant_address?: string
          pet_experience?: string | null
          reason?: string | null
          status?: 'pending' | 'approved' | 'rejected' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
