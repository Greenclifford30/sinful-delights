'use client';

import { useState } from 'react';

interface Subscription {
  id: string;
  planName: string;
  customerName: string;
  customerEmail: string;
  status: 'active' | 'paused' | 'cancelled';
  startDate: string;
  nextBilling: string | null;
  price: number;
  mealsPerWeek: number;
}

interface SubscriptionsSummaryProps {
  subscriptions: Subscription[];
  stats: {
    totalSubscriptions: number;
    activeSubscriptions: number;
    pausedSubscriptions: number;
    cancelledSubscriptions: number;
    monthlyRevenue: number;
  };
  onSubscriptionStatusChange?: (subscriptionId: string, newStatus: string) => void;
}

// Simple chart components (since we're avoiding external dependencies)
function DonutChart({ data }: { data: Array<{ label: string; value: number; color: string }> }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const strokeDasharray = `${percentage} ${100 - percentage}`;
          const strokeDashoffset = data.slice(0, index).reduce((acc, prev) => acc + (prev.value / total) * 100, 0);
          
          return (
            <circle
              key={index}
              cx="50"
              cy="50"
              r="15"
              fill="transparent"
              stroke={item.color}
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={-strokeDashoffset}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl font-bold">{total}</p>
          <p className="text-[#c89295] text-xs">Total</p>
        </div>
      </div>
    </div>
  );
}

function BarChart({ data }: { data: Array<{ label: string; value: number; color: string }> }) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-16 text-right">
            <span className="text-white text-sm">{item.label}</span>
          </div>
          <div className="flex-1 bg-[#121212] rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color
              }}
            />
            <div className="absolute inset-0 flex items-center justify-end pr-2">
              <span className="text-white text-xs font-medium">{item.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SubscriptionsSummary({ subscriptions, stats, onSubscriptionStatusChange }: SubscriptionsSummaryProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'plans' | 'recent'>('overview');

  const statusData = [
    { label: 'Active', value: stats.activeSubscriptions, color: '#10B981' },
    { label: 'Paused', value: stats.pausedSubscriptions, color: '#F59E0B' },
    { label: 'Cancelled', value: stats.cancelledSubscriptions, color: '#EF4444' }
  ];

  const planData = subscriptions.reduce((acc, sub) => {
    const existing = acc.find(item => item.label === sub.planName);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ label: sub.planName, value: 1, color: getRandomColor() });
    }
    return acc;
  }, [] as Array<{ label: string; value: number; color: string }>);

  function getRandomColor() {
    const colors = ['#FF7A00', '#8B0000', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const handleStatusChange = async (subscriptionId: string, newStatus: string) => {
    // TODO: Replace with actual API call
    // try {
    //   const response = await fetch('/api/admin/subscriptions', {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       subscriptionId,
    //       status: newStatus
    //     }),
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error('Failed to update subscription status');
    //   }
    // } catch (error) {
    //   console.error('Error updating subscription status:', error);
    //   return;
    // }

    // TODO: Send analytics event for subscription status change
    // analytics.track('admin_subscription_status_changed', {
    //   subscription_id: subscriptionId,
    //   new_status: newStatus,
    //   admin_id: currentAdmin.id
    // });

    console.log(`Subscription ${subscriptionId} status changed to ${newStatus}`);
    onSubscriptionStatusChange?.(subscriptionId, newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const recentSubscriptions = subscriptions
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 5);

  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-[#472426]">
      {/* Header */}
      <div className="p-6 border-b border-[#472426]">
        <h3 className="text-white text-lg font-semibold mb-4">Subscriptions Overview</h3>
        
        {/* Tabs */}
        <div className="flex gap-1 bg-[#121212] rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'plans', label: 'Plans' },
            { id: 'recent', label: 'Recent' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
              className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTab === tab.id
                  ? 'bg-[#FF7A00] text-white'
                  : 'text-[#c89295] hover:text-white hover:bg-[#472426]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stats Cards */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#121212] rounded-lg p-4 border border-[#472426]">
                  <p className="text-[#c89295] text-sm">Total Subscriptions</p>
                  <p className="text-white text-2xl font-bold">{stats.totalSubscriptions}</p>
                </div>
                <div className="bg-[#121212] rounded-lg p-4 border border-[#472426]">
                  <p className="text-[#c89295] text-sm">Monthly Revenue</p>
                  <p className="text-[#FF7A00] text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>
              
              {/* Status Breakdown */}
              <div className="bg-[#121212] rounded-lg p-4 border border-[#472426]">
                <h4 className="text-white font-medium mb-3">Status Breakdown</h4>
                <BarChart data={statusData} />
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-[#121212] rounded-lg p-6 border border-[#472426]">
              <h4 className="text-white font-medium mb-4 text-center">Subscription Status</h4>
              <DonutChart data={statusData} />
              <div className="mt-4 space-y-2">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[#c89295] text-sm">{item.label}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#121212] rounded-lg p-4 border border-[#472426]">
              <h4 className="text-white font-medium mb-3">Subscriptions by Plan</h4>
              <BarChart data={planData} />
            </div>
            
            <div className="space-y-3">
              {planData.map((plan, index) => (
                <div key={index} className="bg-[#121212] rounded-lg p-4 border border-[#472426]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-white font-medium">{plan.label}</h5>
                      <p className="text-[#c89295] text-sm">{plan.value} subscribers</p>
                    </div>
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: plan.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'recent' && (
          <div className="space-y-4">
            {recentSubscriptions.map((subscription) => (
              <div key={subscription.id} className="bg-[#121212] rounded-lg p-4 border border-[#472426]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="text-white font-medium">{subscription.planName}</h5>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                        {subscription.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-[#c89295]">Customer: <span className="text-white">{subscription.customerName}</span></p>
                      </div>
                      <div>
                        <p className="text-[#c89295]">Started: <span className="text-white">{formatDate(subscription.startDate)}</span></p>
                      </div>
                      <div>
                        <p className="text-[#c89295]">Price: <span className="text-[#FF7A00] font-medium">${subscription.price}/week</span></p>
                      </div>
                      <div>
                        <p className="text-[#c89295]">Next Billing: <span className="text-white">{formatDate(subscription.nextBilling)}</span></p>
                      </div>
                    </div>
                  </div>
                  
                  {subscription.status !== 'cancelled' && (
                    <select
                      value={subscription.status}
                      onChange={(e) => handleStatusChange(subscription.id, e.target.value)}
                      className="px-3 py-2 bg-[#1E1E1E] border border-[#472426] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors"
                    >
                      <option value="active">Active</option>
                      <option value="paused">Paused</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}