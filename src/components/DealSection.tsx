import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../data/mockProducts';
import { ProductCard } from './ProductCard';
interface DealSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onProductClick: (productId: string) => void;
  featured?: boolean;
}
export function DealSection({
  title,
  subtitle,
  products,
  onProductClick,
  featured = false
}: DealSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  if (products.length === 0) return null;
  return <section className="py-8 sm:py-12 lg:py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
            {title}
          </h2>
          {subtitle && <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              {subtitle}
            </p>}
        </div>

        {products.length > 3 && <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll('left')} className="p-2 sm:p-3 border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button onClick={() => scroll('right')} className="p-2 sm:p-3 border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>}
      </div>

      {/* Scrollable Product Grid - Touch Optimized */}
      <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0" style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    }}>
        {products.map((product, idx) => <div key={product.id} className={`flex-shrink-0 snap-start ${featured && idx === 0 ? 'w-[85vw] sm:w-[500px] lg:w-[600px]' : 'w-[70vw] sm:w-[280px] lg:w-[320px]'}`}>
            <ProductCard product={product} onClick={() => onProductClick(product.id)} featured={featured && idx === 0} />
          </div>)}
      </div>
    </section>;
}