'use client';

import { useCatering } from '@/context/CateringContext';

export default function ReviewSubmitStep() {
  const { formData, updateFormData, errors } = useCatering();

  const handleNotesChange = (notes: string) => {
    updateFormData({ notes });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '';
    // Simple phone formatting - you might want to use a library for more robust formatting
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  return (
    <div className="space-y-8">
      {/* Event Details Review */}
      <div className="bg-[#121212] rounded-lg p-6 border border-[#472426]">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-[#FF7A00] rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
          Event Details
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[#c89295] text-sm">Event Date</p>
            <p className="text-white font-medium">{formatDate(formData.date)}</p>
          </div>
          <div>
            <p className="text-[#c89295] text-sm">Event Type</p>
            <p className="text-white font-medium">{formData.eventType}</p>
          </div>
          <div>
            <p className="text-[#c89295] text-sm">Number of Guests</p>
            <p className="text-white font-medium">{formData.guestCount} guests</p>
          </div>
          <div>
            <p className="text-[#c89295] text-sm">Venue</p>
            <p className="text-white font-medium">{formData.venue}</p>
          </div>
        </div>
      </div>

      {/* Contact Information Review */}
      <div className="bg-[#121212] rounded-lg p-6 border border-[#472426]">
        <h3 className="text-white text-lg font-semibold mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[#c89295] text-sm">Full Name</p>
            <p className="text-white font-medium">{formData.contactName}</p>
          </div>
          <div>
            <p className="text-[#c89295] text-sm">Email</p>
            <p className="text-white font-medium">{formData.contactEmail}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[#c89295] text-sm">Phone</p>
            <p className="text-white font-medium">{formatPhone(formData.contactPhone)}</p>
          </div>
        </div>
      </div>

      {/* Menu Selection Review */}
      <div className="bg-[#121212] rounded-lg p-6 border border-[#472426]">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-[#FF7A00] rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
          Selected Menu Items
        </h3>
        
        {formData.menuItems && formData.menuItems.length > 0 ? (
          <div className="space-y-3">
            {formData.menuItems.map((itemName, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-[#1E1E1E] rounded-lg">
                <div className="w-2 h-2 bg-[#FF7A00] rounded-full"></div>
                <span className="text-white font-medium">
                  {itemName.includes('Sinful') ? (
                    <>
                      <span className="text-[#8B0000] font-bold">Sinful</span>
                      {itemName.replace('Sinful', '')}
                    </>
                  ) : (
                    itemName
                  )}
                </span>
              </div>
            ))}
            <div className="mt-4 p-3 bg-[#FF7A00]/10 border border-[#FF7A00]/20 rounded-lg">
              <p className="text-[#c89295] text-sm">
                <span className="font-semibold">{formData.menuItems.length}</span> menu items selected for{' '}
                <span className="font-semibold">{formData.guestCount}</span> guests
              </p>
            </div>
          </div>
        ) : (
          <p className="text-[#c89295]">No menu items selected</p>
        )}
      </div>

      {/* Special Notes */}
      <div className="bg-[#121212] rounded-lg p-6 border border-[#472426]">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-[#FF7A00] rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
          Special Notes & Requests
        </h3>
        
        <div>
          <label htmlFor="notes" className="block text-white text-sm font-medium mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-[#472426] text-white placeholder-[#c89295] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-[#FF7A00] transition-colors resize-none"
            placeholder="Please include any special dietary requirements, setup preferences, or other important details for your event..."
          />
          <p className="text-[#c89295] text-xs mt-2">
            This is a great place to mention dietary restrictions, allergies, setup preferences, or any other special requirements.
          </p>
        </div>
      </div>

      {/* General Error Display */}
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-500 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Confirmation Notice */}
      <div className="bg-[#FF7A00]/10 border border-[#FF7A00]/20 rounded-lg p-6">
        <h4 className="text-white text-base font-semibold mb-2">What happens next?</h4>
        <ul className="text-[#c89295] text-sm space-y-1">
          <li>• You&apos;ll receive an email confirmation within a few minutes</li>
          <li>• Our catering team will contact you within 24 hours to discuss details</li>
          <li>• We&apos;ll provide a detailed quote and timeline for your event</li>
          <li>• Final menu and pricing can be adjusted based on your needs</li>
        </ul>
      </div>
    </div>
  );
}