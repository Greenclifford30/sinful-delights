'use client';

import Image from 'next/image';
import { MenuItem, useCart } from '@/context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item);
    // TODO: Send analytics event when item is added to cart
    // analytics.track('add_to_cart_clicked', {
    //   item_id: item.id,
    //   item_name: item.name,
    //   price: item.price,
    //   category: item.category
    // });
  };

  return (
    <div className="flex flex-col gap-3 pb-3 group hover:transform hover:scale-105 transition-all duration-200">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#1E1E1E]">
        <Image
          src={item.image}
          alt={`Photo of ${item.name}`}
          fill
          className="object-cover group-hover:brightness-110 transition-all duration-200"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={item.isSpecial}
        />
        {item.isSpecial && (
          <div className="absolute top-2 left-2 bg-[#FF7A00] text-white text-xs font-bold px-2 py-1 rounded-full">
            Special
          </div>
        )}
        {item.spiceLevel && item.spiceLevel !== 'none' && (
          <div className="absolute top-2 right-2 bg-[#8B0000] text-white text-xs font-semibold px-2 py-1 rounded-full">
            {item.spiceLevel === 'mild' && '🌶️'}
            {item.spiceLevel === 'medium' && '🌶️🌶️'}
            {item.spiceLevel === 'hot' && '🌶️🌶️🌶️'}
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        <div>
          <h3 className="text-white text-base font-medium leading-normal">
            {item.name.includes('Sinful') ? (
              <>
                <span className="text-[#8B0000] font-bold">Sinful</span>
                {item.name.replace('Sinful', '')}
              </>
            ) : (
              item.name
            )}
          </h3>
          <p className="text-[#c89295] text-sm font-normal leading-normal line-clamp-2">
            {item.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-[#FF7A00] text-lg font-bold">
            ${item.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#FF7A00] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#E66A00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 focus:ring-offset-[#121212]"
            aria-label={`Add ${item.name} to cart for $${item.price.toFixed(2)}`}
          >
            <span className="truncate">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}