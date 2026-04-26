import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./lib/i18n";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import ExperienceDetail from "./pages/ExperienceDetail";
import Themes from "./pages/Themes";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/es" replace />} />
            <Route path="/:lang" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="destinos" element={<Destinations />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="tematicas" element={<Themes />} />
              <Route path="themes" element={<Themes />} />
              <Route path="contacto" element={<Contact />} />
              <Route path="contact" element={<Contact />} />
              <Route path="tour/:slug" element={<ExperienceDetail />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
