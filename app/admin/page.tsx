'use client';

import { useState, useEffect } from 'react';
import UserTable from '@/components/admin/UserTable';
import OrdersList from '@/components/admin/OrdersList';
import SubscriptionsSummary from '@/components/admin/SubscriptionsSummary';

interface DashboardData {
  currentAdmin: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
  stats: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalSubscriptions: number;
    activeSubscriptions: number;
    pausedSubscriptions: number;
    cancelledSubscriptions: number;
    monthlyRevenue: number;
    averageOrderValue: number;
  };
  users: Array<Record<string, unknown>>;
  orders: Array<Record<string, unknown>>;
  subscriptions: Array<Record<string, unknown>>;
  recentActivity: Array<Record<string, unknown>>;
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // TODO: Replace with actual API call to /api/admin/dashboard
        // const response = await fetch('/api/admin/dashboard', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        //   }
        // });
        
        const response = await fetch('/mock/admin-dashboard.json');
        if (!response.ok) {
          throw new Error('Failed to load dashboard data');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleUserStatusChange = (userId: string, newStatus: 'active' | 'inactive') => {
    if (!dashboardData) return;
    
    setDashboardData(prev => ({
      ...prev!,
      users: prev!.users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ),
      stats: {
        ...prev!.stats,
        activeUsers: newStatus === 'active' 
          ? prev!.stats.activeUsers + 1 
          : prev!.stats.activeUsers - 1,
        inactiveUsers: newStatus === 'inactive' 
          ? prev!.stats.inactiveUsers + 1 
          : prev!.stats.inactiveUsers - 1
      }
    }));
  };

  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    if (!dashboardData) return;
    
    setDashboardData(prev => ({
      ...prev!,
      orders: prev!.orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    }));
  };

  const handleSubscriptionStatusChange = (subscriptionId: string, newStatus: string) => {
    if (!dashboardData) return;
    
    setDashboardData(prev => ({
      ...prev!,
      subscriptions: prev!.subscriptions.map(subscription => 
        subscription.id === subscriptionId ? { ...subscription, status: newStatus } : subscription
      )
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00] mx-auto mb-4"></div>
          <p className="text-[#c89295]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Failed to load dashboard'}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#FF7A00] text-white px-4 py-2 rounded-lg hover:bg-[#E66A00] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">
            Dashboard Overview
          </h1>
          <p className="text-[#c89295]">
            Welcome back, {dashboardData.currentAdmin.name}. Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#c89295] text-sm">Total Users</p>
                <p className="text-white text-2xl font-bold">{dashboardData.stats.totalUsers}</p>
                <p className="text-green-400 text-xs mt-1">
                  {dashboardData.stats.activeUsers} active
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FF7A00]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF7A00]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#c89295] text-sm">Total Orders</p>
                <p className="text-white text-2xl font-bold">{dashboardData.stats.totalOrders}</p>
                <p className="text-yellow-400 text-xs mt-1">
                  {dashboardData.stats.pendingOrders} pending
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FF7A00]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF7A00]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM6 9a1 1 0 112 0v6a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#c89295] text-sm">Subscriptions</p>
                <p className="text-white text-2xl font-bold">{dashboardData.stats.totalSubscriptions}</p>
                <p className="text-green-400 text-xs mt-1">
                  {dashboardData.stats.activeSubscriptions} active
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FF7A00]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF7A00]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#c89295] text-sm">Monthly Revenue</p>
                <p className="text-white text-2xl font-bold">${dashboardData.stats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-[#c89295] text-xs mt-1">
                  Avg: ${dashboardData.stats.averageOrderValue}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#FF7A00]/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF7A00]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Users and Orders */}
          <div className="xl:col-span-2 space-y-6">
            <UserTable 
              users={dashboardData.users} 
              onUserStatusChange={handleUserStatusChange}
            />
            
            <OrdersList 
              orders={dashboardData.orders}
              onOrderStatusChange={handleOrderStatusChange}
            />
          </div>

          {/* Right Column - Subscriptions and Activity */}
          <div className="space-y-6">
            <SubscriptionsSummary 
              subscriptions={dashboardData.subscriptions}
              stats={dashboardData.stats}
              onSubscriptionStatusChange={handleSubscriptionStatusChange}
            />

            {/* Recent Activity */}
            <div className="bg-[#1E1E1E] rounded-xl border border-[#472426]">
              <div className="p-6 border-b border-[#472426]">
                <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'order' ? 'bg-[#FF7A00]' :
                        activity.type === 'subscription' ? 'bg-green-400' :
                        activity.type === 'user' ? 'bg-blue-400' : 'bg-gray-400'
                      }`} />
                      <div>
                        <p className="text-white text-sm">{activity.message}</p>
                        <p className="text-[#c89295] text-xs">
                          {new Date(activity.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}