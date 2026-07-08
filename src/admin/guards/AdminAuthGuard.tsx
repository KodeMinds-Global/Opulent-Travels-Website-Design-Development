import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/auth.service';

export function AdminAuthGuard() {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}