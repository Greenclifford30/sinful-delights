'use client';

import { useState, useEffect, ReactNode } from 'react';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

interface AdminLayoutProps {
  children: ReactNode;
  currentAdmin?: AdminUser;
}

const defaultAdmin: AdminUser = {
  id: 'admin-001',
  name: 'Sarah Mitchell',
  email: 'sarah@sinfuldelights.com',
  role: 'super_admin',
  permissions: ['users', 'orders', 'subscriptions', 'analytics', 'settings']
};

export default function AdminLayout({ children, currentAdmin = defaultAdmin }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      // This would handle closing any open dropdowns
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // TODO: Implement role-based access control
  // const hasPermission = (permission: string) => {
  //   return currentAdmin.permissions.includes(permission);
  // };

  // TODO: Implement authentication check
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await fetch('/api/admin/auth/verify');
  //       if (!response.ok) {
  //         // Redirect to login
  //         window.location.href = '/admin/login';
  //       }
  //     } catch (error) {
  //       console.error('Auth check failed:', error);
  //       window.location.href = '/admin/login';
  //     }
  //   };
  //   
  //   checkAuth();
  // }, []);

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Header */}
      <Header 
        sidebarCollapsed={sidebarCollapsed} 
        currentAdmin={currentAdmin} 
      />
      
      {/* Main Content */}
      <main className={`transition-all duration-300 pt-16 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
}