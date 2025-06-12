'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SubscriptionProvider, SubscriptionPlan, useSubscription } from '@/context/SubscriptionContext';
import Navbar from '@/components/Navbar';
import HowItWorksSection from '@/components/HowItWorksSection';
import SubscriptionPlanCard from '@/components/SubscriptionPlanCard';

function CheckoutButton() {
  const { selectedPlan, proceedToCheckout, isProcessing, error } = useSubscription();

  if (!selectedPlan) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-[#1E1E1E] border border-[#472426] rounded-xl p-4 shadow-2xl min-w-[300px]">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white font-medium text-sm">{selectedPlan.planName}</p>
            <p className="text-[#c89295] text-xs">
              {typeof selectedPlan.mealsPerWeek === 'number' 
                ? `${selectedPlan.mealsPerWeek} meals/week` 
                : selectedPlan.mealsPerWeek
              }
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#FF7A00] font-bold">
              {typeof selectedPlan.price === 'number' 
                ? `$${selectedPlan.price.toFixed(2)}/week` 
                : selectedPlan.price
              }
            </p>
          </div>
        </div>
        
        <button
          onClick={proceedToCheckout}
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 focus:ring-offset-[#1E1E1E] ${
            isProcessing
              ? 'bg-[#472426] text-[#c89295] cursor-not-allowed'
              : 'bg-[#FF7A00] text-white hover:bg-[#E66A00]'
          }`}
          aria-label="Continue to checkout"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </span>
          ) : (
            'Continue to Checkout'
          )}
        </button>
      </div>
    </div>
  );
}

function MealPrepContent() {
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubscriptionPlans = async () => {
      try {
        // TODO: Replace with actual API call to /api/subscriptions
        // const response = await fetch('/api/subscriptions');
        
        const response = await fetch('/mock/subscriptions.json');
        if (!response.ok) {
          throw new Error('Failed to load subscription plans');
        }
        const plans = await response.json();
        setSubscriptionPlans(plans);
      } catch (err) {
        console.error('Error loading subscription plans:', err);
        setError('Failed to load subscription plans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptionPlans();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00] mx-auto mb-4"></div>
          <p className="text-[#c89295]">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <p className="text-red-500 mb-4">{error}</p>
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
    <div className="min-h-screen bg-[#121212]">
      <div className="relative flex size-full min-h-screen flex-col bg-[#121212] font-sans">
        <div className="layout-container flex h-full grow flex-col">
          <Navbar variant="meal-prep" />

          {/* Hero Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div
                className="flex min-h-[300px] sm:min-h-[400px] flex-col gap-4 sm:gap-6 bg-cover bg-center bg-no-repeat lg:gap-8 lg:rounded-xl items-center justify-center px-4 pb-8 sm:pb-10 lg:px-10 text-center"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("/hero-bg.jpg")'
                }}
              >
                <div className="w-32 sm:w-40 lg:w-48 mb-4">
                  <Image
                    src="/SinfulDelights_StackedLogo-white.png"
                    alt="Sinful Delights"
                    width={192}
                    height={240}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                
                <div className="max-w-4xl">
                  <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
                    Meal Prep Subscriptions
                  </h1>
                  <p className="text-white text-base sm:text-lg lg:text-xl font-normal leading-normal mb-6 max-w-2xl mx-auto">
                    Indulge in our <span className="text-[#8B0000] font-bold">sinful</span> chef-prepared meals 
                    delivered fresh to your door every week. No cooking, no cleanup, just pure deliciousness.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FF7A00] rounded-full"></div>
                      <span>Chef-Prepared</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FF7A00] rounded-full"></div>
                      <span>Fresh Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#FF7A00] rounded-full"></div>
                      <span>Skip Anytime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <HowItWorksSection />

          {/* Subscription Plans Section */}
          <div id="subscription-plans" className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                  Choose Your <span className="text-[#8B0000]">Sinful</span> Plan
                </h2>
                <p className="text-[#c89295] text-base max-w-2xl mx-auto">
                  Select the perfect subscription plan that fits your lifestyle. 
                  All plans include free delivery and the flexibility to skip or pause anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {subscriptionPlans.map((plan) => (
                  <SubscriptionPlanCard key={plan.id} plan={plan} />
                ))}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-white text-2xl font-bold text-center mb-12">
                Why Choose <span className="text-[#8B0000]">Sinful</span> Delights Meal Prep?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">Chef-Prepared</h4>
                  <p className="text-[#c89295] text-sm">
                    Every meal is crafted by our professional chefs using the finest ingredients and our signature recipes.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                    </svg>
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">Fresh Delivery</h4>
                  <p className="text-[#c89295] text-sm">
                    Meals arrive fresh and ready-to-eat, perfectly packaged to maintain quality and flavor.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">Ultimate Flexibility</h4>
                  <p className="text-[#c89295] text-sm">
                    Skip weeks, pause your subscription, or change your plan anytime. No commitments, just convenience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}

export default function MealPrepPage() {
  return (
    <SubscriptionProvider>
      <MealPrepContent />
    </SubscriptionProvider>
  );
}