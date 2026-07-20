import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import RentCarPage from "./pages/RentCar";
import GalleryPage from "./pages/Gallery";
import ContactPage from "./pages/Contact";
import { Navigate } from 'react-router-dom';
import { AdminAuthGuard } from './admin/guards/AdminAuthGuard';
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';
import { AdminDashboardPage } from './admin/pages/AdminDashboardPage';
import { AdminPackagesListPage } from './admin/pages/packages/AdminPackagesListPage';
import { AdminPackageCreatePage } from './admin/pages/packages/AdminPackageCreatePage';
import { AdminPackageEditPage } from './admin/pages/packages/AdminPackageEditPage';
import { AdminCarsListPage } from './admin/pages/cars/AdminCarsListPage';
import { AdminCarCreatePage } from './admin/pages/cars/AdminCarCreatePage';
import { AdminCarEditPage } from './admin/pages/cars/AdminCarEditPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sri-lanka" element={<SriLanka />} />
            <Route path="/maldives" element={<Maldives />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/rent-car" element={<RentCarPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/sri-lanka/package/:packageId" element={<SriLankaPackageDetail />} />
            <Route path="/maldives/package/:packageId" element={<MaldivesPackageDetail />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<AdminAuthGuard />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/packages" element={<AdminPackagesListPage />} />
                <Route path="/admin/packages/new" element={<AdminPackageCreatePage />} />
                <Route path="/admin/packages/:id/edit" element={<AdminPackageEditPage />} />
                <Route path="/admin/cars" element={<AdminCarsListPage />} />
                <Route path="/admin/cars/new" element={<AdminCarCreatePage />} />
                <Route path="/admin/cars/:id/edit" element={<AdminCarEditPage />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
