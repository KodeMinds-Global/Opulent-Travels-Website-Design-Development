import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package2, Car, X } from 'lucide-react';

interface AdminSidebarProps {
  onClose?: () => void;
}

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/packages', icon: Package2, label: 'Packages' },
  { to: '/admin/cars', icon: Car, label: 'Rent Cars' },
];

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  return (
    <aside className="flex flex-col h-full bg-[#1E3A8A] text-white w-64">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <span className="font-playfair font-bold text-xl" style={{ color: '#FFD700' }}>
          Opulnet Travels
        </span>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>
      {/* Admin badge */}
      <div className="px-6 py-2">
        <span className="text-xs font-montserrat text-white/50 uppercase tracking-widest">Admin Panel</span>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-montserrat text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-xs text-white/30 font-lora">© 2025 Opulnet Travels</p>
      </div>
    </aside>
  );
}