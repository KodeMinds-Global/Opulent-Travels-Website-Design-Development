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
import TermsConditionsPage from './pages/TermsConditions';
import { Navigate } from 'react-router-dom';
import { AdminAuthGuard } from './admin/guards/AdminAuthGuard';
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminLoginPage } from './admin/pages/AdminLoginPage';
import { AdminDashboardPage } from './admin/pages/AdminDashboardPage';
import { AdminSriLankaPackagesListPage } from './admin/pages/packages/AdminSriLankaPackagesListPage';
import { AdminSriLankaPackageCreatePage } from './admin/pages/packages/AdminSriLankaPackageCreatePage';
import { AdminSriLankaPackageEditPage } from './admin/pages/packages/AdminSriLankaPackageEditPage';
import { AdminMaldivesPackagesListPage } from './admin/pages/packages/AdminMaldivesPackagesListPage';
import { AdminMaldivesPackageCreatePage } from './admin/pages/packages/AdminMaldivesPackageCreatePage';
import { AdminMaldivesPackageEditPage } from './admin/pages/packages/AdminMaldivesPackageEditPage';
import { AdminCarsListPage } from './admin/pages/cars/AdminCarsListPage';
import { AdminCarCreatePage } from './admin/pages/cars/AdminCarCreatePage';
import { AdminCarEditPage } from './admin/pages/cars/AdminCarEditPage';
import { AdminSriLankaGalleryListPage } from './admin/pages/sri-lanka-gallery/AdminSriLankaGalleryListPage';
import { AdminSriLankaGalleryEditPage } from './admin/pages/sri-lanka-gallery/AdminSriLankaGalleryEditPage';
import { AdminMaldivesGalleryListPage } from './admin/pages/maldives-gallery/AdminMaldivesGalleryListPage';
import { AdminMaldivesGalleryEditPage } from './admin/pages/maldives-gallery/AdminMaldivesGalleryEditPage';
import { AdminTestimonialsListPage } from './admin/pages/testimonials/AdminTestimonialsListPage';
import { AdminTestimonialCreatePage } from './admin/pages/testimonials/AdminTestimonialCreatePage';
import { AdminTestimonialEditPage } from './admin/pages/testimonials/AdminTestimonialEditPage';
import { AdminEnquiriesPage } from './admin/pages/enquiries/AdminEnquiriesPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/Opulent-Travels-Website-Design-Development">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sri-lanka" element={<SriLanka />} />
            <Route path="/maldives" element={<Maldives />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/rent-car" element={<RentCarPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/sri-lanka/package/:packageId" element={<SriLankaPackageDetail />} />
            <Route path="/maldives/package/:packageId" element={<MaldivesPackageDetail />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<AdminAuthGuard />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                {/* Redirect /admin/packages to /admin/packages/sri-lanka */}
                <Route path="/admin/packages" element={<Navigate to="/admin/packages/sri-lanka" replace />} />
                {/* Sri Lanka Package Routes */}
                <Route path="/admin/packages/sri-lanka" element={<AdminSriLankaPackagesListPage />} />
                <Route path="/admin/packages/sri-lanka/new" element={<AdminSriLankaPackageCreatePage />} />
                <Route path="/admin/packages/sri-lanka/:id/edit" element={<AdminSriLankaPackageEditPage />} />
                {/* Maldives Package Routes */}
                <Route path="/admin/packages/maldives" element={<AdminMaldivesPackagesListPage />} />
                <Route path="/admin/packages/maldives/new" element={<AdminMaldivesPackageCreatePage />} />
                <Route path="/admin/packages/maldives/:id/edit" element={<AdminMaldivesPackageEditPage />} />
                <Route path="/admin/cars" element={<AdminCarsListPage />} />
                <Route path="/admin/cars/new" element={<AdminCarCreatePage />} />
                <Route path="/admin/cars/:id/edit" element={<AdminCarEditPage />} />
                <Route path="/admin/sri-lanka-gallery" element={<AdminSriLankaGalleryListPage />} />
                <Route path="/admin/sri-lanka-gallery/:id/edit" element={<AdminSriLankaGalleryEditPage />} />
                <Route path="/admin/maldives-gallery" element={<AdminMaldivesGalleryListPage />} />
                <Route path="/admin/maldives-gallery/:id/edit" element={<AdminMaldivesGalleryEditPage />} />
                <Route path="/admin/testimonials" element={<AdminTestimonialsListPage />} />
                <Route path="/admin/testimonials/new" element={<AdminTestimonialCreatePage />} />
                <Route path="/admin/testimonials/:id/edit" element={<AdminTestimonialEditPage />} />
                <Route path="/admin/enquiries" element={<AdminEnquiriesPage />} />
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
