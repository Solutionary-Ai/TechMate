import React from 'react';
import { LGProduct } from '../utils/csvParser';
import { formatPrice } from '../utils/priceUtils';
import { ExternalLink, TrendingDown } from 'lucide-react';
import { Button } from './Button';
import { RetailerLogo } from './RetailerLogo';

interface LGPriceComparisonProps {
  product: LGProduct;
}

interface RetailerPrice {
  id: 'jbhifi' | 'goodguys' | 'harveynorman';
  name: string;
  price: number;
  url: string;
  isBest: boolean;
}

export function LGPriceComparison({ product }: LGPriceComparisonProps) {
  // Build retailer data with URLs
  const retailers: RetailerPrice[] = [
    {
      id: 'jbhifi',
      name: 'JB Hi-Fi',
      price: product.prices.jbhifi,
      url: product.productUrl || 'https://www.jbhifi.com.au',
      isBest: false,
    },
    {
      id: 'goodguys',
      name: 'The Good Guys',
      price: product.prices.goodguys,
      // Use Good Guys URL if available (column J), otherwise fallback
      url: product.goodGuysUrl || 'https://www.thegoodguys.com.au',
      isBest: false,
    },
    {
      id: 'harveynorman',
      name: 'Harvey Norman',
      price: product.prices.harveynorman,
      // Use Harvey Norman URL if available (column K), otherwise fallback
      url: product.harveyNormanUrl || 'https://www.harveynorman.com.au',
      isBest: false,
    },
  ].filter(r => r.price > 0); // Only show retailers with prices

  if (retailers.length === 0) {
    return (
      <div className="p-6 bg-gray-100 text-center">
        <p className="text-gray-500">No prices available</p>
      </div>
    );
  }

  // Sort by price and mark best
  retailers.sort((a, b) => a.price - b.price);
  const bestPrice = retailers[0].price;
  retailers.forEach(r => {
    r.isBest = r.price === bestPrice;
  });

  const bestRetailer = retailers[0];

  return (
    <div className="space-y-6">
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
            {retailers.length > 1 && (
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-gray-300">
                  Save up to {formatPrice(retailers[retailers.length - 1].price - bestRetailer.price)} vs other retailers
                </span>
              </div>
            )}
          </div>
          <div className="bg-white p-3">
            <RetailerLogo retailerId={bestRetailer.id} size="lg" />
          </div>
        </div>
      </div>

      {/* Primary CTA - Goes to actual product page */}
      <Button
        variant="primary"
        fullWidth
        onClick={() => window.open(bestRetailer.url, '_blank')}
        className="py-4 text-lg font-medium"
      >
        Buy at {bestRetailer.name}
        <ExternalLink className="w-5 h-5 ml-2" />
      </Button>

      {/* Other Retailers */}
      {retailers.length > 1 && (
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Also Available At
          </p>
          {retailers.slice(1).map(retailer => {
            const priceDiff = retailer.price - bestRetailer.price;
            const hasDirectLink = (retailer.id === 'goodguys' && product.goodGuysUrl) ||
                                  (retailer.id === 'harveynorman' && product.harveyNormanUrl);

            return (
              <div
                key={retailer.id}
                className="flex items-center justify-between p-4 border border-gray-200 hover:border-gray-400 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <RetailerLogo retailerId={retailer.id} size="md" />
                  <div>
                    <p className="text-xl font-bold">{formatPrice(retailer.price)}</p>
                    {priceDiff > 0 && (
                      <p className="text-xs text-gray-500">${priceDiff.toFixed(0)} more</p>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.open(retailer.url, '_blank')}
                  className="flex items-center gap-2"
                >
                  {hasDirectLink ? 'Buy' : 'Search'}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Trust Signals */}
      <div className="pt-4 border-t border-gray-200 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Prices from live scraping</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Direct links to retailer product pages</span>
        </div>
      </div>

      {/* Price Alert CTA */}
      <button className="w-full py-3 border border-gray-300 hover:border-black hover:bg-gray-50 transition-all text-sm font-medium">
        🔔 Notify me when price drops
      </button>
    </div>
  );
}
