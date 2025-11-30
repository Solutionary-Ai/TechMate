import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
interface SpecSectionProps {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}
export function SpecSection({
  title,
  content,
  defaultOpen = false
}: SpecSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return <div className="border-b border-gray-200">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-5 text-left hover:bg-gray-50 transition-colors px-4">
        <span className="font-medium text-sm uppercase tracking-wider">
          {title}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-4 pb-6 text-sm text-gray-600 leading-relaxed">
          {content}
        </div>}
    </div>;
}