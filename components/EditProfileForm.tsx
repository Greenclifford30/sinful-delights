'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';

interface EditProfileFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

export default function EditProfileForm({ onSuccess, onCancel }: EditProfileFormProps) {
  const { user, updateProfile } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address.street || '',
      city: user?.address.city || '',
      state: user?.address.state || '',
      zipCode: user?.address.zipCode || '',
      country: user?.address.country || '',
    },
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (XXX) XXX-XXXX';
    }

    // Address validation
    const addressErrors: FormErrors['address'] = {};
    if (!formData.address.street.trim()) {
      addressErrors.street = 'Street address is required';
    }
    if (!formData.address.city.trim()) {
      addressErrors.city = 'City is required';
    }
    if (!formData.address.state.trim()) {
      addressErrors.state = 'State is required';
    }
    if (!formData.address.zipCode.trim()) {
      addressErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.address.zipCode)) {
      addressErrors.zipCode = 'Please enter a valid ZIP code';
    }
    if (!formData.address.country.trim()) {
      addressErrors.country = 'Country is required';
    }

    if (Object.keys(addressErrors).length > 0) {
      newErrors.address = addressErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === 'phone') {
      // Auto-format phone number
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        let formatted = digits;
        if (digits.length >= 6) {
          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        } else if (digits.length >= 3) {
          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        }
        setFormData(prev => ({ ...prev, [field]: formatted }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Clear field-specific errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddressChange = (field: keyof FormData['address'], value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));

    // Clear field-specific errors
    if (errors.address?.[field]) {
      setErrors(prev => ({
        ...prev,
        address: { ...prev.address, [field]: undefined }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await updateProfile(formData);
      
      if (success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onSuccess?.();
        }, 2000);

        // TODO: Send analytics event for profile update
        // analytics.track('profile_updated', {
        //   user_id: user?.id,
        //   updated_fields: Object.keys(formData)
        // });
      } else {
        setErrors({ name: 'Failed to update profile. Please try again.' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ name: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-[#c89295]">Please log in to edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] rounded-xl p-6 border border-[#472426]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-semibold">Edit Profile</h2>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-[#c89295] hover:text-white transition-colors"
            aria-label="Close edit form"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <p className="text-green-400 font-medium">Profile updated successfully!</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-white font-medium mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-[#c89295] text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 transition-colors ${
                  errors.name 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-[#472426] focus:ring-[#FF7A00]'
                }`}
                placeholder="Enter your full name"
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-red-400 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-[#c89295] text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 transition-colors ${
                  errors.phone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-[#472426] focus:ring-[#FF7A00]'
                }`}
                placeholder="(555) 123-4567"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                required
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-red-400 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="block text-[#c89295] text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 transition-colors ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-[#472426] focus:ring-[#FF7A00]'
              }`}
              placeholder="your.email@example.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-red-400 text-sm">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-white font-medium mb-4">Delivery Address</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="street" className="block text-[#c89295] text-sm font-medium mb-2">
                Street Address *
              </label>
              <input
                type="text"
                id="street"
                value={formData.address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 transition-colors ${
                  errors.address?.street 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-[#472426] focus:ring-[#FF7A00]'
                }`}
                placeholder="123 Main Street"
                aria-describedby={errors.address?.street ? 'street-error' : undefined}
                required
              />
              {errors.address?.street && (
                <p id="street-error" className="mt-1 text-red-400 text-sm">{errors.address.street}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-[#c89295] text-sm font-medium mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 transition-colors ${
                    errors.address?.city 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-[#472426] focus:ring-[#FF7A00]'
                  }`}
                  placeholder="Springfield"
                  aria-describedby={errors.address?.city ? 'city-error' : undefined}
                  required
                />
                {errors.address?.city && (
                  <p id="city-error" className="mt-1 text-red-400 text-sm">{errors.address.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-[#c89295] text-sm font-medium mb-2">
                  State *
                </label>
                <input
                  type="text"
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 transition-colors ${
                    errors.address?.state 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-[#472426] focus:ring-[#FF7A00]'
                  }`}
                  placeholder="CA"
                  aria-describedby={errors.address?.state ? 'state-error' : undefined}
                  required
                />
                {errors.address?.state && (
                  <p id="state-error" className="mt-1 text-red-400 text-sm">{errors.address.state}</p>
                )}
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-[#c89295] text-sm font-medium mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white placeholder-[#c89295] focus:outline-none focus:ring-2 transition-colors ${
                    errors.address?.zipCode 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-[#472426] focus:ring-[#FF7A00]'
                  }`}
                  placeholder="90210"
                  aria-describedby={errors.address?.zipCode ? 'zipCode-error' : undefined}
                  required
                />
                {errors.address?.zipCode && (
                  <p id="zipCode-error" className="mt-1 text-red-400 text-sm">{errors.address.zipCode}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-[#c89295] text-sm font-medium mb-2">
                Country *
              </label>
              <select
                id="country"
                value={formData.address.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                className={`w-full px-4 py-3 bg-[#121212] border rounded-lg text-white focus:outline-none focus:ring-2 transition-colors ${
                  errors.address?.country 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-[#472426] focus:ring-[#FF7A00]'
                }`}
                aria-describedby={errors.address?.country ? 'country-error' : undefined}
                required
              >
                <option value="">Select Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
              </select>
              {errors.address?.country && (
                <p id="country-error" className="mt-1 text-red-400 text-sm">{errors.address.country}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#472426]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#FF7A00] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#E66A00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting && (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none bg-[#472426] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#5a2d30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}