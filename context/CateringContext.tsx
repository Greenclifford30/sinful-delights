'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CateringFormData {
  // Step 1: Event Details
  date: string;
  eventType: string;
  guestCount: number;
  venue: string;
  
  // Contact Information
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Step 2: Menu Selection
  menuItems: string[];
  
  // Step 3: Additional Details
  notes: string;
}

interface CateringState {
  currentStep: number;
  formData: CateringFormData;
  errors: Partial<Record<keyof CateringFormData | 'general', string>>;
  isSubmitting: boolean;
}

type CateringAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<CateringFormData> }
  | { type: 'SET_ERRORS'; payload: Partial<Record<keyof CateringFormData | 'general', string>> }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET_FORM' };

interface CateringContextType extends CateringState {
  setStep: (step: number) => void;
  updateFormData: (data: Partial<CateringFormData>) => void;
  setErrors: (errors: Partial<Record<keyof CateringFormData | 'general', string>>) => void;
  clearErrors: () => void;
  setSubmitting: (submitting: boolean) => void;
  resetForm: () => void;
  validateStep: (step: number) => boolean;
  submitForm: () => Promise<void>;
}

const CateringContext = createContext<CateringContextType | undefined>(undefined);

const initialFormData: CateringFormData = {
  date: '',
  eventType: '',
  guestCount: 5,
  venue: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  menuItems: [],
  notes: '',
};

const initialState: CateringState = {
  currentStep: 1,
  formData: initialFormData,
  errors: {},
  isSubmitting: false,
};

function cateringReducer(state: CateringState, action: CateringAction): CateringState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    
    case 'RESET_FORM':
      return initialState;
    
    default:
      return state;
  }
}

export function CateringProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cateringReducer, initialState);

  const setStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const updateFormData = (data: Partial<CateringFormData>) => {
    dispatch({ type: 'UPDATE_FORM_DATA', payload: data });
  };

  const setErrors = (errors: Partial<Record<keyof CateringFormData | 'general', string>>) => {
    dispatch({ type: 'SET_ERRORS', payload: errors });
  };

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const setSubmitting = (submitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: submitting });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const validateStep = (step: number): boolean => {
    const errors: Partial<Record<keyof CateringFormData | 'general', string>> = {};

    switch (step) {
      case 1: // Event Details
        if (!state.formData.date) {
          errors.date = 'Event date is required';
        }
        if (!state.formData.eventType) {
          errors.eventType = 'Event type is required';
        }
        if (state.formData.guestCount < 5 || state.formData.guestCount > 500) {
          errors.guestCount = 'Guest count must be between 5 and 500';
        }
        if (!state.formData.venue) {
          errors.venue = 'Venue is required';
        }
        if (!state.formData.contactName) {
          errors.contactName = 'Contact name is required';
        }
        if (!state.formData.contactEmail) {
          errors.contactEmail = 'Contact email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.formData.contactEmail)) {
          errors.contactEmail = 'Please enter a valid email address';
        }
        if (!state.formData.contactPhone) {
          errors.contactPhone = 'Contact phone is required';
        }
        break;

      case 2: // Menu Selection
        if (state.formData.menuItems.length === 0) {
          errors.menuItems = 'Please select at least one menu item';
        }
        break;

      case 3: // Review & Submit - all validation already done
        break;
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }

    clearErrors();
    return true;
  };

  const submitForm = async (): Promise<void> => {
    try {
      setSubmitting(true);
      
      // TODO: Replace with actual API call to /api/catering-request
      // const response = await fetch('/api/catering-request', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(state.formData),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to submit catering request');
      // }
      // 
      // const result = await response.json();

      // TODO: Send analytics event for catering request submission
      // analytics.track('catering_request_submitted', {
      //   event_type: state.formData.eventType,
      //   guest_count: state.formData.guestCount,
      //   menu_items_count: state.formData.menuItems.length,
      //   has_notes: state.formData.notes.length > 0
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Catering request submitted:', state.formData);
      
      // TODO: Send confirmation email to customer
      // TODO: Send notification to admin/catering team
      // emailService.sendCateringConfirmation(state.formData.contactEmail, state.formData);
      // notificationService.notifyAdmins('new_catering_request', state.formData);
      
    } catch (error) {
      console.error('Error submitting catering request:', error);
      setErrors({ general: 'Failed to submit request. Please try again.' });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <CateringContext.Provider
      value={{
        ...state,
        setStep,
        updateFormData,
        setErrors,
        clearErrors,
        setSubmitting,
        resetForm,
        validateStep,
        submitForm,
      }}
    >
      {children}
    </CateringContext.Provider>
  );
}

export function useCatering() {
  const context = useContext(CateringContext);
  if (context === undefined) {
    throw new Error('useCatering must be used within a CateringProvider');
  }
  return context;
}