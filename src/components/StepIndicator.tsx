"use client";

import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center flex-1">
            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step.id < currentStep
                  ? "bg-green-500 text-white"
                  : step.id === currentStep
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.id < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                step.id
              )}
            </div>

            {/* Label */}
            <span
              className={`mt-2 text-xs text-center ${
                step.id <= currentStep ? "text-gray-900 font-medium" : "text-gray-500"
              }`}
            >
              {step.name}
            </span>

            {/* Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute h-0.5 w-full top-4 left-1/2 -z-10 ${
                  step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                }`}
                style={{
                  width: `calc(100% / ${steps.length} - 2rem)`,
                  transform: `translateX(calc(50% + 1rem))`,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Simplified progress bar for mobile
export function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Langkah {currentStep} dari {totalSteps}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
