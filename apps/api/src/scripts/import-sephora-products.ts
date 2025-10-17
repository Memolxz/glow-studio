import { db } from '../db/db';
import { ProductCategoryType, BodyPart } from '@prisma/client';

interface SephoraProduct {
  brandName: string;
  currentSku: {
    listPrice: string;
    skuId: string;
  };
  displayName: string;
  heroImage: string;
  productId: string;
  rating: string;
  reviews: string;
  targetUrl: string;
}

interface CategoryConfig {
  apiEndpoint: string; // The Sephora category you're querying
  category: ProductCategoryType;
  bodyPart: BodyPart;
}

class SephoraImporter {
  // Define your category mappings
  private categories: CategoryConfig[] = [
    // Face products
    { apiEndpoint: 'moisturizer', category: 'MOISTURIZER', bodyPart: 'FACE' },
    { apiEndpoint: 'cleanser', category: 'CLEANSER', bodyPart: 'FACE' },
    { apiEndpoint: 'serum', category: 'SERUM', bodyPart: 'FACE' },
    { apiEndpoint: 'toner', category: 'TONER', bodyPart: 'FACE' },
    { apiEndpoint: 'sunscreen-face', category: 'SUNSCREEN', bodyPart: 'FACE' },
    { apiEndpoint: 'face-mask', category: 'MASK', bodyPart: 'FACE' },
    { apiEndpoint: 'exfoliator', category: 'EXFOLIANT', bodyPart: 'FACE' },
    { apiEndpoint: 'treatment', category: 'TREATMENT', bodyPart: 'FACE' },
    
    // Eye products
    { apiEndpoint: 'eye-cream', category: 'EYE_CREAM', bodyPart: 'EYES' },
    
    // Lip products
    { apiEndpoint: 'lip-balm', category: 'LIP_BALM', bodyPart: 'LIPS' },
  ];

  private apiKey = process.env.RAPIDAPI_KEY!;
  private apiHost = 'sephora.p.rapidapi.com';

  async fetchProducts(categoryEndpoint: string): Promise<SephoraProduct[]> {
    const url = `https://${this.apiHost}/products/list?categoryId=${categoryEndpoint}`;
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error(`Error fetching ${categoryEndpoint}:`, error);
      return [];
    }
  }

  parsePrice(priceString: string): number | null {
    // Handle ranges like "$25.00 - $93.00" -> take the lower price
    // Or single prices like "$25.00"
    try {
      const match = priceString.match(/\$([0-9.]+)/);
      if (match) {
        return parseFloat(match[1]);
      }
      return null;
    } catch {
      return null;
    }
  }

  async importCategory(config: CategoryConfig) {
    console.log(`\n📦 Importing ${config.apiEndpoint}...`);
    
    const products = await this.fetchProducts(config.apiEndpoint);
    
    if (products.length === 0) {
      console.log(`⚠️  No products found for ${config.apiEndpoint}`);
      return;
    }

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const product of products) {
      try {
        // Check if product already exists
        const existing = await db.product.findFirst({
          where: {
            OR: [
              { name: product.displayName },
              { officialUrl: `https://www.sephora.com${product.targetUrl}` }
            ]
          }
        });

        if (existing) {
          skipped++;
          continue;
        }

        // Import product
        await db.product.create({
          data: {
            name: product.displayName,
            brand: product.brandName,
            description: `${product.displayName} by ${product.brandName}`, // You can enhance this later
            officialUrl: `https://www.sephora.com${product.targetUrl}`,
            imageUrl: product.heroImage,
            price: this.parsePrice(product.currentSku.listPrice),
            rating: parseFloat(product.rating) || null,
            category: config.category,
            bodyPart: config.bodyPart,
          }
        });

        imported++;
        
        // Add a small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error importing ${product.displayName}:`, error);
        errors++;
      }
    }

    console.log(`✅ ${config.apiEndpoint}: ${imported} imported, ${skipped} skipped, ${errors} errors`);
  }

  async importAll() {
    console.log('🚀 Starting Sephora product import...\n');
    
    for (const config of this.categories) {
      await this.importCategory(config);
      
      // Add delay between categories to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n✨ Import complete!');
  }

  // Import only specific categories
  async importSpecific(categoryEndpoints: string[]) {
    console.log('🚀 Starting selective import...\n');
    
    const configsToImport = this.categories.filter(
      c => categoryEndpoints.includes(c.apiEndpoint)
    );

    for (const config of configsToImport) {
      await this.importCategory(config);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n✨ Import complete!');
  }
}

// Export for use in scripts
export default SephoraImporter;

// If running directly
if (require.main === module) {
  const importer = new SephoraImporter();
  
  // Import all categories
  importer.importAll()
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}