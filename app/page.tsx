'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from './components/Navbar';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Grilled Salmon with Asparagus',
    description: 'Freshly grilled salmon with a side of asparagus.',
    price: 25,
    image: '/salmon.jpg'
  },
  {
    id: 2,
    name: 'Chicken Alfredo Pasta',
    description: 'Creamy Alfredo sauce with grilled chicken and pasta.',
    price: 20,
    image: '/chicken-alfredo.jpg'
  },
  {
    id: 3,
    name: 'Vegetarian Lasagna',
    description: 'Layers of pasta, vegetables, and cheese.',
    price: 18,
    image: '/vegetarian-lasagna.jpg'
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center.',
    price: 12,
    image: '/chocolate-lava-cake.jpg'
  }
];

export default function Home() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { ...menuItems[0], quantity: 1 },
    { ...menuItems[1], quantity: 1 }
  ]);

  const removeFromOrder = (id: number) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
  };

  const addToOrder = (menuItem: MenuItem) => {
    setOrderItems(prev => {
      const existingItem = prev.find(item => item.id === menuItem.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === menuItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;
  const cartCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#221112]">
      <div className="relative flex size-full min-h-screen flex-col bg-[#221112] font-sans">
        <div className="layout-container flex h-full grow flex-col">
          <Navbar cartCount={cartCount} />

          <div className="px-2 sm:px-4 lg:px-8 flex flex-1 justify-center py-5">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="container">
                  <div className="p-0 lg:p-4">
                    <div
                      className="flex min-h-[300px] sm:min-h-[480px] flex-col gap-4 sm:gap-6 bg-cover bg-center bg-no-repeat lg:gap-8 lg:rounded-xl items-start justify-end px-4 pb-8 sm:pb-10 lg:px-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("/hero-bg.jpg")'
                      }}
                    >
                      <div className="flex flex-col gap-2 text-left">
                        <h2 className="text-white text-2xl sm:text-4xl font-black leading-tight tracking-[-0.033em] lg:text-5xl lg:font-black lg:leading-tight lg:tracking-[-0.033em]">
                          Today&apos;s Specials
                        </h2>
                        <p className="text-white text-sm font-normal leading-normal lg:text-base lg:font-normal lg:leading-normal">
                          Indulge in our chef&apos;s daily creations, featuring fresh, seasonal ingredients and innovative flavors.
                        </p>
                      </div>
                      <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 lg:h-12 lg:px-5 bg-[#e92932] text-white text-sm font-bold leading-normal tracking-[0.015em] lg:text-base lg:font-bold lg:leading-normal lg:tracking-[0.015em] hover:bg-[#d12329] transition-colors"
                        aria-label="View today's special dishes"
                      >
                        <span className="truncate">View Specials</span>
                      </button>
                    </div>
                  </div>
                </div>

                <section aria-labelledby="menu-heading">
                  <h2 id="menu-heading" className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Menu</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4">
                    {menuItems.map((item) => (
                      <div key={item.id} className="flex flex-col gap-3 pb-3">
                        <div
                          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl bg-gray-600"
                          role="img"
                          aria-label={`Photo of ${item.name}`}
                          style={{ backgroundImage: `url("${item.image}")` }}
                        />
                        <div>
                          <h3 className="text-white text-base font-medium leading-normal">{item.name}</h3>
                          <p className="text-[#c89295] text-sm font-normal leading-normal">{item.description}</p>
                          <p className="text-white text-sm font-semibold mt-1">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-stretch">
                    <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-center sm:justify-between">
                      <button
                        onClick={() => addToOrder(menuItems[0])}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e92932] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d12329] transition-colors"
                        aria-label="Add selected item to order"
                      >
                        <span className="truncate">Add to Order</span>
                      </button>
                      <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#472426] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#5a2d30] transition-colors"
                        aria-label="View detailed information about selected item"
                      >
                        <span className="truncate">View Details</span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="w-full lg:w-80 lg:min-w-80 bg-[#1a0f10] rounded-lg lg:rounded-none lg:bg-transparent" aria-labelledby="order-summary-heading">
                <h3 id="order-summary-heading" className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Order Summary</h3>
              
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-[#221112] px-4 min-h-[72px] py-2 justify-between">
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal line-clamp-1">
                      {item.quantity} x ${item.price}
                    </p>
                    <p className="text-[#c89295] text-sm font-normal leading-normal line-clamp-2">{item.name}</p>
                  </div>
                  <button
                    onClick={() => removeFromOrder(item.id)}
                    className="shrink-0 text-white hover:text-[#e92932] transition-colors"
                    aria-label={`Remove ${item.name} from order`}
                  >
                    <div className="flex size-7 items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              ))}

              <div className="flex items-center gap-4 bg-[#221112] px-4 min-h-14 justify-between">
                <p className="text-white text-base font-normal leading-normal flex-1 truncate">Subtotal</p>
                <div className="shrink-0">
                  <p className="text-white text-base font-normal leading-normal">${subtotal}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#221112] px-4 min-h-14 justify-between">
                <p className="text-white text-base font-normal leading-normal flex-1 truncate">Delivery Fee</p>
                <div className="shrink-0">
                  <p className="text-white text-base font-normal leading-normal">${deliveryFee}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#221112] px-4 min-h-14 justify-between border-t border-[#472426]">
                <p className="text-white text-base font-semibold leading-normal flex-1 truncate">Total</p>
                <div className="shrink-0">
                  <p className="text-white text-base font-semibold leading-normal">${total}</p>
                </div>
              </div>

                <div className="flex px-4 py-3">
                  <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#e92932] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d12329] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={orderItems.length === 0}
                    aria-label={`Proceed to checkout with ${cartCount} items totaling $${total}`}
                  >
                    <span className="truncate">Checkout</span>
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
