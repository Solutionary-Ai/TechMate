import { parseCSV, LGProduct } from '../utils/csvParser';

// This will hold the loaded LG products
let lgProducts: LGProduct[] = [];
let isLoaded = false;
let loadPromise: Promise<LGProduct[]> | null = null;

export async function loadLGProducts(): Promise<LGProduct[]> {
  if (isLoaded) return lgProducts;

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      // Fetch the CSV file from public folder
      const basePath = import.meta.env.BASE_URL || '/';
      const response = await fetch(`${basePath}data/lg-tvs.csv`);

      if (!response.ok) {
        console.warn('LG TV CSV not found, using empty dataset');
        lgProducts = [];
        isLoaded = true;
        return lgProducts;
      }

      const csvContent = await response.text();
      lgProducts = parseCSV(csvContent);
      isLoaded = true;
      return lgProducts;
    } catch (error) {
      console.error('Error loading LG products:', error);
      lgProducts = [];
      isLoaded = true;
      return lgProducts;
    }
  })();

  return loadPromise;
}

export function getLGProducts(): LGProduct[] {
  return lgProducts;
}

export function getLGProductById(id: string): LGProduct | undefined {
  return lgProducts.find(p => p.id === id);
}
