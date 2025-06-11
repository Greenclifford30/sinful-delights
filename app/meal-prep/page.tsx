'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function MealPlanPage() {
  const [selectedPlan, setSelectedPlan] = useState('5 meals');

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#221112] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'var(--font-plus-jakarta), var(--font-noto-sans), sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar variant="meal-prep" />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">Your plan</p>
                <p className="text-[#c89295] text-sm font-normal leading-normal">You&apos;re currently on the 5-meal plan. You can change your plan at any time.</p>
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Choose your plan</h2>
            <div className="flex flex-wrap gap-3 p-4">
              {['5 meals', '10 meals', '15 meals'].map((plan) => (
                <label
                  key={plan}
                  className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-white cursor-pointer ${
                    selectedPlan === plan
                      ? 'border-[3px] px-3.5 border-[#e92932]'
                      : 'border-[#663336]'
                  }`}
                >
                  {plan}
                  <input
                    type="radio"
                    className="invisible absolute"
                    name="meal-plan"
                    checked={selectedPlan === plan}
                    onChange={() => setSelectedPlan(plan)}
                  />
                </label>
              ))}
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your weekly menu</h2>
            <div className="flex flex-wrap items-center justify-center gap-6 p-4">
              <div className="flex min-w-72 max-w-[336px] flex-1 flex-col gap-0.5">
                <div className="flex items-center p-1 justify-between">
                  <button>
                    <div className="text-white flex size-10 items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                      </svg>
                    </div>
                  </button>
                  <p className="text-white text-base font-bold leading-tight flex-1 text-center">October 2024</p>
                  <button>
                    <div className="text-white flex size-10 items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="grid grid-cols-7">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <p key={day} className="text-white text-[13px] font-bold leading-normal tracking-[0.015em] flex h-12 w-full items-center justify-center pb-0.5">{day}</p>
                  ))}
                  <button className="h-12 w-full text-white col-start-4 text-sm font-medium leading-normal">
                    <div className="flex size-full items-center justify-center rounded-full">1</div>
                  </button>
                  {Array.from({ length: 29 }, (_, i) => (
                    <button key={i + 2} className="h-12 w-full text-white text-sm font-medium leading-normal">
                      <div className={`flex size-full items-center justify-center rounded-full ${i + 2 === 5 ? 'bg-[#e92932]' : ''}`}>
                        {i + 2}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#472426] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Skip this week</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#472426] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Pause your plan</span>
                </button>
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Billing</h2>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#663336] py-5">
                <p className="text-[#c89295] text-sm font-normal leading-normal">Next bill date</p>
                <p className="text-white text-sm font-normal leading-normal">October 28, 2024</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#663336] py-5">
                <p className="text-[#c89295] text-sm font-normal leading-normal">Payment method</p>
                <p className="text-white text-sm font-normal leading-normal">Visa ... 1234</p>
              </div>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#472426] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Edit payment method</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}