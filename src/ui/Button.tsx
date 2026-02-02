import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ children, onClick, disabled = false, variant = 'primary', className = '' }: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg transition-all font-medium";
  
  const variantClasses = {
    primary: "bg-purple-300 text-purple-900 hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-200/50",
    secondary: "bg-blue-200 text-blue-900 hover:bg-blue-300 hover:shadow-lg hover:shadow-blue-200/50"
  };
  
  const disabledClasses = "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}