import { redirect } from "next/navigation";

export default function RootPage() {
  // Mirrors the legacy <Navigate to="/es" replace /> at the BrowserRouter root.
  redirect("/es");
}
