'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  memberSince: string;
  subscriptionPlan: {
    id: string;
    name: string;
    mealsPerWeek: number;
    price: number;
    status: 'active' | 'paused' | 'cancelled';
    nextBilling: string;
    startDate: string;
    features: string[];
  };
  upcomingDeliveries: Array<{
    id: string;
    date: string;
    status: 'scheduled' | 'pending' | 'in_transit' | 'delivered';
    meals: Array<{
      name: string;
      description: string;
      image: string;
    }>;
    deliveryWindow: string;
    trackingNumber: string | null;
  }>;
  pastOrders: Array<{
    id: string;
    date: string;
    total: number;
    status: 'delivered' | 'cancelled';
    items: string[];
    rating: number;
    review: string;
  }>;
  preferences: {
    dietaryRestrictions: string[];
    allergies: string[];
    dislikes: string[];
    spiceLevel: 'mild' | 'medium' | 'hot' | 'extra-hot';
    cookingPreference: 'rare' | 'medium-rare' | 'medium' | 'medium-well' | 'well-done';
    deliveryInstructions: string;
    communicationPreferences: {
      email: boolean;
      sms: boolean;
      pushNotifications: boolean;
      marketingEmails: boolean;
    };
  };
  loyaltyPoints: number;
  referralCode: string;
  paymentMethods: Array<{
    id: string;
    type: 'credit' | 'debit';
    brand: string;
    last4: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault: boolean;
  }>;
  accountSettings: {
    notifications: {
      orderUpdates: boolean;
      deliveryReminders: boolean;
      promotionalOffers: boolean;
      weeklyMenu: boolean;
    };
    privacy: {
      profileVisibility: 'private' | 'public';
      shareOrderHistory: boolean;
      allowDataCollection: boolean;
    };
    accessibility: {
      fontSize: 'small' | 'medium' | 'large';
      highContrast: boolean;
      screenReader: boolean;
    };
  };
  statistics: {
    totalOrders: number;
    totalSpent: number;
    averageRating: number;
    favoriteItems: string[];
  };
}

interface UserContextType {
  user: UserAccount | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserAccount>) => Promise<boolean>;
  updatePreferences: (preferences: Partial<UserAccount['preferences']>) => Promise<boolean>;
  updateAccountSettings: (settings: Partial<UserAccount['accountSettings']>) => Promise<boolean>;
  addPaymentMethod: (paymentMethod: Omit<UserAccount['paymentMethods'][0], 'id'>) => Promise<boolean>;
  removePaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<boolean>;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthSession = async () => {
      try {
        // TODO: Replace with actual authentication check
        // const token = localStorage.getItem('authToken');
        // if (!token) {
        //   setIsLoading(false);
        //   return;
        // }
        // 
        // const response = await fetch('/api/auth/verify', {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // 
        // if (!response.ok) {
        //   localStorage.removeItem('authToken');
        //   setIsLoading(false);
        //   return;
        // }

        // For now, simulate checking for existing session and loading mock data
        const hasSession = localStorage.getItem('mockUserSession') === 'true';
        
        if (hasSession) {
          await loadUserData();
        }
      } catch (err) {
        console.error('Error checking auth session:', err);
        setError('Failed to verify authentication session');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthSession();
  }, []);

  const loadUserData = async () => {
    try {
      // TODO: Replace with actual API call to /api/user/profile
      // const response = await fetch('/api/user/profile', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to load user data');
      // }
      // 
      // const userData = await response.json();

      // For now, load from mock data
      const response = await fetch('/mock/user-account.json');
      if (!response.ok) {
        throw new Error('Failed to load user data');
      }
      const userData = await response.json();
      
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load user account data');
      setUser(null);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Replace with actual API call to /api/auth/login
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });
      // 
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Login failed');
      // }
      // 
      // const { token, user } = await response.json();
      // localStorage.setItem('authToken', token);

      // For now, simulate successful login for demo purposes
      if (email && password) {
        localStorage.setItem('mockUserSession', 'true');
        await loadUserData();

        // TODO: Send analytics event for successful login
        // analytics.track('user_login', {
        //   user_id: user.id,
        //   email: user.email,
        //   login_method: 'email_password'
        // });

        return true;
      } else {
        throw new Error('Email and password are required');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // TODO: Replace with actual API call to /api/auth/logout
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   fetch('/api/auth/logout', {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   }).catch(console.error);
    // }

    // TODO: Send analytics event for logout
    // if (user) {
    //   analytics.track('user_logout', {
    //     user_id: user.id,
    //     session_duration: Date.now() - sessionStartTime
    //   });
    // }

    localStorage.removeItem('mockUserSession');
    // localStorage.removeItem('authToken');
    setUser(null);
    setError(null);
  };

  const updateProfile = async (updates: Partial<UserAccount>): Promise<boolean> => {
    if (!user) return false;

    try {
      // TODO: Replace with actual API call to /api/user/profile
      // const response = await fetch('/api/user/profile', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify(updates),
      // });
      // 
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to update profile');
      // }
      // 
      // const updatedUser = await response.json();

      // For now, update local state
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      // TODO: Send analytics event for profile update
      // analytics.track('user_profile_updated', {
      //   user_id: user.id,
      //   updated_fields: Object.keys(updates)
      // });

      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      return false;
    }
  };

  const updatePreferences = async (preferences: Partial<UserAccount['preferences']>): Promise<boolean> => {
    if (!user) return false;

    try {
      // TODO: Replace with actual API call to /api/user/preferences
      // const response = await fetch('/api/user/preferences', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify(preferences),
      // });

      // For now, update local state
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      setUser(updatedUser);

      // TODO: Send analytics event for preferences update
      // analytics.track('user_preferences_updated', {
      //   user_id: user.id,
      //   updated_preferences: Object.keys(preferences)
      // });

      return true;
    } catch (err) {
      console.error('Error updating preferences:', err);
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
      return false;
    }
  };

  const updateAccountSettings = async (settings: Partial<UserAccount['accountSettings']>): Promise<boolean> => {
    if (!user) return false;

    try {
      // TODO: Replace with actual API call to /api/user/settings
      // const response = await fetch('/api/user/settings', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify(settings),
      // });

      // For now, update local state
      const updatedUser = {
        ...user,
        accountSettings: { ...user.accountSettings, ...settings }
      };
      setUser(updatedUser);

      return true;
    } catch (err) {
      console.error('Error updating account settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to update account settings');
      return false;
    }
  };

  const addPaymentMethod = async (paymentMethod: Omit<UserAccount['paymentMethods'][0], 'id'>): Promise<boolean> => {
    if (!user) return false;

    try {
      // TODO: Replace with actual API call to /api/user/payment-methods
      // const response = await fetch('/api/user/payment-methods', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify(paymentMethod),
      // });

      // For now, update local state
      const newPaymentMethod = {
        ...paymentMethod,
        id: `card-${Date.now()}`
      };

      const updatedUser = {
        ...user,
        paymentMethods: [...user.paymentMethods, newPaymentMethod]
      };
      setUser(updatedUser);

      return true;
    } catch (err) {
      console.error('Error adding payment method:', err);
      setError(err instanceof Error ? err.message : 'Failed to add payment method');
      return false;
    }
  };

  const removePaymentMethod = async (paymentMethodId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // TODO: Replace with actual API call to /api/user/payment-methods
      // const response = await fetch(`/api/user/payment-methods/${paymentMethodId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   }
      // });

      // For now, update local state
      const updatedUser = {
        ...user,
        paymentMethods: user.paymentMethods.filter(pm => pm.id !== paymentMethodId)
      };
      setUser(updatedUser);

      return true;
    } catch (err) {
      console.error('Error removing payment method:', err);
      setError(err instanceof Error ? err.message : 'Failed to remove payment method');
      return false;
    }
  };

  const setDefaultPaymentMethod = async (paymentMethodId: string): Promise<boolean> => {
    if (!user) return false;

    try {
      // TODO: Replace with actual API call to /api/user/payment-methods/default
      // const response = await fetch('/api/user/payment-methods/default', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      //   },
      //   body: JSON.stringify({ paymentMethodId }),
      // });

      // For now, update local state
      const updatedUser = {
        ...user,
        paymentMethods: user.paymentMethods.map(pm => ({
          ...pm,
          isDefault: pm.id === paymentMethodId
        }))
      };
      setUser(updatedUser);

      return true;
    } catch (err) {
      console.error('Error setting default payment method:', err);
      setError(err instanceof Error ? err.message : 'Failed to set default payment method');
      return false;
    }
  };

  const refreshUserData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    await loadUserData();
    setIsLoading(false);
  };

  const value: UserContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    error,
    login,
    logout,
    updateProfile,
    updatePreferences,
    updateAccountSettings,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    refreshUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}