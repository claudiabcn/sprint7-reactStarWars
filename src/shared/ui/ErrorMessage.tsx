import { ReactNode } from 'react';
import { Button } from './Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  children?: ReactNode;
}

export function ErrorMessage({ message, onRetry, children }: ErrorMessageProps) {
  return (
    <div className="p-8 text-center">
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 inline-block max-w-md">
        <div className="text-red-600 mb-4">
          <svg 
            className="w-16 h-16 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <p className="text-red-600 font-bold mb-4 text-lg">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            Try Again
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}