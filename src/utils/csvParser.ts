// CSV Parser for LG TV data
// Expected columns: Product Name, Screen Size, JB Hi-Fi Price, Good Guys Price, Harvey Norman Price, Product URL, Description, All Specs, Dimensions

export interface LGProduct {
  id: string;
  name: string;
  screenSize: string;
  image: string;
  images: string[];
  category: 'tv';
  brand: 'LG';
  prices: {
    jbhifi: number;
    goodguys: number;
    harveynorman: number;
  };
  productUrl: string;
  description: string;
  allSpecs: string;
  dimensions: string;
  lastUpdated: Date;
  specs: string;
}

function parsePrice(priceStr: string): number {
  if (!priceStr || priceStr === 'N/A' || priceStr === '') return 0;
  // Remove $, commas, and any whitespace
  const cleaned = priceStr.replace(/[$,\s]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

export function parseCSV(csvContent: string): LGProduct[] {
  const lines = csvContent.split('\n').filter(line => line.trim());

  if (lines.length < 2) return [];

  // Skip header row
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    const columns = parseCSVLine(line);

    // Columns: A=Product Name, B=Screen Size, C=JB Price, D=Good Guys Price, E=Harvey Norman Price, F=Product URL, G=Description, H=All Specs, I=Dimensions
    const [
      productName = '',
      screenSize = '',
      jbPrice = '',
      goodGuysPrice = '',
      harveyNormanPrice = '',
      productUrl = '',
      description = '',
      allSpecs = '',
      dimensions = ''
    ] = columns;

    // Extract screen size for specs summary
    const specsPreview = screenSize ? `${screenSize} Screen` : '';

    return {
      id: `lg-${index + 1}`,
      name: productName,
      screenSize,
      // TODO: Replace with real product images later
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80'],
      category: 'tv' as const,
      brand: 'LG' as const,
      prices: {
        jbhifi: parsePrice(jbPrice),
        goodguys: parsePrice(goodGuysPrice),
        harveynorman: parsePrice(harveyNormanPrice),
      },
      productUrl,
      description,
      allSpecs,
      dimensions,
      lastUpdated: new Date(),
      specs: specsPreview || allSpecs.substring(0, 100),
    };
  }).filter(product => product.name && (product.prices.jbhifi > 0 || product.prices.goodguys > 0 || product.prices.harveynorman > 0));
}
