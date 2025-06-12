'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';

interface NavbarProps {
  cartCount?: number;
  variant?: 'default' | 'catering' | 'meal-prep';
}

export default function Navbar({ variant = 'default' }: NavbarProps) {
  const { itemCount } = useCart();
  const { user, isLoggedIn, logout } = useUser();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const getNavLinks = () => {
    switch (variant) {
      case 'catering':
        return (
          <>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#menu">Menu</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#about">About</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#contact">Contact</Link>
          </>
        );
      case 'meal-prep':
        return (
          <>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="/">Menu</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#how-it-works">How it works</Link>
          </>
        );
      default:
        return (
          <>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#menu">Menu</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="/meal-prep">Meal Prep</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="/catering">Catering</Link>
          </>
        );
    }
  };

  const getActionButtons = () => {
    switch (variant) {
      case 'catering':
        return (
          <div className="flex items-center gap-3">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-3 sm:px-4 bg-[#e92932] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d12329] transition-colors">
              <span className="truncate">Book an Event</span>
            </button>
            {renderUserSection()}
          </div>
        );
      case 'meal-prep':
        return (
          <div className="flex items-center gap-3">
            {renderUserSection()}
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-3">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-3 sm:px-4 bg-[#FF7A00] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#E66A00] transition-colors relative"
              aria-label={`View cart with ${itemCount} items`}
            >
              <span className="truncate">Cart ({itemCount})</span>
              {itemCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-[#8B0000] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </div>
              )}
            </button>
            {renderUserSection()}
          </div>
        );
    }
  };

  const renderUserSection = () => {
    if (!isLoggedIn) {
      return (
        <Link
          href="/"
          className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-3 sm:px-4 bg-[#472426] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#5a2d30] transition-colors"
        >
          <span className="truncate">Sign In</span>
        </Link>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-2 p-2 rounded-full hover:bg-[#472426] transition-colors"
          aria-label="User menu"
        >
          <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center border-2 border-[#FF7A00]">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-bold">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            )}
          </div>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {showUserMenu && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-[#1E1E1E] border border-[#472426] rounded-xl shadow-lg z-50">
            <div className="p-4 border-b border-[#472426]">
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-[#c89295] text-sm">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <svg className="w-4 h-4 text-[#FF7A00]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-[#c89295] text-sm">{user?.loyaltyPoints?.toLocaleString()} Points</span>
              </div>
            </div>
            
            <div className="p-2">
              <Link
                href="/account"
                className="flex items-center gap-3 w-full p-3 text-left text-white hover:bg-[#472426] rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>My Account</span>
              </Link>
              
              <Link
                href="/account?tab=orders"
                className="flex items-center gap-3 w-full p-3 text-left text-white hover:bg-[#472426] rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6h-3a3 3 0 00-3 3v4a1 1 0 01-1 1H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
                </svg>
                <span>Order History</span>
              </Link>
              
              <Link
                href="/account?tab=preferences"
                className="flex items-center gap-3 w-full p-3 text-left text-white hover:bg-[#472426] rounded-lg transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Preferences</span>
              </Link>
              
              <hr className="my-2 border-[#472426]" />
              
              <button
                onClick={() => {
                  logout();
                  setShowUserMenu(false);
                }}
                className="flex items-center gap-3 w-full p-3 text-left text-[#c89295] hover:text-white hover:bg-[#472426] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#472426] px-4 sm:px-10 py-3">
      <Link href="/" className="flex items-center text-white hover:opacity-80 transition-opacity">
        <div className="h-6 sm:h-8 md:h-10">
          <Image
            src="/SinfulDelights_HorizontalLogo-white.png"
            alt="Sinful Delights"
            width={180}
            height={40}
            className="h-full w-auto object-contain max-w-[120px] sm:max-w-[150px] md:max-w-[180px]"
            priority
          />
        </div>
      </Link>
      <nav className="flex flex-1 justify-end gap-2 sm:gap-8">
        <div className="hidden md:flex items-center gap-9">
          {getNavLinks()}
        </div>
        <div className="flex items-center gap-2">
          {getActionButtons()}
        </div>
      </nav>
    </header>
  );
}