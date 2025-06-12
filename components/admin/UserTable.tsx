'use client';

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
  lastLogin: string;
  orderCount: number;
  totalSpent: number;
  subscription: string | null;
}

interface UserTableProps {
  users: User[];
  onUserStatusChange: (userId: string, newStatus: 'active' | 'inactive') => void;
}

export default function UserTable({ users, onUserStatusChange }: UserTableProps) {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'totalSpent'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort users
  useState(() => {
    let filtered = users;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'joinDate') {
        aValue = new Date(a.joinDate).getTime();
        bValue = new Date(b.joinDate).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredUsers(filtered);
  }, [users, statusFilter, searchTerm, sortBy, sortOrder]);

  const handleToggleUserStatus = async (userId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    // TODO: Replace with actual API call
    // try {
    //   const response = await fetch('/api/admin/user-status', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       userId,
    //       status: newStatus
    //     }),
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error('Failed to update user status');
    //   }
    // } catch (error) {
    //   console.error('Error updating user status:', error);
    //   return;
    // }

    // TODO: Send analytics event for user status change
    // analytics.track('admin_user_status_changed', {
    //   user_id: userId,
    //   old_status: currentStatus,
    //   new_status: newStatus,
    //   admin_id: currentAdmin.id
    // });

    // TODO: Add audit log entry
    // auditLog.record('user_status_changed', {
    //   user_id: userId,
    //   old_status: currentStatus,
    //   new_status: newStatus,
    //   admin_id: currentAdmin.id,
    //   timestamp: new Date().toISOString()
    // });

    console.log(`User ${userId} status changed from ${currentStatus} to ${newStatus}`);
    onUserStatusChange(userId, newStatus);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return formatDate(dateString);
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-[#472426]">
      {/* Table Header */}
      <div className="p-6 border-b border-[#472426]">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h3 className="text-white text-lg font-semibold">User Management</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 bg-[#121212] border border-[#472426] rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] transition-colors"
            />
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-3 py-2 bg-[#121212] border border-[#472426] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] transition-colors"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'name' | 'joinDate' | 'totalSpent');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="px-3 py-2 bg-[#121212] border border-[#472426] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] transition-colors"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="joinDate-desc">Newest First</option>
              <option value="joinDate-asc">Oldest First</option>
              <option value="totalSpent-desc">Highest Spender</option>
              <option value="totalSpent-asc">Lowest Spender</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#472426]">
              <th className="text-left p-4 text-[#c89295] font-medium">User</th>
              <th className="text-left p-4 text-[#c89295] font-medium">Status</th>
              <th className="text-left p-4 text-[#c89295] font-medium">Joined</th>
              <th className="text-left p-4 text-[#c89295] font-medium">Last Login</th>
              <th className="text-left p-4 text-[#c89295] font-medium">Orders</th>
              <th className="text-left p-4 text-[#c89295] font-medium">Total Spent</th>
              <th className="text-left p-4 text-[#c89295] font-medium">Subscription</th>
              <th className="text-left p-4 text-[#c89295] font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-[#472426] hover:bg-[#472426]/20 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-[#c89295] text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-white">{formatDate(user.joinDate)}</span>
                </td>
                <td className="p-4">
                  <span className="text-[#c89295]">{formatLastLogin(user.lastLogin)}</span>
                </td>
                <td className="p-4">
                  <span className="text-white">{user.orderCount}</span>
                </td>
                <td className="p-4">
                  <span className="text-[#FF7A00] font-medium">${user.totalSpent.toFixed(2)}</span>
                </td>
                <td className="p-4">
                  {user.subscription ? (
                    <span className="text-white text-sm">{user.subscription}</span>
                  ) : (
                    <span className="text-[#c89295] text-sm">None</span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggleUserStatus(user.id, user.status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      user.status === 'active'
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    }`}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-[#c89295]">No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}