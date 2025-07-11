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
      tasks: {
        Row: {
          id: number
          title: string
          description: string
          status: boolean
          created_at: string
          user_id: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          status?: boolean
          created_at?: string
          user_id: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          status?: boolean
          created_at?: string
          user_id?: string
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