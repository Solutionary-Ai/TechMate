import React, { useMemo, useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { DealSection } from '../components/DealSection';
import { loadLGProducts, getLGProducts } from '../data/lgProducts';
import { LGProduct } from '../utils/csvParser';
import { Tv, Zap } from 'lucide-react';

interface LGHomePageProps {
  onProductClick: (productId: string) => void;
}

export function LGHomePage({ onProductClick }: LGHomePageProps) {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<LGProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLGProducts().then(loaded => {
      setProducts(loaded);
      setLoading(false);
    });
  }, []);

  // Filter products by search
  const searchedProducts = useMemo(() => {
    if (!searchValue) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, products]);

  // Get hot deals (products with best savings)
  const hotDeals = useMemo(() => {
    return [...searchedProducts]
      .map(product => {
        const prices = [
          product.prices.jbhifi,
          product.prices.goodguys,
          product.prices.harveynorman,
        ].filter(p => p > 0);
        if (prices.length < 2) return { ...product, savings: 0, savingsPercent: 0 };
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const savings = maxPrice - minPrice;
        const savingsPercent = (savings / maxPrice) * 100;
        return { ...product, savings, savingsPercent };
      })
      .filter(p => p.savingsPercent > 0)
      .sort((a, b) => b.savingsPercent - a.savingsPercent)
      .slice(0, 8);
  }, [searchedProducts]);

  // All products sorted by lowest price
  const allProducts = useMemo(() => {
    return [...searchedProducts].sort((a, b) => {
      const aMin = Math.min(
        a.prices.jbhifi || Infinity,
        a.prices.goodguys || Infinity,
        a.prices.harveynorman || Infinity
      );
      const bMin = Math.min(
        b.prices.jbhifi || Infinity,
        b.prices.goodguys || Infinity,
        b.prices.harveynorman || Infinity
      );
      return aMin - bMin;
    });
  }, [searchedProducts]);

  // Group by screen size
  const productsBySize = useMemo(() => {
    const groups: Record<string, LGProduct[]> = {};
    searchedProducts.forEach(product => {
      const size = product.screenSize || 'Other';
      if (!groups[size]) groups[size] = [];
      groups[size].push(product);
    });
    return groups;
  }, [searchedProducts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading LG TVs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />

      {/* Hero Banner */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Tv className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <p className="text-xs sm:text-sm uppercase tracking-widest font-medium">
                  LG TV Price Comparison
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                LG TVs.
                <br />
                Best Prices.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Compare LG TV prices across JB Hi-Fi, The Good Guys & Harvey Norman.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 px-4 py-2 rounded">
                  <span className="text-2xl font-bold">{products.length}</span>
                  <span className="text-sm text-gray-300 ml-2">TVs tracked</span>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded">
                  <span className="text-2xl font-bold">3</span>
                  <span className="text-sm text-gray-300 ml-2">Retailers</span>
                </div>
              </div>
            </div>
            {hotDeals[0] && (
              <div className="hidden lg:block">
                <ProductCard
                  product={hotDeals[0]}
                  onClick={() => onProductClick(hotDeals[0].id)}
                  featured
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <Tv className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">No LG TVs loaded</h2>
            <p className="text-gray-500">
              Place your CSV file at <code className="bg-gray-100 px-2 py-1 rounded">public/data/lg-tvs.csv</code>
            </p>
          </div>
        ) : (
          <>
            {/* Hot Deals */}
            {hotDeals.length > 0 && (
              <DealSection
                title="🔥 Best Price Differences"
                subtitle="TVs with the biggest price gaps between retailers"
                products={hotDeals}
                onProductClick={onProductClick}
                featured
              />
            )}

            {/* All Products */}
            <DealSection
              title="📺 All LG TVs"
              subtitle={`${allProducts.length} TVs sorted by lowest price`}
              products={allProducts}
              onProductClick={onProductClick}
            />
          </>
        )}

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 mt-12">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">TechMate - LG TVs</h3>
            <p className="text-sm text-gray-600">
              Compare LG TV prices across Australia's leading retailers.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Prices updated from scraped data. Always verify with retailer before purchase.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
