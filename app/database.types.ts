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
      comment: {
        Row: {
          id: string
          solved: boolean
          text: string | null
          video_id: string
        }
        Insert: {
          id?: string
          solved?: boolean
          text?: string | null
          video_id: string
        }
        Update: {
          id?: string
          solved?: boolean
          text?: string | null
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_video_id_fkey"
            columns: ["video_id"]
            referencedRelation: "video"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      video: {
        Row: {
          created_on: string | null
          done: boolean
          finished_videos: string[]
          id: string
          og_link: string
          status: Database["public"]["Enums"]["status_enum"]
          style: string
          updated_at: string | null
          user_id: string
          vid1: string
          vid2: string | null
          vid3: string | null
        }
        Insert: {
          created_on?: string | null
          done?: boolean
          finished_videos?: string[]
          id?: string
          og_link: string
          status?: Database["public"]["Enums"]["status_enum"]
          style: string
          updated_at?: string | null
          user_id: string
          vid1: string
          vid2?: string | null
          vid3?: string | null
        }
        Update: {
          created_on?: string | null
          done?: boolean
          finished_videos?: string[]
          id?: string
          og_link?: string
          status?: Database["public"]["Enums"]["status_enum"]
          style?: string
          updated_at?: string | null
          user_id?: string
          vid1?: string
          vid2?: string | null
          vid3?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status_enum: "trimming" | "editing" | "to_review"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
