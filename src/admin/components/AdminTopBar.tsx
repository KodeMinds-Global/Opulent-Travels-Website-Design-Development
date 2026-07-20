import { LogOut, Menu, User, ChevronRight, Home, Sun, Moon } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { Button } from '@/components/ui/button';

interface AdminTopBarProps {
  onMenuClick: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

interface Crumb {
  label: string;
  href?: string;
}

function useBreadcrumbs(): Crumb[] {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length <= 1 || (segments.length === 2 && segments[1] === 'dashboard')) {
    return [{ label: 'Dashboard' }];
  }

  const section = segments[1];
  const action = segments[2];
  const subAction = segments[3];

  const sectionLabels: Record<string, string> = {
    cars: 'Rent Cars',
    packages: 'Packages',
  };

  const sectionLabel = sectionLabels[section] ?? (section.charAt(0).toUpperCase() + section.slice(1));
  const crumbs: Crumb[] = [{ label: 'Dashboard', href: '/admin/dashboard' }];

  if (!action) {
    crumbs.push({ label: sectionLabel });
  } else if (action === 'new') {
    crumbs.push({ label: sectionLabel, href: `/admin/${section}` });
    crumbs.push({ label: 'Add New' });
  } else if (subAction === 'edit') {
    crumbs.push({ label: sectionLabel, href: `/admin/${section}` });
    crumbs.push({ label: 'Edit' });
  } else {
    crumbs.push({ label: sectionLabel });
  }

  return crumbs;
}

export function AdminTopBar({ onMenuClick, isDark, onToggleDark }: AdminTopBarProps) {
  const navigate = useNavigate();
  const crumbs = useBreadcrumbs();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const bg = isDark ? '#0F1E3D' : '#FFFFFF';
  const border = isDark ? '#1E3A6B' : '#DBEAFE';
  const shadow = isDark
    ? '0 1px 4px rgba(0,0,0,0.4)'
    : '0 1px 4px rgba(27,58,107,0.08)';
  const textMuted = isDark ? 'rgba(147,197,253,0.7)' : '#64748B';
  const textStrong = isDark ? '#E2E8F0' : '#1E293B';
  const chevronColor = isDark ? '#2D5FA0' : '#BFDBFE';
  const homeColor = '#60A5FA';

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-14 px-5"
      style={{ background: bg, borderBottom: `1px solid ${border}`, boxShadow: shadow }}
    >
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md transition-colors"
          style={{ color: textMuted }}
        >
          <Menu size={20} />
        </button>

        <nav className="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
          <Link to="/admin/dashboard" className="transition-opacity hover:opacity-70" aria-label="Home">
            <Home size={14} style={{ color: homeColor }} />
          </Link>

          {crumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1">
              <ChevronRight size={12} style={{ color: chevronColor }} />
              {crumb.href ? (
                <Link
                  to={crumb.href}
                  className="hidden sm:inline font-montserrat transition-colors hover:underline"
                  style={{ color: textMuted, fontSize: '0.78rem' }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="font-montserrat font-semibold"
                  style={{ color: textStrong, fontSize: '0.78rem' }}
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: dark toggle + user + logout */}
      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{
            background: isDark ? 'rgba(59,130,246,0.15)' : '#EFF6FF',
            color: isDark ? '#93C5FD' : '#2563EB',
            border: `1px solid ${isDark ? 'rgba(59,130,246,0.3)' : '#BFDBFE'}`,
          }}
          aria-label="Toggle dark mode"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Divider */}
        <div className="w-px h-5 mx-1" style={{ background: isDark ? '#1E3A6B' : '#DBEAFE' }} />

        {/* User */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1B3A6B, #2563EB)' }}
          >
            <User size={13} className="text-white" />
          </div>
          <span
            className="font-montserrat hidden sm:inline text-xs font-medium"
            style={{ color: textMuted }}
          >
            {user?.name ?? 'Admin'}
          </span>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-1.5 font-montserrat text-xs px-3"
          style={{ color: isDark ? '#93C5FD' : '#3B82F6' }}
        >
          <LogOut size={13} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}