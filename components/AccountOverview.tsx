'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';

interface AccountOverviewProps {
  onEditProfile?: () => void;
  onManageSubscription?: () => void;
}

export default function AccountOverview({ onEditProfile, onManageSubscription }: AccountOverviewProps) {
  const { user, isLoading, error } = useUser();
  const [showFullAddress, setShowFullAddress] = useState(false);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-[#1E1E1E] rounded-full"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-[#1E1E1E] rounded w-1/3"></div>
            <div className="h-4 bg-[#1E1E1E] rounded w-1/2"></div>
            <div className="h-4 bg-[#1E1E1E] rounded w-1/4"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1E1E1E] rounded-xl p-6 space-y-4">
            <div className="h-4 bg-[#121212] rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-[#121212] rounded w-full"></div>
              <div className="h-3 bg-[#121212] rounded w-3/4"></div>
            </div>
          </div>
          <div className="bg-[#1E1E1E] rounded-xl p-6 space-y-4">
            <div className="h-4 bg-[#121212] rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-[#121212] rounded w-full"></div>
              <div className="h-3 bg-[#121212] rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg mb-4">{error || 'Failed to load account information'}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#FF7A00] text-white px-6 py-3 rounded-lg hover:bg-[#E66A00] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSubscriptionStatusColor = (status: string) => {
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

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-[#472426] rounded-full flex items-center justify-center overflow-hidden border-2 border-[#FF7A00]">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-[#c89295] text-lg mb-1">{user.email}</p>
            <p className="text-[#c89295]">Member since {formatDate(user.memberSince)}</p>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={onEditProfile}
                className="flex items-center gap-2 bg-[#FF7A00] text-white px-4 py-2 rounded-lg hover:bg-[#E66A00] transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
              
              <div className="flex items-center gap-2 text-[#c89295] text-sm">
                <svg className="w-4 h-4 text-[#FF7A00]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{user.loyaltyPoints.toLocaleString()} Loyalty Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#472426] text-center">
          <p className="text-[#FF7A00] text-2xl font-bold">{user.statistics.totalOrders}</p>
          <p className="text-[#c89295] text-sm">Total Orders</p>
        </div>
        <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#472426] text-center">
          <p className="text-[#FF7A00] text-2xl font-bold">${user.statistics.totalSpent.toLocaleString()}</p>
          <p className="text-[#c89295] text-sm">Total Spent</p>
        </div>
        <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#472426] text-center">
          <p className="text-[#FF7A00] text-2xl font-bold">{user.statistics.averageRating}</p>
          <p className="text-[#c89295] text-sm">Avg Rating</p>
        </div>
        <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#472426] text-center">
          <p className="text-[#FF7A00] text-2xl font-bold">{user.loyaltyPoints}</p>
          <p className="text-[#c89295] text-sm">Points</p>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Information */}
        <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Current Subscription</h3>
            <button
              onClick={onManageSubscription}
              className="text-[#FF7A00] text-sm font-medium hover:text-[#E66A00] transition-colors"
            >
              Manage
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{user.subscriptionPlan.name}</h4>
                <p className="text-[#c89295] text-sm">{user.subscriptionPlan.mealsPerWeek} meals per week</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getSubscriptionStatusColor(user.subscriptionPlan.status)}`}>
                {user.subscriptionPlan.status}
              </span>
            </div>

            <div className="border-t border-[#472426] pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#c89295]">Price:</span>
                <span className="text-white">${user.subscriptionPlan.price}/week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#c89295]">Next billing:</span>
                <span className="text-white">{formatDate(user.subscriptionPlan.nextBilling)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#c89295]">Started:</span>
                <span className="text-white">{formatDate(user.subscriptionPlan.startDate)}</span>
              </div>
            </div>

            <div className="border-t border-[#472426] pt-4">
              <p className="text-[#c89295] text-sm mb-2">Plan Features:</p>
              <ul className="space-y-1">
                {user.subscriptionPlan.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#c89295]">{feature}</span>
                  </li>
                ))}
                {user.subscriptionPlan.features.length > 3 && (
                  <li className="text-[#FF7A00] text-sm">
                    +{user.subscriptionPlan.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-semibold">Contact Information</h3>
            <button
              onClick={onEditProfile}
              className="text-[#FF7A00] text-sm font-medium hover:text-[#E66A00] transition-colors"
            >
              Edit
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[#c89295] text-sm mb-1">Email</p>
              <p className="text-white">{user.email}</p>
            </div>

            <div>
              <p className="text-[#c89295] text-sm mb-1">Phone</p>
              <p className="text-white">{user.phone}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[#c89295] text-sm">Delivery Address</p>
                <button
                  onClick={() => setShowFullAddress(!showFullAddress)}
                  className="text-[#FF7A00] text-xs hover:text-[#E66A00] transition-colors"
                >
                  {showFullAddress ? 'Show Less' : 'Show Full'}
                </button>
              </div>
              <div className="text-white">
                <p>{user.address.street}</p>
                {showFullAddress && (
                  <>
                    <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                    <p>{user.address.country}</p>
                  </>
                )}
                {!showFullAddress && (
                  <p>{user.address.city}, {user.address.state}</p>
                )}
              </div>
            </div>

            <div>
              <p className="text-[#c89295] text-sm mb-1">Referral Code</p>
              <div className="flex items-center gap-2">
                <code className="bg-[#121212] px-3 py-1 rounded text-[#FF7A00] font-mono text-sm border border-[#472426]">
                  {user.referralCode}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(user.referralCode)}
                  className="text-[#c89295] hover:text-white transition-colors"
                  title="Copy referral code"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Items */}
      <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
        <h3 className="text-white text-lg font-semibold mb-4">Your Favorite <span className="text-[#8B0000]">Sinful</span> Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {user.statistics.favoriteItems.map((item, index) => (
            <div key={index} className="bg-[#121212] rounded-lg p-4 border border-[#472426]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  #{index + 1}
                </div>
                <span className="text-white font-medium">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}