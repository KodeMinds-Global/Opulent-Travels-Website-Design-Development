import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SriLanka from "./pages/SriLanka";
import Maldives from "./pages/Maldives";
import AboutUs from "./pages/AboutUs";
import SriLankaPackageDetail from "./pages/PackageDetail/SriLankaPackageDetail";
import MaldivesPackageDetail from "./pages/PackageDetail/MaldivesPackageDetail";
import Packages from "./pages/Packages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sri-lanka" element={<SriLanka />} />
            <Route path="/maldives" element={<Maldives />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/sri-lanka/package/:packageId" element={<SriLankaPackageDetail />} />
            <Route path="/maldives/package/:packageId" element={<MaldivesPackageDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
