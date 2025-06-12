'use client';

import { useState, useEffect } from 'react';
// import Image from 'next/image'; // TODO: Uncomment when images are available

interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  imageUrl: string;
  icon: string;
}

export default function HowItWorksSection() {
  const [steps, setSteps] = useState<HowItWorksStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStepsData = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with CMS or API integration
        // const response = await fetch('/api/how-it-works');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch how-it-works data');
        // }
        // const data = await response.json();
        
        // For now, load from static mock data
        const response = await fetch('/mock/how-it-works.json');
        if (!response.ok) {
          throw new Error('Failed to load how-it-works data');
        }
        const data = await response.json();
        
        setSteps(data);
        setError(null);
      } catch (err) {
        console.error('Error loading how-it-works data:', err);
        setError('Failed to load process steps. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadStepsData();
  }, []);

  const handleStartSubscription = () => {
    // TODO: Add analytics tracking for CTA click
    // analytics.track('how_it_works_cta_clicked', {
    //   source: 'how_it_works_section',
    //   timestamp: Date.now()
    // });

    // TODO: Navigate to subscription plans or implement subscription flow
    // router.push('/meal-prep#plans');
    
    // For now, scroll to plans section on the same page
    const plansSection = document.getElementById('subscription-plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    console.log('Start subscription CTA clicked');
  };

  const renderStepIcon = (iconName: string, stepNumber: number) => {
    const iconClasses = "w-8 h-8 text-[#FF7A00]";
    
    switch (iconName) {
      case 'clipboard-list':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6h-3a3 3 0 00-3 3v4a1 1 0 01-1 1H6a2 2 0 01-2-2V5zm8 8a1 1 0 013 0v.294l2.707 2.707a1 1 0 01-1.414 1.414L14.586 15H12a1 1 0 01-1-1v-1z" clipRule="evenodd" />
          </svg>
        );
      case 'chef-hat':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v1a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2V4a2 2 0 00-2-2H6zm0 2h8v1H6V4zm0 3h8v7H6V7z" clipRule="evenodd" />
          </svg>
        );
      case 'truck':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 011-1h1a1 1 0 010 2H4.414l1.293 1.293a1 1 0 01.293.707V10a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1V4z" />
            <path d="M8 5a1 1 0 012 0v3H6V5z" />
            <path d="M13 5a2 2 0 00-2 2v2H9V7a4 4 0 118 0v2h-2V7a2 2 0 00-2-2z" />
          </svg>
        );
      case 'fire':
        return (
          <svg className={iconClasses} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
          </svg>
        );
      default:
        // Fallback: show step number in a circle
        return (
          <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">{stepNumber}</span>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#121212]" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-[#1E1E1E] rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-[#1E1E1E] rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center animate-pulse">
                <div className="w-32 h-32 bg-[#1E1E1E] rounded-xl mx-auto mb-6"></div>
                <div className="h-4 bg-[#1E1E1E] rounded w-3/4 mx-auto mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-[#1E1E1E] rounded w-full"></div>
                  <div className="h-3 bg-[#1E1E1E] rounded w-5/6 mx-auto"></div>
                  <div className="h-3 bg-[#1E1E1E] rounded w-4/6 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#121212]" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="how-it-works-heading" className="text-white text-3xl font-bold mb-4">
              How It Works
            </h2>
            <div className="text-center py-12">
              <div className="text-red-400 text-lg mb-4">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#FF7A00] text-white px-6 py-3 rounded-lg hover:bg-[#E66A00] transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="how-it-works" 
      className="py-16 bg-[#121212]" 
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 id="how-it-works-heading" className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-[#c89295] text-lg sm:text-xl max-w-3xl mx-auto">
            From selecting your plan to enjoying your <span className="text-[#8B0000] font-medium">sinful</span> meals, 
            we&apos;ve made it simple to indulge in gourmet flavors delivered fresh to your door.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-16">
          {steps.map((step, index) => (
            <div 
              key={step.stepNumber} 
              className="text-center group"
              role="article"
              aria-labelledby={`step-${step.stepNumber}-title`}
            >
              {/* Step Image/Icon Container */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto bg-[#1E1E1E] rounded-xl border-2 border-[#472426] flex items-center justify-center group-hover:border-[#FF7A00] transition-colors duration-300 overflow-hidden">
                  {/* Fallback: Use icon if image fails to load */}
                  <div className="flex items-center justify-center w-full h-full">
                    {renderStepIcon(step.icon, step.stepNumber)}
                  </div>
                  
                  {/* Future: Uncomment when images are available */}
                  {/* <Image
                    src={step.imageUrl}
                    alt={`Step ${step.stepNumber}: ${step.title}`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => {
                      // Fallback to icon if image fails
                    }}
                  /> */}
                </div>
                
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center border-2 border-[#121212] group-hover:bg-[#E66A00] transition-colors duration-300">
                  <span className="text-white text-sm font-bold">{step.stepNumber}</span>
                </div>
                
                {/* Connection Line (not for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-6 h-0.5 bg-[#472426] transform -translate-y-1/2 group-hover:bg-[#FF7A00] transition-colors duration-300" />
                )}
              </div>

              {/* Step Content */}
              <div className="space-y-3">
                <h3 
                  id={`step-${step.stepNumber}-title`}
                  className="text-white text-lg sm:text-xl font-semibold"
                >
                  Step {step.stepNumber}: {step.title}
                </h3>
                <p className="text-[#c89295] text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={handleStartSubscription}
            className="inline-flex items-center gap-3 bg-[#FF7A00] text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#E66A00] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Start your meal subscription"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            <span>Start Your Subscription</span>
          </button>
          
          <p className="text-[#c89295] text-sm mt-4">
            Ready to indulge? Choose your plan and start enjoying <span className="text-[#8B0000] font-medium">sinful</span> meals today.
          </p>
        </div>
      </div>
    </section>
  );
}