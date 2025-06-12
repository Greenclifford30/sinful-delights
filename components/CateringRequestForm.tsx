'use client';

import { useState } from 'react';
import { useCatering } from '@/context/CateringContext';
import WizardStep from './WizardStep';
import EventDetailsStep from './catering/EventDetailsStep';
import MenuSelectionStep from './catering/MenuSelectionStep';
import ReviewSubmitStep from './catering/ReviewSubmitStep';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewRequest: () => void;
}

function SuccessModal({ isOpen, onClose, onNewRequest }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1E1E1E] rounded-xl p-6 sm:p-8 max-w-md w-full border border-[#472426]">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h3 className="text-white text-xl font-bold mb-2">Request Submitted!</h3>
          <p className="text-[#c89295] text-sm mb-6">
            Thank you for your catering request. We&apos;ll contact you within 24 hours to discuss the details and provide a quote.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-[#472426] text-white rounded-lg hover:bg-[#5a2d30] transition-colors"
            >
              Close
            </button>
            <button
              onClick={onNewRequest}
              className="flex-1 px-4 py-2 bg-[#FF7A00] text-white rounded-lg hover:bg-[#E66A00] transition-colors"
            >
              New Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CateringRequestForm() {
  const {
    currentStep,
    setStep,
    validateStep,
    submitForm,
    resetForm,
    isSubmitting,
  } = useCatering();
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    try {
      await submitForm();
      setShowSuccessModal(true);
    } catch (error) {
      // Error is handled in the context
      console.error('Submission failed:', error);
    }
  };

  const handleNewRequest = () => {
    setShowSuccessModal(false);
    resetForm();
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <EventDetailsStep />;
      case 2:
        return <MenuSelectionStep />;
      case 3:
        return <ReviewSubmitStep />;
      default:
        return <EventDetailsStep />;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Event Details';
      case 2:
        return 'Menu Selection';
      case 3:
        return 'Review & Submit';
      default:
        return 'Event Details';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Tell us about your event and contact information';
      case 2:
        return 'Choose the perfect menu items for your guests';
      case 3:
        return 'Review your request and add any special notes';
      default:
        return '';
    }
  };

  return (
    <>
      <WizardStep
        title={getStepTitle()}
        description={getStepDescription()}
        currentStep={currentStep}
        totalSteps={3}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isValid={!isSubmitting}
      >
        {getStepContent()}
      </WizardStep>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onNewRequest={handleNewRequest}
      />
    </>
  );
}