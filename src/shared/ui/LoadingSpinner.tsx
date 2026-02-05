interface LoadingSpinnerProps {
  message?: string; 
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">

      <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500/30 border-t-purple-500"></div>
      {message && (
        <p className="mt-3 text-purple-400 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}