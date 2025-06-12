'use client';

import { useState } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface HeaderProps {
  sidebarCollapsed: boolean;
  currentAdmin: AdminUser;
}

export default function Header({ sidebarCollapsed, currentAdmin }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      // TODO: Send analytics event for admin search
      // analytics.track('admin_search', {
      //   query: searchQuery,
      //   admin_id: currentAdmin.id
      // });
      console.log('Searching for:', searchQuery);
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    // TODO: Send audit log for admin logout
    // auditLog.record('admin_logout', {
    //   admin_id: currentAdmin.id,
    //   timestamp: new Date().toISOString()
    // });
    console.log('Admin logout');
    alert('Logout functionality not implemented yet');
  };

  return (
    <header className={`fixed top-0 right-0 h-16 bg-[#1E1E1E] border-b border-[#472426] z-30 transition-all duration-300 ${
      sidebarCollapsed ? 'left-16' : 'left-64'
    }`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex items-center flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, orders, subscriptions..."
              className="w-full px-4 py-2 pl-10 pr-4 bg-[#121212] border border-[#472426] rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] transition-colors"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c89295] hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#c89295] hover:text-white hover:bg-[#472426] rounded-lg transition-colors relative"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 bg-[#FF7A00] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#1E1E1E] border border-[#472426] rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-[#472426]">
                  <h3 className="text-white font-semibold">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4 hover:bg-[#472426] transition-colors">
                    <p className="text-white text-sm">New order #order-002 received</p>
                    <p className="text-[#c89295] text-xs mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-[#472426] transition-colors">
                    <p className="text-white text-sm">User registration spike detected</p>
                    <p className="text-[#c89295] text-xs mt-1">15 minutes ago</p>
                  </div>
                  <div className="p-4 hover:bg-[#472426] transition-colors">
                    <p className="text-white text-sm">Monthly revenue target reached</p>
                    <p className="text-[#c89295] text-xs mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="p-4 border-t border-[#472426]">
                  <button className="text-[#FF7A00] text-sm hover:text-[#E66A00] transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-2 hover:bg-[#472426] rounded-lg transition-colors"
              aria-label="Admin profile menu"
            >
              <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {currentAdmin.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-white text-sm font-medium">{currentAdmin.name}</p>
                <p className="text-[#c89295] text-xs capitalize">{currentAdmin.role.replace('_', ' ')}</p>
              </div>
              <svg className="w-4 h-4 text-[#c89295]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1E1E1E] border border-[#472426] rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-[#472426]">
                  <p className="text-white font-medium">{currentAdmin.name}</p>
                  <p className="text-[#c89295] text-sm">{currentAdmin.email}</p>
                  <p className="text-[#FF7A00] text-xs mt-1 capitalize">{currentAdmin.role.replace('_', ' ')}</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-white hover:bg-[#472426] transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-white hover:bg-[#472426] transition-colors">
                    Account Preferences
                  </button>
                  <hr className="my-2 border-[#472426]" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-[#472426] transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}