import { Product } from '../data/mockProducts';
export function formatPrice(price: number): string {
  return `$${price.toLocaleString('en-AU')}`;
}
export function getBestPrice(prices: Product['prices']): {
  retailer: string;
  price: number;
  savings: number;
} {
  const priceArray = [{
    retailer: 'JB Hi-Fi',
    price: prices.jbhifi
  }, {
    retailer: 'The Good Guys',
    price: prices.goodguys
  }, {
    retailer: 'Harvey Norman',
    price: prices.harveynorman
  }];
  const sorted = priceArray.sort((a, b) => a.price - b.price);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const savings = worst.price - best.price;
  return {
    retailer: best.retailer,
    price: best.price,
    savings
  };
}
export function getRetailerLogo(retailer: string): string {
  const logos: Record<string, string> = {
    'JB Hi-Fi': '🎵',
    'The Good Guys': '👍',
    'Harvey Norman': '🏪'
  };
  return logos[retailer] || '🏬';
}
export function formatLastUpdated(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  return date.toLocaleDateString('en-AU');
}