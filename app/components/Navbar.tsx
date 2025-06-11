import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  cartCount?: number;
  variant?: 'default' | 'catering' | 'meal-prep';
}

export default function Navbar({ cartCount = 0, variant = 'default' }: NavbarProps) {
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
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#menu">Menu</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#how-it-works">How it works</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#gifts">Gifts</Link>
          </>
        );
      default:
        return (
          <>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#menu">Menu</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="/meal-prep">Meal Prep</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="/catering">Catering</Link>
            <Link className="text-white text-sm font-medium leading-normal hover:text-[#c89295] transition-colors" href="#account">Account</Link>
          </>
        );
    }
  };

  const getActionButton = () => {
    switch (variant) {
      case 'catering':
        return (
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-3 sm:px-4 bg-[#e92932] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d12329] transition-colors">
            <span className="truncate">Book an Event</span>
          </button>
        );
      case 'meal-prep':
        return (
          <>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-3 sm:px-4 bg-[#472426] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#5a2d30] transition-colors">
              <span className="truncate">Sign in</span>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWeiRDGmUbuLN2CTEzmhdFG3t3UdYtbTO_hIWquj8l_RLOS7B0D6zZ2Xg1uSDdDKKb6y7orna59z18qy3nOac-QwVRFwIaD-m7OQ4ZxlHuxyYDATK0awPfBXbhvLbYViVCL9_ktuykmchA9QPcXe0vLcJes_VY3t2QrN7U9z7Yv_d8Uw5Npt3XA1BhSdvC7LA_rdvyYBqZ0nkvniIA7CDz8w8cY-BuxCIf8vyV0NAvSZAZLzdih3Ou_Ff1FL8qPDDB4yMwchOJB-Rk")'
              }}
            />
          </>
        );
      default:
        return (
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-3 sm:px-4 bg-[#472426] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#5a2d30] transition-colors"
            aria-label={`View cart with ${cartCount} items`}
          >
            <span className="truncate">Cart ({cartCount})</span>
          </button>
        );
    }
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#472426] px-4 sm:px-10 py-3">
      <Link href="/" className="flex items-center gap-2 sm:gap-4 text-white hover:opacity-80 transition-opacity">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">Sinful Delights</h1>
      </Link>
      <nav className="flex flex-1 justify-end gap-2 sm:gap-8">
        <div className="hidden md:flex items-center gap-9">
          {getNavLinks()}
        </div>
        <div className="flex items-center gap-2">
          {getActionButton()}
        </div>
      </nav>
    </header>
  );
}