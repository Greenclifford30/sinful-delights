'use client';

import { ReactNode } from 'react';

interface WizardStepProps {
  title: string;
  description?: string;
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
  nextLabel?: string;
  submitLabel?: string;
}

export default function WizardStep({
  title,
  description,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting = false,
  isValid = true,
  nextLabel = 'Next',
  submitLabel = 'Submit Request',
}: WizardStepProps) {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    isCompleted
                      ? 'bg-[#FF7A00] text-white'
                      : isCurrent
                      ? 'bg-[#FF7A00] text-white'
                      : 'bg-[#1E1E1E] text-[#c89295] border border-[#472426]'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                {stepNumber < totalSteps && (
                  <div
                    className={`h-0.5 w-16 sm:w-24 transition-colors ${
                      isCompleted ? 'bg-[#FF7A00]' : 'bg-[#472426]'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <p className="text-[#c89295] text-sm">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-[#1E1E1E] rounded-xl p-6 sm:p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-[#c89295] text-base">{description}</p>
          )}
        </div>
        
        {children}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstStep}
          className={`flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
            isFirstStep
              ? 'bg-[#472426] text-[#c89295] cursor-not-allowed'
              : 'bg-[#472426] text-white hover:bg-[#5a2d30]'
          }`}
        >
          <span className="truncate">← Previous</span>
        </button>

        <div className="flex gap-4">
          {isLastStep ? (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!isValid || isSubmitting}
              className={`flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
                !isValid || isSubmitting
                  ? 'bg-[#472426] text-[#c89295] cursor-not-allowed'
                  : 'bg-[#FF7A00] text-white hover:bg-[#E66A00]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span className="truncate">Submitting...</span>
                </>
              ) : (
                <span className="truncate">{submitLabel}</span>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              disabled={!isValid}
              className={`flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
                !isValid
                  ? 'bg-[#472426] text-[#c89295] cursor-not-allowed'
                  : 'bg-[#FF7A00] text-white hover:bg-[#E66A00]'
              }`}
            >
              <span className="truncate">{nextLabel} →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}