"use client";

import { ReactNode } from "react";

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
    <div className="min-h-screen bg-dark-400 flex flex-col">
      {/* Header */}
      <header className="bg-dark-200/80 backdrop-blur-xl border-b border-dark-50/50 px-5 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center shadow-glow">
              <span className="text-dark-400 font-bold text-sm">LN</span>
            </div>
            <div>
              <h1 className="font-bold text-text-primary text-base tracking-tight">
                LabaLaba Nusantara
              </h1>
              {title && (
                <p className="text-xs text-text-secondary">{title}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        {currentStep && totalSteps && (
          <div className="mt-4 animate-fade-in">
            <div className="flex justify-between text-xs text-text-secondary mb-2">
              <span>Langkah {currentStep} dari {totalSteps}</span>
              <span className="text-accent font-medium">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-dark-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-cyan rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 p-5 pb-24 animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark-200/80 backdrop-blur-xl border-t border-dark-50/50 px-5 py-4 text-center">
        <p className="text-xs text-text-muted">
          © 2024 LabaLaba Nusantara
        </p>
      </footer>
    </div>
  );
}
