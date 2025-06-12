'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import AccountOverview from '@/components/AccountOverview';
import EditProfileForm from '@/components/EditProfileForm';
import Image from 'next/image';

type ActiveTab = 'overview' | 'profile' | 'deliveries' | 'orders' | 'preferences' | 'settings';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading, error } = useUser();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // TODO: Implement proper authentication check with redirect
  useEffect(() => {
    // if (!isLoading && !isLoggedIn) {
    //   router.push('/login?redirect=/account');
    //   return;
    // }

    // For now, simulate login check
    if (!isLoading && !isLoggedIn) {
      // Mock login for demo purposes - automatically log in user for demo
      localStorage.setItem('mockUserSession', 'true');
      window.location.reload();
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00] mx-auto mb-4"></div>
          <p className="text-[#c89295]">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-400 text-lg mb-4">
            {error || 'Unable to load account information'}
          </div>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#FF7A00] text-white px-6 py-3 rounded-lg hover:bg-[#E66A00] transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-[#472426] text-white px-6 py-3 rounded-lg hover:bg-[#5a2d30] transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'deliveries', label: 'Deliveries', icon: 'truck' },
    { id: 'orders', label: 'Order History', icon: 'clipboard' },
    { id: 'preferences', label: 'Preferences', icon: 'settings' },
    { id: 'settings', label: 'Account Settings', icon: 'cog' },
  ];

  const renderTabIcon = (iconName: string) => {
    const iconClasses = "w-5 h-5";
    
    switch (iconName) {
      case 'home':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        );
      case 'user':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'truck':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 011-1h1a1 1 0 010 2H4.414l1.293 1.293a1 1 0 01.293.707V10a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1V4z" />
            <path d="M8 5a1 1 0 012 0v3H6V5z" />
            <path d="M13 5a2 2 0 00-2 2v2H9V7a4 4 0 118 0v2h-2V7a2 2 0 00-2-2z" />
          </svg>
        );
      case 'clipboard':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6h-3a3 3 0 00-3 3v4a1 1 0 01-1 1H6a2 2 0 01-2-2V5zm8 8a1 1 0 013 0v.294l2.707 2.707a1 1 0 01-1.414 1.414L14.586 15H12a1 1 0 01-1-1v-1z" clipRule="evenodd" />
          </svg>
        );
      case 'settings':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        );
      case 'cog':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderTabContent = () => {
    if (isEditingProfile) {
      return (
        <EditProfileForm
          onSuccess={() => setIsEditingProfile(false)}
          onCancel={() => setIsEditingProfile(false)}
        />
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <AccountOverview
            onEditProfile={() => setIsEditingProfile(true)}
            onManageSubscription={() => setActiveTab('settings')}
          />
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-2xl font-bold">Profile Information</h2>
              <button
                onClick={() => setIsEditingProfile(true)}
                className="bg-[#FF7A00] text-white px-4 py-2 rounded-lg hover:bg-[#E66A00] transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            </div>
            
            <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-[#c89295] text-sm">Full Name</p>
                      <p className="text-white">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-[#c89295] text-sm">Email</p>
                      <p className="text-white">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-[#c89295] text-sm">Phone</p>
                      <p className="text-white">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-[#c89295] text-sm">Member Since</p>
                      <p className="text-white">{formatDate(user.memberSince)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-4">Delivery Address</h3>
                  <div className="text-white">
                    <p>{user.address.street}</p>
                    <p>{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                    <p>{user.address.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'deliveries':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Upcoming Deliveries</h2>
            
            <div className="space-y-4">
              {user.upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-white text-lg font-medium">
                        Delivery #{delivery.id.split('-')[1]}
                      </h3>
                      <p className="text-[#c89295]">
                        {formatDate(delivery.date)} • {delivery.deliveryWindow}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      delivery.status === 'scheduled' 
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        : delivery.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        : 'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}>
                      {delivery.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {delivery.meals.map((meal, index) => (
                      <div key={index} className="bg-[#121212] rounded-lg p-4 border border-[#472426]">
                        <h4 className="text-white font-medium mb-1">{meal.name}</h4>
                        <p className="text-[#c89295] text-sm">{meal.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  {delivery.trackingNumber && (
                    <div className="mt-4 pt-4 border-t border-[#472426]">
                      <p className="text-[#c89295] text-sm">
                        Tracking: <span className="text-white font-mono">{delivery.trackingNumber}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Order History</h2>
            
            <div className="space-y-4">
              {user.pastOrders.map((order) => (
                <div key={order.id} className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-white text-lg font-medium">
                        Order #{order.id.split('-')[1]}
                      </h3>
                      <p className="text-[#c89295]">{formatDate(order.date)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[#FF7A00] text-xl font-bold">${order.total}</p>
                        <p className="text-[#c89295] text-sm">{order.status}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < order.rating ? 'text-yellow-400' : 'text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#c89295] text-sm mb-2">Items Ordered:</p>
                      <ul className="space-y-1">
                        {order.items.map((item, index) => (
                          <li key={index} className="text-white text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {order.review && (
                      <div>
                        <p className="text-[#c89295] text-sm mb-2">Your Review:</p>
                        <p className="text-white text-sm italic">&ldquo;{order.review}&rdquo;</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Food Preferences</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                <h3 className="text-white font-medium mb-4">Dietary Restrictions</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.dietaryRestrictions.map((restriction, index) => (
                    <span key={index} className="bg-[#FF7A00]/20 text-[#FF7A00] px-3 py-1 rounded-full text-sm border border-[#FF7A00]/30">
                      {restriction}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                <h3 className="text-white font-medium mb-4">Allergies</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.allergies.map((allergy, index) => (
                    <span key={index} className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm border border-red-500/30">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                <h3 className="text-white font-medium mb-4">Food Dislikes</h3>
                <div className="flex flex-wrap gap-2">
                  {user.preferences.dislikes.map((dislike, index) => (
                    <span key={index} className="bg-gray-500/20 text-gray-400 px-3 py-1 rounded-full text-sm border border-gray-500/30">
                      {dislike}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                <h3 className="text-white font-medium mb-4">Cooking Preferences</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[#c89295] text-sm">Spice Level</p>
                    <p className="text-white capitalize">{user.preferences.spiceLevel}</p>
                  </div>
                  <div>
                    <p className="text-[#c89295] text-sm">Cooking Preference</p>
                    <p className="text-white capitalize">{user.preferences.cookingPreference}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Account Settings</h2>
            
            <div className="space-y-6">
              {/* Notifications */}
              <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                <h3 className="text-white font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {Object.entries(user.accountSettings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${
                        value ? 'bg-[#FF7A00]' : 'bg-gray-600'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy */}
              <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                <h3 className="text-white font-medium mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  {Object.entries(user.accountSettings.privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <p className="text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative transition-colors ${
                        value ? 'bg-[#FF7A00]' : 'bg-gray-600'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
                <h3 className="text-white font-medium mb-4">Payment Methods</h3>
                <div className="space-y-3">
                  {user.paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 bg-[#121212] rounded-lg border border-[#472426]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#FF7A00] rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {method.brand.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {method.brand} ****{method.last4}
                          </p>
                          <p className="text-[#c89295] text-sm">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs border border-green-500/30">
                          Default
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <header className="bg-[#1E1E1E] border-b border-[#472426] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="text-[#c89295] hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="flex items-center gap-3">
                <Image
                  src="/SinfulDelights_HorizontalLogo-white.png"
                  alt="Sinful Delights"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
                <span className="text-[#c89295] text-sm">Account</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#c89295] text-sm">Welcome, {user.name.split(' ')[0]}</span>
              <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 lg:flex-shrink-0">
            <nav className="bg-[#1E1E1E] rounded-xl p-4 border border-[#472426] sticky top-24">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as ActiveTab);
                      setIsEditingProfile(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id && !isEditingProfile
                        ? 'bg-[#FF7A00] text-white'
                        : 'text-[#c89295] hover:text-white hover:bg-[#472426]'
                    }`}
                  >
                    {renderTabIcon(tab.icon)}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}