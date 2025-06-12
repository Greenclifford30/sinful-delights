'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface SubscriptionPlan {
  id: string;
  planName: string;
  mealsPerWeek: number | string;
  price: number | string;
  originalPrice?: number | null;
  description: string;
  features: string[];
  isPopular: boolean;
  discount?: string | null;
  servingSize: string;
  category: string;
}

interface SubscriptionState {
  selectedPlan: SubscriptionPlan | null;
  isProcessing: boolean;
  error: string | null;
}

type SubscriptionAction =
  | { type: 'SELECT_PLAN'; payload: SubscriptionPlan }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

interface SubscriptionContextType extends SubscriptionState {
  selectPlan: (plan: SubscriptionPlan) => void;
  clearSelection: () => void;
  setProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;
  proceedToCheckout: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const initialState: SubscriptionState = {
  selectedPlan: null,
  isProcessing: false,
  error: null,
};

function subscriptionReducer(state: SubscriptionState, action: SubscriptionAction): SubscriptionState {
  switch (action.type) {
    case 'SELECT_PLAN':
      return {
        ...state,
        selectedPlan: action.payload,
        error: null,
      };
    
    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedPlan: null,
        error: null,
      };
    
    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    
    default:
      return state;
  }
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);

  const selectPlan = (plan: SubscriptionPlan) => {
    dispatch({ type: 'SELECT_PLAN', payload: plan });
    
    // TODO: Send analytics event for plan selection
    // analytics.track('subscription_plan_selected', {
    //   plan_id: plan.id,
    //   plan_name: plan.planName,
    //   meals_per_week: plan.mealsPerWeek,
    //   price: plan.price,
    //   category: plan.category
    // });
    
    console.log('Selected subscription plan:', plan);
  };

  const clearSelection = () => {
    dispatch({ type: 'CLEAR_SELECTION' });
  };

  const setProcessing = (processing: boolean) => {
    dispatch({ type: 'SET_PROCESSING', payload: processing });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const proceedToCheckout = async (): Promise<void> => {
    if (!state.selectedPlan) {
      setError('Please select a subscription plan first');
      return;
    }

    try {
      setProcessing(true);
      setError(null);

      // TODO: Replace with actual Stripe checkout integration
      // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      // 
      // const response = await fetch('/api/create-subscription-checkout', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     planId: state.selectedPlan.id,
      //     plan: state.selectedPlan
      //   }),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to create checkout session');
      // }
      // 
      // const session = await response.json();
      // 
      // const result = await stripe!.redirectToCheckout({
      //   sessionId: session.id,
      // });
      // 
      // if (result.error) {
      //   throw new Error(result.error.message);
      // }

      // TODO: Send analytics event for checkout initiation
      // analytics.track('subscription_checkout_initiated', {
      //   plan_id: state.selectedPlan.id,
      //   plan_name: state.selectedPlan.planName,
      //   price: state.selectedPlan.price
      // });

      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Proceeding to checkout with plan:', state.selectedPlan);
      
      // TODO: Handle successful subscription creation
      // TODO: Send confirmation email to customer
      // TODO: Set up recurring billing
      // emailService.sendSubscriptionConfirmation(customerEmail, state.selectedPlan);
      
      alert(`Checkout would proceed with ${state.selectedPlan.planName} - $${state.selectedPlan.price}/week`);
      
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error instanceof Error ? error.message : 'Failed to proceed to checkout');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        ...state,
        selectPlan,
        clearSelection,
        setProcessing,
        setError,
        proceedToCheckout,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}