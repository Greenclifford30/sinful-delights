'use client';

import Image from 'next/image';
import { CateringProvider } from '@/context/CateringContext';
import Navbar from '@/components/Navbar';
import CateringRequestForm from '@/components/CateringRequestForm';

export default function CateringPage() {
  return (
    <CateringProvider>
      <div className="min-h-screen bg-[#121212]">
        <div className="relative flex size-full min-h-screen flex-col bg-[#121212] font-sans">
          <div className="layout-container flex h-full grow flex-col">
            <Navbar variant="catering" />

            {/* Hero Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-7xl mx-auto">
                <div
                  className="flex min-h-[300px] sm:min-h-[400px] flex-col gap-4 sm:gap-6 bg-cover bg-center bg-no-repeat lg:gap-8 lg:rounded-xl items-center justify-center px-4 pb-8 sm:pb-10 lg:px-10 text-center"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("/hero-bg.jpg")'
                  }}
                >
                  <div className="w-32 sm:w-40 lg:w-48 mb-4">
                    <Image
                      src="/SinfulDelights_StackedLogo-white.png"
                      alt="Sinful Delights"
                      width={192}
                      height={240}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </div>
                  
                  <div className="max-w-4xl">
                    <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
                      Catering Services
                    </h1>
                    <p className="text-white text-base sm:text-lg lg:text-xl font-normal leading-normal mb-6 max-w-2xl mx-auto">
                      Let us bring our <span className="text-[#8B0000] font-bold">sinful</span> flavors to your special event. 
                      From intimate gatherings to large celebrations, we&apos;ll create an unforgettable culinary experience.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FF7A00] rounded-full"></div>
                        <span>5-500 Guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FF7A00] rounded-full"></div>
                        <span>Custom Menus</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FF7A00] rounded-full"></div>
                        <span>Professional Service</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
                    Request Catering for Your Event
                  </h2>
                  <p className="text-[#c89295] text-base max-w-2xl mx-auto">
                    Fill out our simple form and we&apos;ll get back to you within 24 hours with a personalized quote 
                    and recommendations for your event.
                  </p>
                </div>

                <CateringRequestForm />
              </div>
            </div>

            {/* Features Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-6xl mx-auto">
                <h3 className="text-white text-2xl font-bold text-center mb-12">
                  Why Choose <span className="text-[#8B0000]">Sinful</span> Delights Catering?
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white text-lg font-semibold mb-2">Professional Service</h4>
                    <p className="text-[#c89295] text-sm">
                      Our experienced team handles everything from setup to cleanup, ensuring your event runs smoothly.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <h4 className="text-white text-lg font-semibold mb-2">Custom Menus</h4>
                    <p className="text-[#c89295] text-sm">
                      Work with our chefs to create the perfect menu tailored to your event and dietary requirements.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-white text-lg font-semibold mb-2">Quality Guaranteed</h4>
                    <p className="text-[#c89295] text-sm">
                      We use only the freshest ingredients and maintain the highest standards for food safety and quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CateringProvider>
  );
}