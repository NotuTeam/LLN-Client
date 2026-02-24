"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface MobileLayoutProps {
  children: ReactNode;
  title?: string;
  currentStep?: number;
  totalSteps?: number;
}

export default function MobileLayout({
  children,
  title,
  currentStep,
  totalSteps,
}: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Hidden when printing */}
      <header className="bg-white border-b border-gray-200 px-5 py-4 sticky top-0 z-10 no-print">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <Image
              src="/logo-bgn.png"
              alt="logo"
              width={50}
              height={50}
              className="animate-spin-slow"
            />
            <div>
              <h1 className="font-bold text-gray-900 text-base tracking-tight">
                LabaLaba Nusantara
              </h1>
              {title && <p className="text-xs text-gray-500">{title}</p>}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {currentStep && totalSteps && (
          <div className="mt-4 animate-fade-in">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>
                Langkah {currentStep} dari {totalSteps}
              </span>
              <span className="text-primary-600 font-medium">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 p-5 pb-24 animate-fade-in print:p-0 print:pb-0">
        {children}
      </main>

      {/* Footer - Hidden when printing */}
      <footer className="bg-white border-t border-gray-200 px-5 py-4 text-center no-print">
        <p className="text-xs text-gray-500">© 2024 LabaLaba Nusantara</p>
      </footer>
    </div>
  );
}
