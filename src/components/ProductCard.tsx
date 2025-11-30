import React from 'react';
import { Product } from '../data/mockProducts';
import { formatPrice, getBestPrice } from '../utils/priceUtils';
import { RetailerLogo } from './RetailerLogo';
interface ProductCardProps {
  product: Product;
  onClick: () => void;
  featured?: boolean;
}
export function ProductCard({
  product,
  onClick,
  featured = false
}: ProductCardProps) {
  const bestPrice = getBestPrice(product.prices);
  const hasSavings = bestPrice.savings > 0;
  const bestRetailerId = Object.entries(product.prices).find(([_, price]) => price === bestPrice.price)?.[0] as 'jbhifi' | 'goodguys' | 'harveynorman' | undefined;
  return <article onClick={onClick} className={`group bg-white overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-200 active:scale-95 ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
      {/* Image */}
      <div className={`relative overflow-hidden bg-gray-50 ${featured ? 'aspect-[16/10]' : 'aspect-square'}`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {hasSavings && product.rrp && <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold">
            SAVE {formatPrice(bestPrice.savings)}
          </div>}
      </div>

      {/* Content */}
      <div className={`p-4 sm:p-5 ${featured ? 'lg:p-8' : ''}`}>
        {/* Brand */}
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className={`font-bold text-gray-900 mb-3 sm:mb-4 line-clamp-2 ${featured ? 'text-xl sm:text-2xl min-h-[3.5rem] sm:min-h-[4rem]' : 'text-sm sm:text-base min-h-[2.5rem] sm:min-h-[3rem]'}`}>
          {product.name}
        </h3>

        {/* Best Price */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                Best Price
              </p>
              <p className={`font-bold text-black ${featured ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
                {formatPrice(bestPrice.price)}
              </p>
            </div>
            {bestRetailerId && <RetailerLogo retailerId={bestRetailerId} size={featured ? 'lg' : 'md'} />}
          </div>

          {/* RRP comparison */}
          {product.rrp && product.rrp > bestPrice.price && <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm text-gray-400 line-through">
                RRP {formatPrice(product.rrp)}
              </p>
              <p className="text-xs font-medium text-gray-600">
                (
                {Math.round((product.rrp - bestPrice.price) / product.rrp * 100)}
                % off)
              </p>
            </div>}

          {/* CTA - Touch Friendly */}
          <button className="w-full py-2.5 sm:py-3 border-2 border-black text-black font-medium hover:bg-black hover:text-white active:scale-95 transition-all text-sm sm:text-base min-h-[44px]">
            Compare Prices
          </button>
        </div>
      </div>
    </article>;
}