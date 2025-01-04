import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SupabaseProvider } from "./Supabase/SupabaseProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SupabaseProvider>
      <App />
    </SupabaseProvider>
  </StrictMode>,
);
