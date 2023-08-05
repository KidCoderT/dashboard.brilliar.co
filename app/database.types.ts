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
          end_time: string | null
          id: string
          solved: boolean | null
          start_time: string | null
          text: string | null
          video_id: string
        }
        Insert: {
          end_time?: string | null
          id?: string
          solved?: boolean | null
          start_time?: string | null
          text?: string | null
          video_id: string
        }
        Update: {
          end_time?: string | null
          id?: string
          solved?: boolean | null
          start_time?: string | null
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
          done: boolean | null
          finished_videos: string[] | null
          id: string
          og_link: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          done?: boolean | null
          finished_videos?: string[] | null
          id?: string
          og_link?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          done?: boolean | null
          finished_videos?: string[] | null
          id?: string
          og_link?: string | null
          status?: string | null
          user_id?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
