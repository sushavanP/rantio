import { useContext } from "react";
import { SupabaseContext } from "./SupabaseContext";
import { SupabaseClient } from "@supabase/supabase-js";

export const useSupabase = (): SupabaseClient => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }

  return context;
};
