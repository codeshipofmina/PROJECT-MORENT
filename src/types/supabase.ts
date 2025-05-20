export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          car_id: string | null;
          created_at: string | null;
          end_date: string | null;
          id: string;
          start_date: string | null;
          status: string | null;
          total_price: number | null;
          user_id: string | null;
        };
        Insert: {
          car_id?: string | null;
          created_at?: string | null;
          end_date?: string | null;
          id?: string;
          start_date?: string | null;
          status?: string | null;
          total_price?: number | null;
          user_id?: string | null;
        };
        Update: {
          car_id?: string | null;
          created_at?: string | null;
          end_date?: string | null;
          id?: string;
          start_date?: string | null;
          status?: string | null;
          total_price?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_car_id_fkey";
            columns: ["car_id"];
            isOneToOne: false;
            referencedRelation: "cars";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      car_locations: {
        Row: {
          car_id: string | null;
          id: string;
          location_id: string | null;
        };
        Insert: {
          car_id?: string | null;
          id?: string;
          location_id?: string | null;
        };
        Update: {
          car_id?: string | null;
          id?: string;
          location_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "car_locations_car_id_fkey";
            columns: ["car_id"];
            isOneToOne: false;
            referencedRelation: "cars";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "car_locations_location_id_fkey";
            columns: ["location_id"];
            isOneToOne: false;
            referencedRelation: "locations";
            referencedColumns: ["id"];
          }
        ];
      };
      cars: {
        Row: {
          availability: boolean | null;
          brand: string | null;
          carimg: string | null;
          colors: string | null;
          consumption: number | null;
          created_at: string | null;
          electricvehicle: boolean | null;
          fuel: string | null;
          geartype: string | null;
          horstpower: number | null;
          id: string;
          locations: string | null;
          luggage: number | null;
          model: string | null;
          priceperday: number | null;
          ps: number | null;
          seats: number | null;
          vehicle_type_id: string | null;
          vehicleid: string | null;
          year: number | null;
        };
        Insert: {
          availability?: boolean | null;
          brand?: string | null;
          carimg?: string | null;
          colors?: string | null;
          consumption?: number | null;
          created_at?: string | null;
          electricvehicle?: boolean | null;
          fuel?: string | null;
          geartype?: string | null;
          horstpower?: number | null;
          id?: string;
          locations?: string | null;
          luggage?: number | null;
          model?: string | null;
          priceperday?: number | null;
          ps?: number | null;
          seats?: number | null;
          vehicle_type_id?: string | null;
          vehicleid?: string | null;
          year?: number | null;
        };
        Update: {
          availability?: boolean | null;
          brand?: string | null;
          carimg?: string | null;
          colors?: string | null;
          consumption?: number | null;
          created_at?: string | null;
          electricvehicle?: boolean | null;
          fuel?: string | null;
          geartype?: string | null;
          horstpower?: number | null;
          id?: string;
          locations?: string | null;
          luggage?: number | null;
          model?: string | null;
          priceperday?: number | null;
          ps?: number | null;
          seats?: number | null;
          vehicle_type_id?: string | null;
          vehicleid?: string | null;
          year?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "cars_vehicle_type_id_fkey";
            columns: ["vehicle_type_id"];
            isOneToOne: false;
            referencedRelation: "vehicle_types";
            referencedColumns: ["id"];
          }
        ];
      };
      favorites: {
        Row: {
          car_id: string | null;
          id: string;
          user_id: string | null;
        };
        Insert: {
          car_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Update: {
          car_id?: string | null;
          id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "favorites_car_id_fkey";
            columns: ["car_id"];
            isOneToOne: false;
            referencedRelation: "cars";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorites_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      locations: {
        Row: {
          address: string | null;
          city: string | null;
          id: string;
        };
        Insert: {
          address?: string | null;
          city?: string | null;
          id?: string;
        };
        Update: {
          address?: string | null;
          city?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          booking_id: string | null;
          id: string;
          payment_date: string | null;
          payment_method: string | null;
          payment_status: string | null;
        };
        Insert: {
          booking_id?: string | null;
          id?: string;
          payment_date?: string | null;
          payment_method?: string | null;
          payment_status?: string | null;
        };
        Update: {
          booking_id?: string | null;
          id?: string;
          payment_date?: string | null;
          payment_method?: string | null;
          payment_status?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: false;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          }
        ];
      };
      reviews: {
        Row: {
          car_id: string | null;
          comment: string | null;
          created_at: string | null;
          id: string;
          rating: number | null;
          user_id: string | null;
        };
        Insert: {
          car_id?: string | null;
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          rating?: number | null;
          user_id?: string | null;
        };
        Update: {
          car_id?: string | null;
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          rating?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_car_id_fkey";
            columns: ["car_id"];
            isOneToOne: false;
            referencedRelation: "cars";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          password: string | null;
          phone: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          password?: string | null;
          phone?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          password?: string | null;
          phone?: string | null;
        };
        Relationships: [];
      };
      vehicle_types: {
        Row: {
          id: string;
          name: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
