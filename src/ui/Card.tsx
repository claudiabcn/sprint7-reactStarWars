import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
}

export function Card({ children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-starwars-gray border-2 border-starwars-yellow rounded-lg hover:border-yellow-400 hover:shadow-lg hover:shadow-starwars-yellow/50 cursor-pointer transition-all"
    >
      {children}
    </div>
  );
}