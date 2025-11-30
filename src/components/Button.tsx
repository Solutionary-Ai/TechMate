import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  className?: string;
}
export function Button({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  className = ''
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200 focus:ring-gray-400',
    outline: 'border-2 border-black text-black hover:bg-black hover:text-white focus:ring-black'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  return <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}>
      {children}
    </button>;
}