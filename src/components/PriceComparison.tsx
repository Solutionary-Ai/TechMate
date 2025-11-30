import React from 'react';
import { Product, retailers } from '../data/mockProducts';
import { formatPrice, getBestPrice } from '../utils/priceUtils';
import { ExternalLink, TrendingDown } from 'lucide-react';
import { Button } from './Button';
import { RetailerLogo } from './RetailerLogo';
interface PriceComparisonProps {
  product: Product;
}
export function PriceComparison({
  product
}: PriceComparisonProps) {
  const bestPrice = getBestPrice(product.prices);
  const priceData = retailers.map(retailer => ({
    ...retailer,
    price: product.prices[retailer.id],
    isBest: product.prices[retailer.id] === bestPrice.price
  })).sort((a, b) => a.price - b.price);
  const bestRetailer = priceData[0];
  return <div className="space-y-6">
      {/* Best Price Hero */}
      <div className="bg-black text-white p-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown className="w-5 h-5" />
          <p className="text-sm uppercase tracking-wider">Best Price</p>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-5xl font-bold mb-2">
              {formatPrice(bestRetailer.price)}
            </p>
            {product.rrp && product.rrp > bestRetailer.price && <div className="flex items-baseline gap-3">
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.rrp)}
                </span>
                <span className="text-sm font-medium">
                  Save {formatPrice(product.rrp - bestRetailer.price)}
                </span>
              </div>}
          </div>
          <div className="bg-white p-3">
            <RetailerLogo retailerId={bestRetailer.id} size="lg" />
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <Button variant="primary" fullWidth onClick={() => window.open(bestRetailer.url, '_blank')} className="py-4 text-lg font-medium">
        Get Best Price at {bestRetailer.name}
        <ExternalLink className="w-5 h-5 ml-2" />
      </Button>

      {/* Other Retailers */}
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
          Also Available At
        </p>
        {priceData.slice(1).map(retailer => {
        const priceDiff = retailer.price - bestRetailer.price;
        return <div key={retailer.id} className="flex items-center justify-between p-4 border border-gray-200 hover:border-gray-400 transition-colors">
              <div className="flex items-center gap-4">
                <RetailerLogo retailerId={retailer.id} size="md" />
                <div>
                  <p className="text-xl font-bold">
                    {formatPrice(retailer.price)}
                  </p>
                  {priceDiff > 0 && <p className="text-xs text-gray-500">${priceDiff} more</p>}
                </div>
              </div>
              <Button variant="outline" onClick={() => window.open(retailer.url, '_blank')} className="flex items-center gap-2">
                View
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>;
      })}
      </div>

      {/* Trust Signals */}
      <div className="pt-4 border-t border-gray-200 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Prices updated in real-time</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Secure redirect to official retailers</span>
        </div>
      </div>

      {/* Price Alert CTA */}
      <button className="w-full py-3 border border-gray-300 hover:border-black hover:bg-gray-50 transition-all text-sm font-medium">
        🔔 Notify me when price drops
      </button>
    </div>;
}