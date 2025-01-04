import { supabase } from "./SupabaseInit";
import { SupabaseContext } from "./SupabaseContext";

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};
