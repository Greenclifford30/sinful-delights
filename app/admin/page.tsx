'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Chocolate Lava Cake',
    description: 'Rich chocolate cake with a molten center',
    price: 12,
    available: true,
  },
  {
    id: 2,
    name: 'Strawberry Cheesecake',
    description: 'Creamy cheesecake with fresh strawberries',
    price: 15,
    available: true,
  },
  {
    id: 3,
    name: 'Red Velvet Cupcakes',
    description: 'Moist red velvet cupcakes with cream cheese frosting',
    price: 10,
    available: true,
  },
  {
    id: 4,
    name: 'Lemon Tart',
    description: 'Tangy lemon tart with a buttery crust',
    price: 14,
    available: false,
  },
  {
    id: 5,
    name: 'Carrot Cake',
    description: 'Classic carrot cake with cream cheese frosting',
    price: 13,
    available: true,
  },
];

export default function AdminPage() {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const toggleAvailability = (id: number) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#221112]" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#221112] p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 sm:gap-4 text-white">
                  <Image 
                    src="/SinfulDelights_StackedLogo-white.png" 
                    alt="Sinful Delights Logo" 
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <h1 className="text-white text-base font-medium leading-normal">Sinful Delights</h1>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#472426]">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium leading-normal">Menu Manager</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium leading-normal">Orders</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M104,32H64A16,16,0,0,0,48,48V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32Zm0,176H64V48h40ZM192,32H152a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Zm0,176H152V48h40Z" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium leading-normal">Catering</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium leading-normal">Subscriptions</p>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium leading-normal">Analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Menu Manager</p>
            </div>

            {/* Menu Table */}
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-[#663336] bg-[#221112]">
                <div className="w-full overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#331a1b]">
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal min-w-[200px]">Dish</th>
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal min-w-[300px]">Description</th>
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal min-w-[100px]">Price</th>
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal min-w-[120px]">Availability</th>
                        <th className="px-4 py-3 text-left text-white text-sm font-medium leading-normal min-w-[100px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map((item) => (
                        <tr key={item.id} className="border-t border-t-[#663336]">
                          <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">
                            {item.name}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-[#c89295] text-sm font-normal leading-normal">
                            {item.description}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-[#c89295] text-sm font-normal leading-normal">
                            ${item.price}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                            <button
                              onClick={() => toggleAvailability(item.id)}
                              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#472426] text-white text-sm font-medium leading-normal w-full hover:bg-[#5a2d30] transition-colors"
                            >
                              <span className="truncate">{item.available ? 'Available' : 'Unavailable'}</span>
                            </button>
                          </td>
                          <td className="h-[72px] px-4 py-2 text-[#c89295] text-sm font-bold leading-normal tracking-[0.015em]">
                            <button className="hover:text-white transition-colors">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Schedule</h2>
            <div className="flex flex-wrap items-center justify-center gap-6 p-4">
              {/* July Calendar */}
              <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                <div className="flex items-center p-1 justify-between">
                  <button>
                    <div className="text-white flex size-10 items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
                      </svg>
                    </div>
                  </button>
                  <p className="text-white text-base font-bold leading-tight flex-1 text-center pr-10">July 2024</p>
                </div>
                <div className="grid grid-cols-7">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <p key={i} className="text-white text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5">
                      {day}
                    </p>
                  ))}
                  {/* July calendar days */}
                  <button className="h-12 w-full text-white col-start-4 text-sm font-medium leading-normal">
                    <div className="flex size-full items-center justify-center rounded-full">1</div>
                  </button>
                  {[2, 3, 4].map(day => (
                    <button key={day} className="h-12 w-full text-white text-sm font-medium leading-normal">
                      <div className="flex size-full items-center justify-center rounded-full">{day}</div>
                    </button>
                  ))}
                  <button className="h-12 w-full text-white rounded-l-full bg-[#472426] text-sm font-medium leading-normal">
                    <div className="flex size-full items-center justify-center rounded-full bg-[#e92932]">5</div>
                  </button>
                  {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(day => (
                    <button key={day} className="h-12 w-full bg-[#472426] text-white text-sm font-medium leading-normal">
                      <div className="flex size-full items-center justify-center rounded-full">{day}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* August Calendar */}
              <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                <div className="flex items-center p-1 justify-between">
                  <p className="text-white text-base font-bold leading-tight flex-1 text-center pl-10">August 2024</p>
                  <button>
                    <div className="text-white flex size-10 items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="grid grid-cols-7">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <p key={i} className="text-white text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5">
                      {day}
                    </p>
                  ))}
                  {/* August calendar days */}
                  {[1, 2, 3, 4, 5, 6].map(day => (
                    <button key={day} className={`h-12 w-full bg-[#472426] text-white text-sm font-medium leading-normal ${day === 1 ? 'col-start-4' : ''}`}>
                      <div className="flex size-full items-center justify-center rounded-full">{day}</div>
                    </button>
                  ))}
                  <button className="h-12 w-full text-white rounded-r-full bg-[#472426] text-sm font-medium leading-normal">
                    <div className="flex size-full items-center justify-center rounded-full bg-[#e92932]">7</div>
                  </button>
                  {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(day => (
                    <button key={day} className="h-12 w-full text-white text-sm font-medium leading-normal">
                      <div className="flex size-full items-center justify-center rounded-full">{day}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}