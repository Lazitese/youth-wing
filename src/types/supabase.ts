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
      profiles: {
        Row: {
          id: string
          email: string
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          is_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          is_admin?: boolean
          created_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          description: string
          requirements: string | null
          responsibilities: string | null
          location: string | null
          job_type: 'full_time' | 'part_time' | 'contract' | 'internship'
          deadline: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          requirements?: string | null
          responsibilities?: string | null
          location?: string | null
          job_type: 'full_time' | 'part_time' | 'contract' | 'internship'
          deadline: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          requirements?: string | null
          responsibilities?: string | null
          location?: string | null
          job_type?: 'full_time' | 'part_time' | 'contract' | 'internship'
          deadline?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          job_id: string
          full_name: string
          email: string
          phone: string
          education: string
          experience: string
          resume_url: string
          additional_docs: string[] | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          full_name: string
          email: string
          phone: string
          education: string
          experience: string
          resume_url: string
          additional_docs?: string[] | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          full_name?: string
          email?: string
          phone?: string
          education?: string
          experience?: string
          resume_url?: string
          additional_docs?: string[] | null
          status?: string
          created_at?: string
          updated_at?: string
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