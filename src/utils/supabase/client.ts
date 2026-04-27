import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () => {
  if (!supabaseUrl) {
    throw new Error("supabaseUrl is required.");
  }

  if (!supabaseKey) {
    throw new Error("supabaseKey is required.");
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
};
