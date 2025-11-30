import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart, Clock, ChevronUp } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { PriceComparison } from '../components/PriceComparison';
import { ImageGallery } from '../components/ImageGallery';
import { SpecSection } from '../components/SpecSection';
import { Button } from '../components/Button';
import { formatLastUpdated, formatPrice, getBestPrice } from '../utils/priceUtils';
import { retailers } from '../data/mockProducts';
interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}
export function ProductDetailPage({
  productId,
  onBack
}: ProductDetailPageProps) {
  const product = mockProducts.find(p => p.id === productId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  if (!product) {
    return <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-xl sm:text-2xl font-medium text-gray-400 mb-4">
            Product not found
          </p>
          <Button onClick={onBack}>Back to Home</Button>
        </div>
      </div>;
  }
  const images = product.images || [product.image];
  const bestPrice = getBestPrice(product.prices);
  const bestRetailer = retailers.find(r => product.prices[r.id] === bestPrice.price);
  return <div className="min-h-screen bg-white pb-20 sm:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors min-h-[44px] -ml-2 pl-2 pr-4">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>

            <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Add to favorites">
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-black stroke-black' : 'stroke-gray-400'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column: Images */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ImageGallery images={images} productName={product.name} />
          </div>

          {/* Right Column: Product Info & Pricing */}
          <div className="space-y-6 sm:space-y-8">
            {/* Product Header */}
            <div>
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider mb-2">
                {product.brand}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Last Updated */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Updated {formatLastUpdated(product.lastUpdated)}</span>
              </div>
            </div>

            {/* Price Comparison */}
            <div>
              <PriceComparison product={product} />
            </div>

            {/* Product Specifications */}
            <div className="border-t border-gray-200 pt-6 sm:pt-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Product Details
              </h2>

              <div className="border border-gray-200">
                <SpecSection title="Overview" defaultOpen={true} content={<div className="space-y-3">
                      <p className="text-sm sm:text-base">
                        {product.specs || 'Premium quality product from ' + product.brand}
                      </p>
                      <p className="text-xs text-gray-500">
                        Compare prices across Australia's leading electronics
                        retailers to ensure you get the best deal.
                      </p>
                    </div>} />

                <SpecSection title="Specifications" content={<ul className="space-y-2 text-sm sm:text-base">
                      <li className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Brand</span>
                        <span className="font-medium">{product.brand}</span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Category</span>
                        <span className="font-medium capitalize">
                          {product.category}
                        </span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-500">Model</span>
                        <span className="font-medium">{product.name}</span>
                      </li>
                      {product.specs && <li className="flex justify-between py-2">
                          <span className="text-gray-500">Key Features</span>
                          <span className="font-medium text-right max-w-xs">
                            {product.specs}
                          </span>
                        </li>}
                    </ul>} />

                <SpecSection title="What's Included" content={<ul className="space-y-2 list-disc list-inside text-sm sm:text-base">
                      <li>{product.name}</li>
                      <li>User Manual</li>
                      <li>Warranty Card</li>
                      <li>Original Packaging</li>
                    </ul>} />

                <SpecSection title="Warranty & Support" content={<div className="space-y-3 text-sm sm:text-base">
                      <p>
                        <strong>Manufacturer Warranty:</strong> Standard
                        manufacturer warranty applies. Warranty terms vary by
                        retailer and product.
                      </p>
                      <p>
                        <strong>Support:</strong> Contact the retailer directly
                        for product support, returns, and warranty claims.
                      </p>
                      <p className="text-xs text-gray-500">
                        TechMate is a price comparison service. All purchases
                        are made directly through the retailer's website.
                      </p>
                    </div>} />
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200">
              <h3 className="font-medium mb-3 text-sm sm:text-base">
                Delivery & Availability
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                Delivery options and availability vary by retailer. Check with
                your chosen retailer for specific delivery times and costs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="font-medium mb-1">JB Hi-Fi</p>
                  <p className="text-gray-600">In stock</p>
                </div>
                <div>
                  <p className="font-medium mb-1">The Good Guys</p>
                  <p className="text-gray-600">In stock</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Harvey Norman</p>
                  <p className="text-gray-600">In stock</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-2xl lg:hidden z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Best Price
            </p>
            <p className="text-2xl font-bold">{formatPrice(bestPrice.price)}</p>
          </div>
          {bestRetailer && <Button variant="primary" onClick={() => window.open(bestRetailer.url, '_blank')} className="flex-shrink-0 min-h-[56px] px-6 text-base font-bold">
              Get Best Price
            </Button>}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && <button onClick={() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })} className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 bg-black text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all z-40 min-h-[56px] min-w-[56px] flex items-center justify-center" aria-label="Scroll to top">
          <ChevronUp className="w-6 h-6" />
        </button>}
    </div>;
}