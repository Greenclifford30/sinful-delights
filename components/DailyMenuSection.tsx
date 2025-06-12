'use client';

import { useState, useEffect } from 'react';
import MenuItemCard from './MenuItemCard';
import { MenuItem } from '@/context/CartContext';

export default function DailyMenuSection() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        setLoading(true);
        
        // TODO: Replace with actual API call to /api/daily-menu
        // const response = await fetch('/api/daily-menu');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch daily menu');
        // }
        // const data = await response.json();
        
        // For now, load from static mock data
        const response = await fetch('/mock/daily-menu.json');
        if (!response.ok) {
          throw new Error('Failed to load menu data');
        }
        const data = await response.json();
        
        setMenuItems(data);
        setError(null);
      } catch (err) {
        console.error('Error loading daily menu:', err);
        setError('Failed to load today\'s menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMenuData();
  }, []);

  if (loading) {
    return (
      <section className="py-8" aria-labelledby="daily-menu-heading">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 id="daily-menu-heading" className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] mb-6">
            Today&apos;s <span className="text-[#8B0000]">Sinful</span> Menu
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-full aspect-video bg-[#1E1E1E] rounded-xl mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-[#1E1E1E] rounded w-3/4"></div>
                  <div className="h-3 bg-[#1E1E1E] rounded w-full"></div>
                  <div className="h-3 bg-[#1E1E1E] rounded w-5/6"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-5 bg-[#1E1E1E] rounded w-16"></div>
                    <div className="h-10 bg-[#1E1E1E] rounded-full w-24"></div>
                  </div>
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
      <section className="py-8" aria-labelledby="daily-menu-heading">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 id="daily-menu-heading" className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] mb-6">
            Today&apos;s <span className="text-[#8B0000]">Sinful</span> Menu
          </h2>
          <div className="text-center py-12">
            <div className="text-[#c89295] text-lg mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#FF7A00] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#E66A00] transition-colors mx-auto"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8" aria-labelledby="daily-menu-heading">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 id="daily-menu-heading" className="text-white text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] mb-2">
            Today&apos;s <span className="text-[#8B0000]">Sinful</span> Menu
          </h2>
          <p className="text-[#c89295] text-base font-normal leading-normal max-w-2xl mx-auto">
            Indulge in our chef&apos;s daily creations, featuring fresh, seasonal ingredients and innovative flavors that will tempt your taste buds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
        
        {menuItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#c89295] text-lg">No menu items available today.</div>
          </div>
        )}
      </div>
    </section>
  );
}