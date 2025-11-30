import React, { useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { CategoryTile } from '../components/CategoryTile';
import { DealSection } from '../components/DealSection';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { Tv, Laptop, Headphones, Gamepad2, Microwave, Zap } from 'lucide-react';
interface HomePageProps {
  onProductClick: (productId: string) => void;
  onCategoryClick: (category: string) => void;
}
export function HomePage({
  onProductClick,
  onCategoryClick
}: HomePageProps) {
  const [searchValue, setSearchValue] = useState('');
  // Category data with icons
  const categories = [{
    id: 'tv',
    name: 'TVs',
    icon: Tv
  }, {
    id: 'laptop',
    name: 'Laptops',
    icon: Laptop
  }, {
    id: 'headphones',
    name: 'Audio',
    icon: Headphones
  }, {
    id: 'gaming',
    name: 'Gaming',
    icon: Gamepad2
  }, {
    id: 'appliances',
    name: 'Appliances',
    icon: Microwave
  }];
  // Get product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockProducts.forEach(product => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, []);
  // Filter products by search
  const searchedProducts = useMemo(() => {
    if (!searchValue) return mockProducts;
    return mockProducts.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchValue]);
  // Get hot deals (products with best savings percentage)
  const hotDeals = useMemo(() => {
    return [...searchedProducts].map(product => {
      const prices = [product.prices.jbhifi, product.prices.goodguys, product.prices.harveynorman];
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const savings = maxPrice - minPrice;
      const savingsPercent = product.rrp ? (product.rrp - minPrice) / product.rrp * 100 : 0;
      return {
        ...product,
        savings,
        savingsPercent
      };
    }).filter(p => p.savingsPercent > 0).sort((a, b) => b.savingsPercent - a.savingsPercent).slice(0, 8);
  }, [searchedProducts]);
  // Get top picks (highest value items)
  const topPicks = useMemo(() => {
    return [...searchedProducts].sort((a, b) => {
      const aMin = Math.min(a.prices.jbhifi, a.prices.goodguys, a.prices.harveynorman);
      const bMin = Math.min(b.prices.jbhifi, b.prices.goodguys, b.prices.harveynorman);
      return bMin - aMin;
    }).slice(0, 8);
  }, [searchedProducts]);
  // Get products by category
  const tvProducts = useMemo(() => searchedProducts.filter(p => p.category === 'tv').slice(0, 6), [searchedProducts]);
  const laptopProducts = useMemo(() => searchedProducts.filter(p => p.category === 'laptop').slice(0, 6), [searchedProducts]);
  return <div className="min-h-screen bg-white">
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />

      {/* Hero Banner - Mobile Optimized */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <p className="text-xs sm:text-sm uppercase tracking-widest font-medium">
                  Today's Hottest Deals
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Compare Prices.
                <br />
                Save Big.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                Find the best prices across JB Hi-Fi, The Good Guys & Harvey
                Norman.
              </p>
              <button onClick={() => {
              const dealsSection = document.getElementById('hot-deals');
              dealsSection?.scrollIntoView({
                behavior: 'smooth'
              });
            }} className="bg-white text-black px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors w-full sm:w-auto">
                Shop Deals Now
              </button>
            </div>
            {hotDeals[0] && <div className="hidden lg:block">
                <ProductCard product={hotDeals[0]} onClick={() => onProductClick(hotDeals[0].id)} featured />
              </div>}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories Section - Horizontal Scroll on Mobile */}
        <section className="py-8 sm:py-12 lg:py-16 border-b border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Shop by Category
          </h2>

          {/* Mobile: Horizontal Scroll */}
          <div className="lg:hidden flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4">
            {categories.map(category => <div key={category.id} className="snap-start">
                <CategoryTile name={category.name} icon={category.icon} count={categoryCounts[category.id] || 0} onClick={() => onCategoryClick(category.id)} />
              </div>)}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden lg:grid grid-cols-5 gap-4">
            {categories.map(category => <CategoryTile key={category.id} name={category.name} icon={category.icon} count={categoryCounts[category.id] || 0} onClick={() => onCategoryClick(category.id)} />)}
          </div>
        </section>

        {/* Hot Deals Section */}
        <div id="hot-deals">
          <DealSection title="🔥 Hot Deals This Week" subtitle="Biggest savings right now" products={hotDeals} onProductClick={onProductClick} featured />
        </div>

        {/* Top Picks */}
        <DealSection title="🏆 Top Picks" subtitle="Trending products across all retailers" products={topPicks} onProductClick={onProductClick} />

        {/* Featured: TVs */}
        {tvProducts.length > 0 && <DealSection title="📺 TVs on Sale" subtitle="Latest displays from Samsung, LG & more" products={tvProducts} onProductClick={onProductClick} />}

        {/* Featured: Laptops */}
        {laptopProducts.length > 0 && <DealSection title="💻 Laptops & Computing" subtitle="Power through work and play" products={laptopProducts} onProductClick={onProductClick} />}

        {/* Newsletter CTA - Mobile Optimized */}
        <section className="py-16 sm:py-20 lg:py-24 border-t border-gray-200">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Never Miss a Deal
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Spotted cheaper elsewhere? Tell us! We'll update our prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base" />
              <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 font-bold hover:bg-gray-800 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold mb-4">TechMate</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Australia's leading price comparison platform for electronics.
                Compare prices, save money.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
                Shop
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    All Deals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Brands
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Price Drops
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
                Help
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Report a Price
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Affiliate Disclosure
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              © 2024 TechMate. All prices checked across Australia.
            </p>
          </div>
        </div>
      </footer>
    </div>;
}