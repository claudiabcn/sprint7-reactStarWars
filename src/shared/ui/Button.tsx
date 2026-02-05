import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({ 
  children, 
  disabled = false, 
  variant = 'primary', 
  className = '',
  type = 'button',
  isLoading = false,
  ...props
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg transition-all font-medium";
  
  const variantClasses = {
    primary: "bg-purple-300 text-purple-900 hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-200/50",
    secondary: "bg-blue-200 text-blue-900 hover:bg-blue-300 hover:shadow-lg hover:shadow-blue-200/50"
  };
  
  const disabledClasses = "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <button
      type={type} 
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-current/30 border-t-current"></div>
      ) : (
        children
      )}
    </button>
  );
}