import React, { createElement } from 'react';
import { retailers } from '../data/mockProducts';
interface RetailerLogoProps {
  retailerId: 'jbhifi' | 'goodguys' | 'harveynorman';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function RetailerLogo({
  retailerId,
  size = 'md',
  className = ''
}: RetailerLogoProps) {
  const retailer = retailers.find(r => r.id === retailerId);
  if (!retailer) return null;
  const sizeClasses = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8'
  };
  return <img src={retailer.logo} alt={retailer.name} className={`${sizeClasses[size]} w-auto object-contain ${className}`} onError={e => {
    // Fallback to text if logo fails to load
    e.currentTarget.style.display = 'none';
    const span = document.createElement('span');
    span.textContent = retailer.name;
    span.className = 'text-xs font-medium text-gray-700';
    e.currentTarget.parentNode?.appendChild(span);
  }} />;
}