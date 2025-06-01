export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      organic_Category: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      organic_Order: {
        Row: {
          address: string
          cart: Json
          created_at: string
          email: string | null
          id: number
          name: string
          phone: string
          status: Database["public"]["Enums"]["OrderStatus"]
        }
        Insert: {
          address: string
          cart: Json
          created_at?: string
          email?: string | null
          id?: number
          name: string
          phone: string
          status: Database["public"]["Enums"]["OrderStatus"]
        }
        Update: {
          address?: string
          cart?: Json
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          phone?: string
          status?: Database["public"]["Enums"]["OrderStatus"]
        }
        Relationships: []
      }
      organic_Product: {
        Row: {
          categoryId: number
          created_at: string
          description: string
          details: string
          id: number
          image: string
          inStock: boolean
          name: string
          price: number
          slug: string
          state: Database["public"]["Enums"]["ProductActiveState"]
          weight: number
        }
        Insert: {
          categoryId: number
          created_at?: string
          description?: string
          details?: string
          id?: number
          image?: string
          inStock: boolean
          name?: string
          price: number
          slug?: string
          state: Database["public"]["Enums"]["ProductActiveState"]
          weight?: number
        }
        Update: {
          categoryId?: number
          created_at?: string
          description?: string
          details?: string
          id?: number
          image?: string
          inStock?: boolean
          name?: string
          price?: number
          slug?: string
          state?: Database["public"]["Enums"]["ProductActiveState"]
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "organic_Product_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "organic_Category"
            referencedColumns: ["id"]
          },
        ]
      }
      query: {
        Row: {
          business_type: string
          created_at: string | null
          email: string
          extras: string | null
          full_name: string | null
          id: string
          phone: string | null
          query: string | null
          read: boolean | null
          replied: boolean | null
          updated_at: string | null
        }
        Insert: {
          business_type: string
          created_at?: string | null
          email: string
          extras?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          query?: string | null
          read?: boolean | null
          replied?: boolean | null
          updated_at?: string | null
        }
        Update: {
          business_type?: string
          created_at?: string | null
          email?: string
          extras?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          query?: string | null
          read?: boolean | null
          replied?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      smtp_settings: {
        Row: {
          created_at: string | null
          from_email: string
          from_name: string | null
          host: string
          id: string
          password: string
          port: number
          secure: boolean | null
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          from_email: string
          from_name?: string | null
          host: string
          id?: string
          password: string
          port: number
          secure?: boolean | null
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          from_email?: string
          from_name?: string | null
          host?: string
          id?: string
          password?: string
          port?: number
          secure?: boolean | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      OrderStatus: "completed" | "pending"
      ProductActiveState: "archived" | "normal" | "featured"
      ProductWeightUnit: "kg" | "l"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      OrderStatus: ["completed", "pending"],
      ProductActiveState: ["archived", "normal", "featured"],
      ProductWeightUnit: ["kg", "l"],
    },
  },
} as const
