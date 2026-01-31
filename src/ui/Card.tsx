import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
}

export function Card({ children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer transition-shadow"
    >
      {children}
    </div>
  );
}