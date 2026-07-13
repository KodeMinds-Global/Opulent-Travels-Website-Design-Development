import { LogOut, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { Button } from '@/components/ui/button';

interface AdminTopBarProps {
  onMenuClick: () => void;
}

export function AdminTopBar({ onMenuClick }: AdminTopBarProps) {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
      >
        <Menu size={20} />
      </button>
      <div className="flex-1" />
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