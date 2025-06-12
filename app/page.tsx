'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import DailyMenuSection from '@/components/DailyMenuSection';

export default function Home() {
  const { items: cartItems, total, itemCount, removeItem } = useCart();

  const deliveryFee = 5;
  const finalTotal = total + (cartItems.length > 0 ? deliveryFee : 0);

  const handleCheckout = () => {
    // TODO: Integrate with Stripe for payment processing
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    // 
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     items: cartItems,
    //     total: finalTotal,
    //     deliveryFee: deliveryFee
    //   }),
    // });
    // 
    // const session = await response.json();
    // const result = await stripe!.redirectToCheckout({
    //   sessionId: session.id,
    // });
    
    alert(`Checkout functionality coming soon! Total: $${finalTotal.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="relative flex size-full min-h-screen flex-col bg-[#121212] font-sans">
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />

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
                      <div className="flex flex-col gap-4 text-left">
                        <div className="w-24 xs:w-28 sm:w-32 md:w-36 lg:w-40">
                          <Image
                            src="/SinfulDelights_StackedLogo-white.png"
                            alt="Sinful Delights"
                            width={160}
                            height={200}
                            className="w-full h-auto object-contain"
                            priority
                          />
                        </div>
                        <div>
                          <h2 className="text-white text-xl sm:text-2xl font-black leading-tight tracking-[-0.033em] lg:text-3xl lg:font-black lg:leading-tight lg:tracking-[-0.033em] mb-2">
                            Welcome to Our Kitchen
                          </h2>
                          <p className="text-white text-sm font-normal leading-normal lg:text-base lg:font-normal lg:leading-normal">
                            Indulge in our chef&apos;s daily creations, featuring fresh, seasonal ingredients and innovative flavors that will leave you craving more.
                          </p>
                        </div>
                      </div>
                      <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 lg:h-12 lg:px-5 bg-[#FF7A00] text-white text-sm font-bold leading-normal tracking-[0.015em] lg:text-base lg:font-bold lg:leading-normal lg:tracking-[0.015em] hover:bg-[#E66A00] transition-colors"
                        onClick={() => document.getElementById('daily-menu-heading')?.scrollIntoView({ behavior: 'smooth' })}
                        aria-label="View today's special dishes"
                      >
                        <span className="truncate">View Today&apos;s Menu</span>
                      </button>
                    </div>
                  </div>
                </div>

                <DailyMenuSection />
              </div>

              <aside className="w-full lg:w-80 lg:min-w-80 bg-[#1E1E1E] rounded-lg lg:rounded-none lg:bg-transparent" aria-labelledby="order-summary-heading">
                <h3 id="order-summary-heading" className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Order Summary</h3>
              
                {cartItems.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-[#c89295] text-sm">Your cart is empty</p>
                    <p className="text-[#c89295] text-xs mt-1">Add items from our menu to get started</p>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 bg-[#121212] px-4 min-h-[72px] py-2 justify-between">
                        <div className="flex flex-col justify-center">
                          <p className="text-white text-base font-medium leading-normal line-clamp-1">
                            {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                          <p className="text-[#c89295] text-sm font-normal leading-normal line-clamp-2">
                            {item.name.includes('Sinful') ? (
                              <>
                                <span className="text-[#8B0000] font-semibold">Sinful</span>
                                {item.name.replace('Sinful', '')}
                              </>
                            ) : (
                              item.name
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 text-white hover:text-[#FF7A00] transition-colors"
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

                    <div className="flex items-center gap-4 bg-[#121212] px-4 min-h-14 justify-between">
                      <p className="text-white text-base font-normal leading-normal flex-1 truncate">Subtotal</p>
                      <div className="shrink-0">
                        <p className="text-white text-base font-normal leading-normal">${total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-[#121212] px-4 min-h-14 justify-between">
                      <p className="text-white text-base font-normal leading-normal flex-1 truncate">Delivery Fee</p>
                      <div className="shrink-0">
                        <p className="text-white text-base font-normal leading-normal">${deliveryFee.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-[#121212] px-4 min-h-14 justify-between border-t border-[#472426]">
                      <p className="text-white text-base font-semibold leading-normal flex-1 truncate">Total</p>
                      <div className="shrink-0">
                        <p className="text-[#FF7A00] text-base font-bold leading-normal">${finalTotal.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex px-4 py-3">
                      <button
                        onClick={handleCheckout}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#FF7A00] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#E66A00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:ring-offset-2 focus:ring-offset-[#121212]"
                        disabled={cartItems.length === 0}
                        aria-label={`Proceed to checkout with ${itemCount} items totaling $${finalTotal.toFixed(2)}`}
                      >
                        <span className="truncate">Checkout</span>
                      </button>
                    </div>
                  </>
                )}
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}