export interface Product {
  id: string;
  name: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  category: 'tv' | 'laptop' | 'headphones' | 'appliances' | 'gaming';
  brand: string;
  prices: {
    jbhifi: number;
    goodguys: number;
    harveynorman: number;
  };
  rrp?: number; // Recommended retail price
  lastUpdated: Date;
  specs?: string;
}
export interface Retailer {
  id: 'jbhifi' | 'goodguys' | 'harveynorman';
  name: string;
  logo: string;
  url: string;
}
export const retailers: Retailer[] = [{
  id: 'jbhifi',
  name: 'JB Hi-Fi',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/JB_Hi-Fi_Logo.svg/320px-JB_Hi-Fi_Logo.svg.png',
  url: 'https://jbhifi.com.au'
}, {
  id: 'goodguys',
  name: 'The Good Guys',
  logo: 'https://www.thegoodguys.com.au/wcsstore/TGGCAS/images/logo.svg',
  url: 'https://thegoodguys.com.au'
}, {
  id: 'harveynorman',
  name: 'Harvey Norman',
  logo: 'https://www.harveynorman.com.au/media/wysiwyg/logo.svg',
  url: 'https://harveynorman.com.au'
}];
export const mockProducts: Product[] = [{
  id: '1',
  name: 'Samsung 65" QLED 4K Smart TV',
  image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80'],
  category: 'tv',
  brand: 'Samsung',
  prices: {
    jbhifi: 1899,
    goodguys: 1849,
    harveynorman: 1995
  },
  rrp: 2299,
  lastUpdated: new Date(),
  specs: 'Quantum Processor 4K, HDR10+, 120Hz'
}, {
  id: '2',
  name: 'Apple AirPods Pro (2nd Gen)',
  image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80', 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80'],
  category: 'headphones',
  brand: 'Apple',
  prices: {
    jbhifi: 399,
    goodguys: 379,
    harveynorman: 399
  },
  rrp: 449,
  lastUpdated: new Date(),
  specs: 'Active Noise Cancellation, Spatial Audio'
}, {
  id: '3',
  name: 'MacBook Air M2 13" 256GB',
  image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80'],
  category: 'laptop',
  brand: 'Apple',
  prices: {
    jbhifi: 1799,
    goodguys: 1749,
    harveynorman: 1849
  },
  rrp: 1999,
  lastUpdated: new Date(),
  specs: 'M2 chip, 8GB RAM, Midnight'
}, {
  id: '4',
  name: 'Sony WH-1000XM5 Wireless Headphones',
  image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'],
  category: 'headphones',
  brand: 'Sony',
  prices: {
    jbhifi: 549,
    goodguys: 499,
    harveynorman: 549
  },
  rrp: 599,
  lastUpdated: new Date(),
  specs: 'Industry-leading noise cancellation, 30hr battery'
}, {
  id: '5',
  name: 'LG 55" OLED C3 4K Smart TV',
  image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80'],
  category: 'tv',
  brand: 'LG',
  prices: {
    jbhifi: 2499,
    goodguys: 2399,
    harveynorman: 2549
  },
  rrp: 2799,
  lastUpdated: new Date(),
  specs: 'OLED evo, α9 Gen6 AI Processor, 120Hz'
}, {
  id: '6',
  name: 'Dell XPS 15 Laptop',
  image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80'],
  category: 'laptop',
  brand: 'Dell',
  prices: {
    jbhifi: 2899,
    goodguys: 2799,
    harveynorman: 2949
  },
  rrp: 3199,
  lastUpdated: new Date(),
  specs: 'Intel i7, 16GB RAM, 512GB SSD, RTX 3050'
}, {
  id: '7',
  name: 'PlayStation 5 Console',
  image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80'],
  category: 'gaming',
  brand: 'Sony',
  prices: {
    jbhifi: 799,
    goodguys: 799,
    harveynorman: 799
  },
  rrp: 799,
  lastUpdated: new Date(),
  specs: 'Disc Edition, 825GB SSD'
}, {
  id: '8',
  name: 'Dyson V15 Detect Vacuum',
  image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80'],
  category: 'appliances',
  brand: 'Dyson',
  prices: {
    jbhifi: 1299,
    goodguys: 1199,
    harveynorman: 1349
  },
  rrp: 1499,
  lastUpdated: new Date(),
  specs: 'Laser detection, 60min runtime'
}, {
  id: '9',
  name: 'Bose QuietComfort 45',
  image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'],
  category: 'headphones',
  brand: 'Bose',
  prices: {
    jbhifi: 499,
    goodguys: 449,
    harveynorman: 499
  },
  rrp: 549,
  lastUpdated: new Date(),
  specs: 'Noise cancelling, 24hr battery'
}, {
  id: '10',
  name: 'Samsung 43" 4K Smart TV',
  image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80'],
  category: 'tv',
  brand: 'Samsung',
  prices: {
    jbhifi: 699,
    goodguys: 649,
    harveynorman: 749
  },
  rrp: 899,
  lastUpdated: new Date(),
  specs: 'Crystal UHD, HDR, Smart Hub'
}, {
  id: '11',
  name: 'HP Pavilion 15.6" Laptop',
  image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'],
  category: 'laptop',
  brand: 'HP',
  prices: {
    jbhifi: 1299,
    goodguys: 1199,
    harveynorman: 1349
  },
  rrp: 1499,
  lastUpdated: new Date(),
  specs: 'Intel i5, 8GB RAM, 512GB SSD'
}, {
  id: '12',
  name: 'Breville Barista Express',
  image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
  images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80', 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80'],
  category: 'appliances',
  brand: 'Breville',
  prices: {
    jbhifi: 899,
    goodguys: 849,
    harveynorman: 949
  },
  rrp: 1099,
  lastUpdated: new Date(),
  specs: 'Built-in grinder, 15 bar pressure'
}];
export const categories = [{
  value: 'tv',
  label: 'TVs'
}, {
  value: 'laptop',
  label: 'Laptops'
}, {
  value: 'headphones',
  label: 'Headphones'
}, {
  value: 'appliances',
  label: 'Appliances'
}, {
  value: 'gaming',
  label: 'Gaming'
}];
export const brands = ['Samsung', 'Apple', 'Sony', 'LG', 'Dell', 'Dyson', 'Bose', 'HP', 'Breville'];