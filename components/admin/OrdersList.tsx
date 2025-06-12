'use client';

import { useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  items: string[];
  paymentMethod: string;
  deliveryAddress: string;
}

interface OrdersListProps {
  orders: Order[];
  onOrderStatusChange?: (orderId: string, newStatus: string) => void;
}

export default function OrdersList({ orders, onOrderStatusChange }: OrdersListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'customer'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const itemsPerPage = 10;

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      if (statusFilter !== 'all' && order.status !== statusFilter) return false;
      if (searchTerm && !order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !order.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'total':
          aValue = a.total;
          bValue = b.total;
          break;
        case 'customer':
          aValue = a.customerName.toLowerCase();
          bValue = b.customerName.toLowerCase();
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    // TODO: Replace with actual API call
    // try {
    //   const response = await fetch('/api/admin/orders', {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       orderId,
    //       status: newStatus
    //     }),
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error('Failed to update order status');
    //   }
    // } catch (error) {
    //   console.error('Error updating order status:', error);
    //   return;
    // }

    // TODO: Send analytics event for order status change
    // analytics.track('admin_order_status_changed', {
    //   order_id: orderId,
    //   new_status: newStatus,
    //   admin_id: currentAdmin.id
    // });

    console.log(`Order ${orderId} status changed to ${newStatus}`);
    onOrderStatusChange?.(orderId, newStatus);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-[#1E1E1E] rounded-xl border border-[#472426]">
      {/* Header */}
      <div className="p-6 border-b border-[#472426]">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <h3 className="text-white text-lg font-semibold">Recent Orders</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 bg-[#121212] border border-[#472426] rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors"
            />
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-3 py-2 bg-[#121212] border border-[#472426] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as typeof sortBy);
                setSortOrder(order as typeof sortOrder);
              }}
              className="px-3 py-2 bg-[#121212] border border-[#472426] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="total-desc">Highest Amount</option>
              <option value="total-asc">Lowest Amount</option>
              <option value="customer-asc">Customer A-Z</option>
              <option value="customer-desc">Customer Z-A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-[#472426]">
        {paginatedOrders.map((order) => (
          <div key={order.id} className="p-6 hover:bg-[#472426]/20 transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-white font-medium">#{order.id}</h4>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#c89295]">Customer</p>
                    <p className="text-white">{order.customerName}</p>
                    <p className="text-[#c89295] text-xs">{order.customerEmail}</p>
                  </div>
                  
                  <div>
                    <p className="text-[#c89295]">Date</p>
                    <p className="text-white">{formatDate(order.date)}</p>
                  </div>
                  
                  <div>
                    <p className="text-[#c89295]">Items ({order.items.length})</p>
                    <p className="text-white text-xs">{order.items.join(', ')}</p>
                  </div>
                  
                  <div>
                    <p className="text-[#c89295]">Payment</p>
                    <p className="text-white">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Amount and Actions */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[#c89295] text-sm">Total</p>
                  <p className="text-[#FF7A00] text-xl font-bold">${order.total.toFixed(2)}</p>
                </div>
                
                {order.status !== 'completed' && order.status !== 'cancelled' && (
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="px-3 py-2 bg-[#121212] border border-[#472426] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-6 border-t border-[#472426]">
          <div className="flex items-center justify-between">
            <p className="text-[#c89295] text-sm">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
            </p>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 bg-[#472426] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a2d30] transition-colors"
              >
                Previous
              </button>
              
              <span className="text-white px-3 py-2">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 bg-[#472426] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a2d30] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredOrders.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-[#c89295]">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}