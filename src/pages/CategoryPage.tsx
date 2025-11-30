import React, { useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductCard } from '../components/ProductCard';
import { mockProducts, categories } from '../data/mockProducts';
import { formatLastUpdated } from '../utils/priceUtils';
interface CategoryPageProps {
  category: string;
  onProductClick: (productId: string) => void;
  onBack: () => void;
}
export function CategoryPage({
  category,
  onProductClick,
  onBack
}: CategoryPageProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<'lowest' | 'savings' | 'newest'>('lowest');
  const categoryName = categories.find(c => c.value === category)?.label || category;
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      // Category filter
      if (product.category !== category) return false;
      // Search filter
      if (searchValue && !product.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Price filter
      const minPrice = Math.min(product.prices.jbhifi, product.prices.goodguys, product.prices.harveynorman);
      if (minPrice > priceRange[1]) {
        return false;
      }
      return true;
    });
    // Sort
    filtered.sort((a, b) => {
      const aMin = Math.min(a.prices.jbhifi, a.prices.goodguys, a.prices.harveynorman);
      const bMin = Math.min(b.prices.jbhifi, b.prices.goodguys, b.prices.harveynorman);
      const aMax = Math.max(a.prices.jbhifi, a.prices.goodguys, a.prices.harveynorman);
      const bMax = Math.max(b.prices.jbhifi, b.prices.goodguys, b.prices.harveynorman);
      const aSavings = aMax - aMin;
      const bSavings = bMax - bMin;
      if (sortBy === 'lowest') return aMin - bMin;
      if (sortBy === 'savings') return bSavings - aSavings;
      return 0;
    });
    return filtered;
  }, [category, searchValue, selectedBrands, priceRange, sortBy]);
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };
  const handleClearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
  };
  return <div className="min-h-screen bg-white">
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />

      {/* Category Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          <h1 className="text-4xl font-bold">{categoryName}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-600">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'} • Updated{' '}
            {formatLastUpdated(new Date())}
          </p>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
            <option value="lowest">Lowest Price</option>
            <option value="savings">Best Savings</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="flex gap-12">
          {/* Sidebar */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterSidebar selectedCategories={[]} selectedBrands={selectedBrands} priceRange={priceRange} onCategoryChange={() => {}} onBrandChange={handleBrandToggle} onPriceRangeChange={setPriceRange} onClearFilters={handleClearFilters} />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? <div className="text-center py-24">
                <p className="text-2xl font-medium text-gray-400 mb-2">
                  No products found
                </p>
                <p className="text-gray-500">
                  Try adjusting your filters or search
                </p>
              </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => <ProductCard key={product.id} product={product} onClick={() => onProductClick(product.id)} />)}
              </div>}
          </div>
        </div>
      </div>
    </div>;
}