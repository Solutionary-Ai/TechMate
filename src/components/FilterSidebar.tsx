import React from 'react';
import { categories, brands } from '../data/mockProducts';
import { SlidersHorizontal } from 'lucide-react';
interface FilterSidebarProps {
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
}
export function FilterSidebar({
  selectedCategories,
  selectedBrands,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
  onClearFilters
}: FilterSidebarProps) {
  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0;
  return <aside className="w-64 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="font-bold text-lg">Filters</h2>
        </div>
        {hasActiveFilters && <button onClick={onClearFilters} className="text-sm text-gray-500 hover:text-black transition-colors underline">
            Clear
          </button>}
      </div>

      {/* Price Range */}
      <div className="mb-10">
        <h3 className="font-medium mb-4 text-sm uppercase tracking-wider">
          Price Range
        </h3>
        <div className="space-y-3">
          <input type="range" min="0" max="5000" step="100" value={priceRange[1]} onChange={e => onPriceRangeChange([0, parseInt(e.target.value)])} className="w-full accent-black" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span className="font-medium text-black">
              ${priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-10">
        <h3 className="font-medium mb-4 text-sm uppercase tracking-wider">
          Category
        </h3>
        <div className="space-y-3">
          {categories.map(category => <label key={category.value} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={selectedCategories.includes(category.value)} onChange={() => onCategoryChange(category.value)} className="w-4 h-4 border-gray-300 text-black focus:ring-black cursor-pointer" />
              <span className="text-sm group-hover:text-black transition-colors">
                {category.label}
              </span>
            </label>)}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-4 text-sm uppercase tracking-wider">
          Brand
        </h3>
        <div className="space-y-3">
          {brands.map(brand => <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => onBrandChange(brand)} className="w-4 h-4 border-gray-300 text-black focus:ring-black cursor-pointer" />
              <span className="text-sm group-hover:text-black transition-colors">
                {brand}
              </span>
            </label>)}
        </div>
      </div>
    </aside>;
}