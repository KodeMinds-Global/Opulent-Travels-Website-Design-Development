import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package2, Car, Images, ChevronDown, ChevronRight, X } from 'lucide-react';

interface AdminSidebarProps {
  onClose?: () => void;
  isDark?: boolean;
}

export function AdminSidebar({ onClose, isDark }: AdminSidebarProps) {
  const location = useLocation();
  const isGalleryActive =
    location.pathname.startsWith('/admin/sri-lanka-gallery') ||
    location.pathname.startsWith('/admin/maldives-gallery');

  const [galleryOpen, setGalleryOpen] = useState(isGalleryActive);

  const sideBg = isDark
    ? 'linear-gradient(180deg, #0A1628 0%, #0F2040 60%, #0A1628 100%)'
    : 'linear-gradient(180deg, #1B3A6B 0%, #1E4D8C 60%, #1B3A6B 100%)';

  const navLinkClass = (isActive: boolean) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg font-montserrat text-sm transition-all duration-200 ${
      isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
    }`;

  const navLinkStyle = (isActive: boolean): React.CSSProperties =>
    isActive
      ? { background: 'rgba(59,130,246,0.25)', borderLeft: '3px solid #60A5FA', paddingLeft: '13px' }
      : { borderLeft: '3px solid transparent', paddingLeft: '13px' };

  const subLinkClass = (isActive: boolean) =>
    `flex items-center gap-2 pl-10 pr-4 py-2 rounded-lg font-montserrat text-xs transition-all duration-200 ${
      isActive ? 'text-white font-semibold' : 'text-white/50 hover:text-white'
    }`;

  const subLinkStyle = (isActive: boolean): React.CSSProperties =>
    isActive
      ? { background: 'rgba(59,130,246,0.18)', borderLeft: '2px solid #60A5FA', paddingLeft: '38px' }
      : { borderLeft: '2px solid transparent', paddingLeft: '38px' };

  return (
    <aside className="flex flex-col h-full w-64" style={{ background: sideBg }}>
      {/* Logo area */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div>
          <p className="font-playfair font-bold text-base leading-tight" style={{ color: '#FFFFFF' }}>
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
          <button onClick={onClose} className="md:hidden text-white/50 hover:text-white transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => navLinkClass(isActive)}
          style={({ isActive }) => navLinkStyle(isActive)}
        >
          <LayoutDashboard size={17} />
          Dashboard
        </NavLink>

        {/* Packages */}
        <NavLink
          to="/admin/packages"
          className={({ isActive }) => navLinkClass(isActive)}
          style={({ isActive }) => navLinkStyle(isActive)}
        >
          <Package2 size={17} />
          Packages
        </NavLink>

        {/* Gallery (collapsible) */}
        <div>
          <button
            onClick={() => setGalleryOpen(prev => !prev)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-montserrat text-sm transition-all duration-200 ${
              isGalleryActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white'
            }`}
            style={{
              background: isGalleryActive ? 'rgba(59,130,246,0.15)' : 'transparent',
              borderLeft: isGalleryActive ? '3px solid #60A5FA' : '3px solid transparent',
              paddingLeft: '13px',
            }}
          >
            <Images size={17} />
            <span className="flex-1 text-left">Gallery</span>
            {galleryOpen
              ? <ChevronDown size={14} className="opacity-60" />
              : <ChevronRight size={14} className="opacity-60" />}
          </button>

          {galleryOpen && (
            <div className="mt-0.5 space-y-0.5">
              <NavLink
                to="/admin/sri-lanka-gallery"
                className={({ isActive }) => subLinkClass(isActive)}
                style={({ isActive }) => subLinkStyle(isActive)}
              >
                Sri Lanka
              </NavLink>
              <NavLink
                to="/admin/maldives-gallery"
                className={({ isActive }) => subLinkClass(isActive)}
                style={({ isActive }) => subLinkStyle(isActive)}
              >
                Maldives
              </NavLink>
            </div>
          )}
        </div>

        {/* Rent Cars */}
        <NavLink
          to="/admin/cars"
          className={({ isActive }) => navLinkClass(isActive)}
          style={({ isActive }) => navLinkStyle(isActive)}
        >
          <Car size={17} />
          Rent Cars
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-5 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-xs font-lora" style={{ color: 'rgba(255,255,255,0.25)' }}>
          © 2025 Opulnet Travels
        </p>
      </div>
    </aside>
  );
}
