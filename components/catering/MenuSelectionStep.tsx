'use client';

import { useState, useEffect } from 'react';
import { useCatering } from '@/context/CateringContext';
import { MenuItem } from '@/context/CartContext';

export default function MenuSelectionStep() {
  const { formData, updateFormData, errors } = useCatering();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        // TODO: Replace with actual API call to /api/menu-items
        // const response = await fetch('/api/menu-items');
        
        // Load from daily menu for now
        const response = await fetch('/mock/daily-menu.json');
        if (!response.ok) {
          throw new Error('Failed to load menu items');
        }
        const items = await response.json();
        setMenuItems(items);
      } catch (error) {
        console.error('Error loading menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  const handleMenuItemToggle = (itemName: string) => {
    const currentItems = formData.menuItems || [];
    const isSelected = currentItems.includes(itemName);
    
    let updatedItems;
    if (isSelected) {
      updatedItems = currentItems.filter(item => item !== itemName);
    } else {
      updatedItems = [...currentItems, itemName];
    }
    
    updateFormData({ menuItems: updatedItems });
  };

  const isItemSelected = (itemName: string) => {
    return formData.menuItems?.includes(itemName) || false;
  };

  const getSelectedCount = () => {
    return formData.menuItems?.length || 0;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7A00] mx-auto mb-4"></div>
          <p className="text-[#c89295]">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-[#c89295] text-sm mb-2">
          Select menu items for your event ({getSelectedCount()} selected)
        </p>
        <p className="text-white text-sm">
          Choose multiple items to create the perfect menu for your guests
        </p>
      </div>

      {errors.menuItems && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-500 text-sm">{errors.menuItems}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item) => {
          const selected = isItemSelected(item.name);
          
          return (
            <div
              key={item.id}
              onClick={() => handleMenuItemToggle(item.name)}
              className={`relative cursor-pointer rounded-xl border-2 transition-all duration-200 hover:transform hover:scale-105 ${
                selected
                  ? 'border-[#FF7A00] bg-[#FF7A00]/10'
                  : 'border-[#472426] bg-[#121212] hover:border-[#FF7A00]/50'
              }`}
            >
              {/* Selection Indicator */}
              <div
                className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  selected
                    ? 'bg-[#FF7A00] text-white'
                    : 'bg-[#1E1E1E] border border-[#472426]'
                }`}
              >
                {selected && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Item Content */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-white text-base font-medium mb-1">
                    {item.name.includes('Sinful') ? (
                      <>
                        <span className="text-[#8B0000] font-bold">Sinful</span>
                        {item.name.replace('Sinful', '')}
                      </>
                    ) : (
                      item.name
                    )}
                  </h3>
                  <p className="text-[#c89295] text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FF7A00] text-lg font-bold">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-[#c89295] text-xs">per person</span>
                  </div>

                  {item.isSpecial && (
                    <span className="bg-[#FF7A00] text-white text-xs font-bold px-2 py-1 rounded-full">
                      Special
                    </span>
                  )}
                </div>

                {item.spiceLevel && item.spiceLevel !== 'none' && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-[#c89295] text-xs">Spice level:</span>
                    <span className="text-xs">
                      {item.spiceLevel === 'mild' && '🌶️'}
                      {item.spiceLevel === 'medium' && '🌶️🌶️'}
                      {item.spiceLevel === 'hot' && '🌶️🌶️🌶️'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {getSelectedCount() > 0 && (
        <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/20 rounded-lg p-4 mt-6">
          <h4 className="text-white text-sm font-semibold mb-2">Selected Items:</h4>
          <div className="flex flex-wrap gap-2">
            {formData.menuItems?.map((itemName) => (
              <span
                key={itemName}
                className="bg-[#FF7A00] text-white text-xs font-medium px-3 py-1 rounded-full"
              >
                {itemName.includes('Sinful') ? (
                  <>
                    <span className="font-bold">Sinful</span>
                    {itemName.replace('Sinful', '')}
                  </>
                ) : (
                  itemName
                )}
              </span>
            ))}
          </div>
          <p className="text-[#c89295] text-xs mt-2">
            Final pricing will be calculated based on guest count and selected items
          </p>
        </div>
      )}
    </div>
  );
}