import { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';

export const AdminThemeContext = createContext<{ isDark: boolean }>({ isDark: false });
export function useAdminTheme() { return useContext(AdminThemeContext); }

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <AdminThemeContext.Provider value={{ isDark }}>
      <div
        className={`flex h-screen overflow-hidden ${isDark ? 'dark' : ''}`}
        style={{ background: isDark ? '#0D1B2E' : '#EEF2F7' }}
      >
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed inset-y-0 left-0 z-50 md:static md:z-auto transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <AdminSidebar onClose={() => setSidebarOpen(false)} isDark={isDark} />
        </div>

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminTopBar
            onMenuClick={() => setSidebarOpen(true)}
            isDark={isDark}
            onToggleDark={() => setIsDark((d) => !d)}
          />
          {/* responsive padding: tight on mobile, comfortable on desktop */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminThemeContext.Provider>
  );
}