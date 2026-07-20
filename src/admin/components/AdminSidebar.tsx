import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package2, Car, Images, X } from 'lucide-react';

interface AdminSidebarProps {
  onClose?: () => void;
  isDark?: boolean;
}

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/packages', icon: Package2, label: 'Packages' },
  { to: '/admin/sri-lanka-gallery', icon: Images, label: 'Sri Lanka Gallery' },
  { to: '/admin/cars', icon: Car, label: 'Rent Cars' },
];

export function AdminSidebar({ onClose, isDark }: AdminSidebarProps) {
  const sideBg = isDark
    ? 'linear-gradient(180deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)'
    : 'linear-gradient(180deg, #1B3A6B 0%, #1E4D8C 60%, #1B3A6B 100%)';

  return (
    <aside
      className="flex flex-col h-full w-64"
      style={{ background: sideBg }}
    >
      {/* Logo area */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div>
          <p
            className="font-playfair font-bold text-base leading-tight"
            style={{ color: '#FFFFFF' }}
          >
            Opulnet Travels
          </p>
          <p
            className="font-montserrat text-[10px] tracking-widest uppercase mt-0.5"
            style={{ color: 'rgba(147,197,253,0.7)' }}
          >
            Admin Panel
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg font-montserrat text-sm transition-all duration-200 ${
                isActive
                  ? 'text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'rgba(59,130,246,0.25)',
                    borderLeft: '3px solid #60A5FA',
                    paddingLeft: '13px',
                  }
                : {
                    borderLeft: '3px solid transparent',
                    paddingLeft: '13px',
                  }
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p
          className="text-xs font-lora"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          © 2025 Opulnet Travels
        </p>
      </div>
    </aside>
  );
}