import { LogOut, Menu, User, ChevronRight, Home } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { Button } from '@/components/ui/button';

interface AdminTopBarProps {
  onMenuClick: () => void;
}

interface Crumb {
  label: string;
  href?: string;
}

function useBreadcrumbs(): Crumb[] {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);
  // segments[0] is always 'admin'

  const crumbs: Crumb[] = [{ label: 'Dashboard', href: '/admin/dashboard' }];

  if (segments.length <= 1 || (segments.length === 2 && segments[1] === 'dashboard')) {
    // just dashboard
    return [{ label: 'Dashboard' }];
  }

  const section = segments[1]; // e.g. 'cars', 'packages'
  const action = segments[2];  // e.g. 'new', ':id'
  const subAction = segments[3]; // e.g. 'edit'

  const sectionLabels: Record<string, string> = {
    cars: 'Rent Cars',
    packages: 'Packages',
  };

  const sectionLabel = sectionLabels[section] ?? capitalize(section);

  if (!action) {
    // e.g. /admin/cars
    crumbs.push({ label: sectionLabel });
  } else if (action === 'new') {
    // e.g. /admin/cars/new
    crumbs.push({ label: sectionLabel, href: `/admin/${section}` });
    crumbs.push({ label: 'Add New' });
  } else if (subAction === 'edit') {
    // e.g. /admin/cars/:id/edit
    crumbs.push({ label: sectionLabel, href: `/admin/${section}` });
    crumbs.push({ label: 'Edit' });
  } else {
    crumbs.push({ label: sectionLabel });
  }

  return crumbs;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
  const navigate = useNavigate();
  const crumbs = useBreadcrumbs();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
          <Link
            to="/admin/dashboard"
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            aria-label="Home"
          >
            <Home size={14} />
          </Link>

          {crumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1">
              <ChevronRight size={13} className="text-gray-300 dark:text-gray-600" />
              {crumb.href ? (
                <Link
                  to={crumb.href}
                  className="font-montserrat text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-montserrat font-semibold text-gray-800 dark:text-gray-100">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: user + logout */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <User size={16} />
          <span className="font-montserrat hidden sm:inline">{user?.name ?? 'Admin'}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2 font-montserrat text-xs"
        >
          <LogOut size={14} />
          Logout
        </Button>
      </div>
    </header>
  );
}