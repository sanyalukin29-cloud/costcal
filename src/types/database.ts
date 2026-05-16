/**
 * Hand-written types matching supabase/migrations/0001 + 0002.
 *
 * To regenerate from a live Supabase project:
 *   npx supabase login
 *   npx supabase gen types typescript --project-id <ref> > src/types/database.ts
 *
 * Until then, keep this in sync with the migration files manually.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SubscriptionTier = "free" | "pro" | "business" | "lifetime";
export type SubscriptionStatus = "active" | "paused" | "cancelled" | "past_due";
export type CalcModule = "online-seller" | "food-delivery" | "recipe";
export type SubPlan =
  | "pro_monthly"
  | "pro_annual"
  | "business_monthly"
  | "business_annual"
  | "lifetime";
export type SubPaymentStatus =
  | "pending"
  | "active"
  | "expired"
  | "cancelled"
  | "refunded";

export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: {
          id: string;
          email: string;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };

      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          subscription_tier: SubscriptionTier;
          subscription_status: SubscriptionStatus;
          subscription_started_at: string | null;
          subscription_expires_at: string | null;
          trial_ends_at: string | null;
          total_calculations: number;
          last_active_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: SubscriptionTier;
          subscription_status?: SubscriptionStatus;
          subscription_started_at?: string | null;
          subscription_expires_at?: string | null;
          trial_ends_at?: string | null;
          total_calculations?: number;
          last_active_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };

      calculations: {
        Row: {
          id: string;
          user_id: string | null;
          module: CalcModule | string;
          platform: string | null;
          inputs: Json;
          outputs: Json;
          notes: string | null;
          is_saved: boolean;
          tags: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          module: CalcModule | string;
          platform?: string | null;
          inputs: Json;
          outputs: Json;
          notes?: string | null;
          is_saved?: boolean;
          tags?: string[] | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["calculations"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "calculations_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      products: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          sku: string | null;
          category: string | null;
          cost_price: number | null;
          shipping_cost: number | null;
          prices: Json | null;
          notes: string | null;
          is_archived: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          sku?: string | null;
          category?: string | null;
          cost_price?: number | null;
          shipping_cost?: number | null;
          prices?: Json | null;
          notes?: string | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      fee_rules: {
        Row: {
          id: string;
          platform: string;
          shop_type: string | null;
          rules: Json;
          effective_from: string; // date
          effective_to: string | null;
          notes: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          platform: string;
          shop_type?: string | null;
          rules: Json;
          effective_from: string;
          effective_to?: string | null;
          notes?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["fee_rules"]["Insert"]>;
        Relationships: [];
      };

      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: SubPlan | string;
          amount: number;
          currency: string;
          payment_provider: string | null;
          payment_method: string | null;
          payment_id: string | null;
          status: SubPaymentStatus;
          started_at: string | null;
          expires_at: string | null;
          cancelled_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan: SubPlan | string;
          amount: number;
          currency?: string;
          payment_provider?: string | null;
          payment_method?: string | null;
          payment_id?: string | null;
          status?: SubPaymentStatus;
          started_at?: string | null;
          expires_at?: string | null;
          cancelled_at?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["subscriptions"]["Insert"]
        >;
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };

      webhook_logs: {
        Row: {
          id: string;
          provider: string;
          event_type: string | null;
          payload: Json | null;
          processed: boolean;
          error: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider: string;
          event_type?: string | null;
          payload?: Json | null;
          processed?: boolean;
          error?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["webhook_logs"]["Insert"]
        >;
        Relationships: [];
      };
    };
    Functions: {
      check_save_limit: {
        Args: { p_user_id: string };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
