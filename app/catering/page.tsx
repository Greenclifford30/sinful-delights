import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function CateringConfirmation() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#221112] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'var(--font-plus-jakarta), var(--font-noto-sans), sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar variant="catering" />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Your event is booked!</h2>
            <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">We&apos;ve received your request and will send you a quote within 24 hours.</p>
            <div className="flex px-4 py-3 justify-center">
              <Link 
                href="/"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e92932] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}