'use client';

import { useCatering } from '@/context/CateringContext';

const eventTypes = [
  'Corporate Event',
  'Wedding Reception',
  'Birthday Party',
  'Anniversary Celebration',
  'Business Meeting',
  'Holiday Party',
  'Graduation Celebration',
  'Baby Shower',
  'Retirement Party',
  'Other',
];

export default function EventDetailsStep() {
  const { formData, updateFormData, errors } = useCatering();

  const handleInputChange = (field: string, value: string | number) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Event Date */}
      <div>
        <label htmlFor="date" className="block text-white text-sm font-medium mb-2">
          Event Date *
        </label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className={`w-full px-4 py-3 rounded-lg bg-[#121212] border text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors ${
            errors.date ? 'border-red-500' : 'border-[#472426] focus:border-[#FF7A00]'
          }`}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date}</p>
        )}
      </div>

      {/* Event Type */}
      <div>
        <label htmlFor="eventType" className="block text-white text-sm font-medium mb-2">
          Event Type *
        </label>
        <select
          id="eventType"
          value={formData.eventType}
          onChange={(e) => handleInputChange('eventType', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg bg-[#121212] border text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors ${
            errors.eventType ? 'border-red-500' : 'border-[#472426] focus:border-[#FF7A00]'
          }`}
        >
          <option value="">Select event type</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.eventType && (
          <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
        )}
      </div>

      {/* Guest Count */}
      <div>
        <label htmlFor="guestCount" className="block text-white text-sm font-medium mb-2">
          Number of Guests *
        </label>
        <div className="relative">
          <input
            type="number"
            id="guestCount"
            value={formData.guestCount}
            onChange={(e) => handleInputChange('guestCount', parseInt(e.target.value) || 5)}
            min={5}
            max={500}
            className={`w-full px-4 py-3 rounded-lg bg-[#121212] border text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors ${
              errors.guestCount ? 'border-red-500' : 'border-[#472426] focus:border-[#FF7A00]'
            }`}
            placeholder="Enter number of guests (5-500)"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-[#c89295] text-sm">guests</span>
          </div>
        </div>
        {errors.guestCount && (
          <p className="text-red-500 text-sm mt-1">{errors.guestCount}</p>
        )}
        <p className="text-[#c89295] text-xs mt-1">Minimum 5 guests, maximum 500 guests</p>
      </div>

      {/* Venue */}
      <div>
        <label htmlFor="venue" className="block text-white text-sm font-medium mb-2">
          Venue Location *
        </label>
        <input
          type="text"
          id="venue"
          value={formData.venue}
          onChange={(e) => handleInputChange('venue', e.target.value)}
          className={`w-full px-4 py-3 rounded-lg bg-[#121212] border text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors ${
            errors.venue ? 'border-red-500' : 'border-[#472426] focus:border-[#FF7A00]'
          }`}
          placeholder="Enter venue name and address"
        />
        {errors.venue && (
          <p className="text-red-500 text-sm mt-1">{errors.venue}</p>
        )}
      </div>

      {/* Contact Information Section */}
      <div className="border-t border-[#472426] pt-6 mt-8">
        <h3 className="text-white text-lg font-semibold mb-4">Contact Information</h3>
        
        {/* Contact Name */}
        <div className="mb-4">
          <label htmlFor="contactName" className="block text-white text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="contactName"
            value={formData.contactName}
            onChange={(e) => handleInputChange('contactName', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-[#121212] border text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors ${
              errors.contactName ? 'border-red-500' : 'border-[#472426] focus:border-[#FF7A00]'
            }`}
            placeholder="Enter your full name"
          />
          {errors.contactName && (
            <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
          )}
        </div>

        {/* Contact Email */}
        <div className="mb-4">
          <label htmlFor="contactEmail" className="block text-white text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="contactEmail"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-[#121212] border text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors ${
              errors.contactEmail ? 'border-red-500' : 'border-[#472426] focus:border-[#FF7A00]'
            }`}
            placeholder="Enter your email address"
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
          )}
        </div>

        {/* Contact Phone */}
        <div>
          <label htmlFor="contactPhone" className="block text-white text-sm font-medium mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="contactPhone"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-[#121212] border text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] transition-colors ${
              errors.contactPhone ? 'border-red-500' : 'border-[#472426] focus:border-[#FF7A00]'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
          )}
        </div>
      </div>
    </div>
  );
}