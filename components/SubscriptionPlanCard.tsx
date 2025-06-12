'use client';

import { SubscriptionPlan, useSubscription } from '@/context/SubscriptionContext';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
}

export default function SubscriptionPlanCard({ plan }: SubscriptionPlanCardProps) {
  const { selectedPlan, selectPlan } = useSubscription();
  const isSelected = selectedPlan?.id === plan.id;
  const isCustomPlan = plan.category === 'custom';

  const handleSelectPlan = () => {
    selectPlan(plan);
  };

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    return `$${price.toFixed(2)}`;
  };

  return (
    <div
      className={`relative rounded-xl border-2 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${
        isSelected
          ? 'border-[#FF7A00] bg-[#FF7A00]/10 shadow-xl shadow-[#FF7A00]/20'
          : 'border-[#472426] bg-[#1E1E1E] hover:border-[#FF7A00]/50'
      }`}
      onClick={handleSelectPlan}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelectPlan();
        }
      }}
      aria-label={`Select ${plan.planName} subscription plan`}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-[#FF7A00] text-white text-xs font-bold px-4 py-1 rounded-full">
            Most Popular
          </div>
        </div>
      )}

      {/* Selection Indicator */}
      <div
        className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
          isSelected
            ? 'bg-[#FF7A00] text-white'
            : 'bg-[#121212] border border-[#472426]'
        }`}
      >
        {isSelected && (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      <div className="p-6">
        {/* Plan Header */}
        <div className="mb-6">
          <h3 className="text-white text-xl font-bold mb-2">
            {plan.planName.includes('Sinful') ? (
              <>
                <span className="text-[#8B0000] font-bold">Sinful</span>
                {plan.planName.replace('Sinful', '')}
              </>
            ) : (
              plan.planName
            )}
          </h3>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#c89295] text-sm">
              {typeof plan.mealsPerWeek === 'number' 
                ? `${plan.mealsPerWeek} meals per week` 
                : plan.mealsPerWeek
              }
            </span>
            <span className="text-[#c89295] text-sm">•</span>
            <span className="text-[#c89295] text-sm">{plan.servingSize}</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${isCustomPlan ? 'text-[#FF7A00]' : 'text-white'}`}>
              {formatPrice(plan.price)}
              {!isCustomPlan && <span className="text-sm font-normal text-[#c89295]">/week</span>}
            </span>
            {plan.originalPrice && typeof plan.originalPrice === 'number' && (
              <span className="text-[#c89295] text-sm line-through">
                ${plan.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {plan.discount && (
            <div className="mt-2">
              <span className="bg-[#8B0000] text-white text-xs font-bold px-2 py-1 rounded">
                {plan.discount}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-[#c89295] text-sm mb-6 leading-relaxed">
          {plan.description}
        </p>

        {/* Features */}
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-4 h-4 bg-[#FF7A00] rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-white text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        {/* Select Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSelectPlan();
          }}
          className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 focus:ring-offset-[#1E1E1E] ${
            isSelected
              ? 'bg-[#FF7A00] text-white hover:bg-[#E66A00]'
              : 'bg-[#472426] text-white hover:bg-[#5a2d30]'
          }`}
          aria-label={`${isSelected ? 'Selected' : 'Select'} ${plan.planName} plan`}
        >
          {isSelected ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Selected
            </span>
          ) : (
            'Select Plan'
          )}
        </button>
      </div>
    </div>
  );
}