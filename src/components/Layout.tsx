import { Outlet, NavLink } from 'react-router-dom';
import { Home, BookOpen, FileText, Bell, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { user, userProfile } = useAuth();
  const [unreadCount, setUnreadCount] = useState(3); // Placeholder

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/pyqs', icon: BookOpen, label: 'PYQs' },
    { path: '/notes', icon: FileText, label: 'Smart Notes' },
    { path: '/announcements', icon: Bell, label: 'Announcements' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-dark to-accent-dark dark:from-primary-light dark:to-accent-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-dark to-accent-dark dark:from-primary-light dark:to-accent-light bg-clip-text text-transparent">
                UniOne
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-accent-dark" />
                ) : (
                  <Moon className="w-5 h-5 text-primary-dark" />
                )}
              </button>
              <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                {userProfile?.name || user?.email || 'Guest'}
              </div>
              {!user && (
                <NavLink
                  to="/login"
                  className="text-sm text-primary-dark dark:text-primary-light hover:underline px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-700 sm:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const showBadge = item.path === '/announcements' && unreadCount > 0;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center flex-1 h-full relative ${
                    isActive
                      ? 'text-primary-dark dark:text-primary-light'
                      : 'text-gray-600 dark:text-gray-400'
                  }`
                }
              >
                {showBadge && (
                  <span className="absolute top-2 right-1/4 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Sidebar (Desktop) */}
      <div className="hidden sm:flex">
        <aside className="w-64 min-h-screen bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700 sticky top-16">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const showBadge = item.path === '/announcements' && unreadCount > 0;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors relative ${
                      isActive
                        ? 'bg-primary-dark dark:bg-primary-light text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {showBadge && (
                    <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Main Content */}
      <main className="sm:hidden pb-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

