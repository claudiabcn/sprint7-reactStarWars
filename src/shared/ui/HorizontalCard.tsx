import { ReactNode } from 'react';

interface HorizontalCardProps {
  children: ReactNode;
  onClick?: () => void;
}

export function HorizontalCard({ children, onClick }: HorizontalCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-lg hover:border-purple-300 hover:shadow-lg hover:shadow-purple-200/50 transition-all flex gap-3 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {children}
    </div>
  );
}