// apps/api/src/scripts/import-sephora-with-ingredients.ts

import { db } from '../db/db';
import { ProductCategoryType, BodyPart } from '@prisma/client';
import https from 'https';

interface SephoraProduct {
  productId: string;
  displayName: string;
  brand: {
    displayName: string;
  };
  currentSku: {
    listPrice: string;
    skuImages: {
      imageUrl: string;
    };
  };
  rating?: number;
  fullSiteProductUrl: string;
}

interface CategoryConfig {
  sephoraCategoryId: string;
  displayName: string;
  category: ProductCategoryType;
  bodyPart: BodyPart;
}

class SephoraImporterWithIngredients {
  private categories: CategoryConfig[] = [
    // Moisturizers
    { sephoraCategoryId: 'cat60097', displayName: 'Face Creams', category: 'MOISTURIZER', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1210035', displayName: 'Mists & Essences', category: 'MIST', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1210033', displayName: 'Night Creams', category: 'MOISTURIZER', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat60111', displayName: 'Neck Creams', category: 'MOISTURIZER', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat960031', displayName: 'BB & CC Cream', category: 'MOISTURIZER', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1120031', displayName: 'Face Oils', category: 'FACIAL_OIL', bodyPart: 'FACE' },
    
    // Cleansers
    { sephoraCategoryId: 'cat60099', displayName: 'Face Wash & Cleansers', category: 'CLEANSER', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1070034', displayName: 'Exfoliators', category: 'EXFOLIANT', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1210031', displayName: 'Makeup Removers', category: 'CLEANSER', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1610031', displayName: 'Face Wipes', category: 'CLEANSER', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat60101', displayName: 'Toners', category: 'TONER', bodyPart: 'FACE' },
    
    // Treatments
    { sephoraCategoryId: 'cat60103', displayName: 'Face Serums', category: 'SERUM', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1170031', displayName: 'Acne Treatments', category: 'TREATMENT', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1210037', displayName: 'Facial Peels', category: 'TREATMENT', bodyPart: 'FACE' },
    
    // Masks
    { sephoraCategoryId: 'cat920041', displayName: 'Face Masks', category: 'MASK', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1440040', displayName: 'Sheet Masks', category: 'MASK', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat1600036', displayName: 'Eye Masks', category: 'MASK', bodyPart: 'EYES' },
    
    // Eye Care
    { sephoraCategoryId: 'cat60107', displayName: 'Eye Creams & Treatments', category: 'EYE_CREAM', bodyPart: 'EYES' },
    
    // Sunscreen
    { sephoraCategoryId: 'cat920033', displayName: 'Face Sunscreen', category: 'SUNSCREEN', bodyPart: 'FACE' },
    { sephoraCategoryId: 'cat920035', displayName: 'Body Sunscreen', category: 'SUNSCREEN', bodyPart: 'BODY' },
  ];

  private apiKey = process.env.RAPIDAPI_KEY!;
  private apiHost = 'real-time-sephora-api.p.rapidapi.com';

  private async makeRequest(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const options = {
        method: 'GET',
        hostname: this.apiHost,
        port: null,
        path: path,
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': this.apiHost
        }
      };

      const req = https.request(options, (res) => {
        const chunks: Buffer[] = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          try {
            const body = Buffer.concat(chunks);
            const data = JSON.parse(body.toString());
            resolve(data);
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });
  }

  async fetchProducts(categoryId: string, pageSize = 60): Promise<SephoraProduct[]> {
    try {
      const path = `/search-by-category?categoryId=${categoryId}&sortBy=BEST_SELLING&pageSize=${pageSize}&currentPage=1&minPrice=0&maxPrice=100000000`;
      const response = await this.makeRequest(path);
      return response.products || [];
    } catch (error) {
      console.error(`   ❌ Error fetching ${categoryId}:`, error);
      return [];
    }
  }

  async fetchProductDetails(productId: string): Promise<any> {
    try {
      const path = `/product-details?productId=${productId}&language=en-US`;
      return await this.makeRequest(path);
    } catch (error) {
      console.error(`   ⚠️  Could not fetch details for ${productId}`);
      return null;
    }
  }

  parsePrice(priceString: string): number | null {
    try {
      const match = priceString.match(/\$([0-9.]+)/);
      if (match) return parseFloat(match[1]);
      return null;
    } catch {
      return null;
    }
  }

  stripHtmlTags(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '—')
      .replace(/\s+/g, ' ')
      .trim();
  }

  extractIngredients(ingredientDesc: string): string[] {
    // Extract the actual ingredient list (usually after <br><br>)
    const parts = ingredientDesc.split('<br><br>');
    
    // The ingredient list is usually the last part before disclaimer
    let ingredientList = parts[parts.length - 1];
    
    // Remove disclaimer text
    ingredientList = ingredientList.split('<br>')[0];
    ingredientList = ingredientList.split('<i>')[0];
    
    // Split by comma and clean up
    const ingredients = ingredientList
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing.length > 0 && !ing.toLowerCase().includes('subject to change'))
      .filter(ing => ing.length < 100); // Filter out long descriptions
    
    return ingredients;
  }

  async findOrCreateIngredient(ingredientName: string): Promise<number> {
    // Check if ingredient exists
    let ingredient = await db.ingredients.findFirst({
      where: {
        name: {
          equals: ingredientName,
          mode: 'insensitive'
        }
      }
    });

    // Create if doesn't exist
    if (!ingredient) {
      ingredient = await db.ingredients.create({
        data: { name: ingredientName }
      });
    }

    return ingredient.id;
  }

  async importCategory(config: CategoryConfig, withIngredients = true) {
    console.log(`\n📦 Importing ${config.displayName} (${config.sephoraCategoryId})...`);
    console.log(`   🧪 Import ingredients: ${withIngredients ? 'YES' : 'NO'}`);
    
    const products = await this.fetchProducts(config.sephoraCategoryId);
    
    if (products.length === 0) {
      console.log(`   ⚠️  No products found`);
      return { imported: 0, skipped: 0, errors: 0, ingredientsAdded: 0 };
    }

    console.log(`   Found ${products.length} products`);

    let imported = 0;
    let skipped = 0;
    let errors = 0;
    let ingredientsAdded = 0;

    for (const product of products) {
      try {
        // Check if product exists
        const existing = await db.product.findFirst({
          where: {
            OR: [
              { officialUrl: product.fullSiteProductUrl },
              { sephoraCategoryId: product.productId }
            ]
          }
        });

        if (existing) {
          skipped++;
          continue;
        }

        // Fetch full details (needed for ingredients)
        const details = await this.fetchProductDetails(product.productId);
        
        if (!details || !details.currentSku) {
          console.log(`   ⚠️  Skipping ${product.displayName} - no details available`);
          errors++;
          continue;
        }

        // Get description
        const description = details.productDetails?.longDescription 
          ? this.stripHtmlTags(details.productDetails.longDescription).substring(0, 500)
          : `${product.displayName} by ${product.brand.displayName}`;

        // Create product
        const createdProduct = await db.product.create({
          data: {
            name: product.displayName,
            brand: product.brand.displayName,
            description: description,
            officialUrl: product.fullSiteProductUrl,
            imageUrl: details.currentSku.skuImages.imageUrl,
            price: this.parsePrice(details.currentSku.listPrice),
            rating: details.productDetails?.rating || null,
            category: config.category,
            bodyPart: config.bodyPart,
            sephoraCategoryId: product.productId,
          }
        });

        // Extract and link ingredients
        if (withIngredients && details.currentSku.ingredientDesc) {
          const ingredients = this.extractIngredients(details.currentSku.ingredientDesc);
          
          for (const ingredientName of ingredients.slice(0, 50)) { // Limit to first 50 ingredients
            try {
              const ingredientId = await this.findOrCreateIngredient(ingredientName);
              
              await db.productIngredient.create({
                data: {
                  productId: createdProduct.id,
                  ingredientId: ingredientId
                }
              });
              
              ingredientsAdded++;
            } catch (err) {
              // Ingredient might already be linked, skip
            }
          }
        }

        imported++;
        console.log(`   ✅ Imported: ${product.displayName} (${ingredientsAdded} ingredients)`);
        
        // Delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`   ❌ Error importing ${product.displayName}:`, error);
        errors++;
      }
    }

    console.log(`   ✅ Results: ${imported} products, ${ingredientsAdded} ingredients, ${skipped} skipped, ${errors} errors`);
    return { imported, skipped, errors, ingredientsAdded };
  }

  async importAll(delayBetweenCategories = 3000, withIngredients = true) {
    console.log('🚀 Starting Sephora product import with ingredients...');
    console.log(`📋 Total categories: ${this.categories.length}`);
    console.log(`🧪 Import ingredients: ${withIngredients ? 'YES (slower)' : 'NO (faster)'}\n`);
    
    let totalImported = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let totalIngredients = 0;

    for (let i = 0; i < this.categories.length; i++) {
      const config = this.categories[i];
      const results = await this.importCategory(config, withIngredients);
      
      totalImported += results.imported;
      totalSkipped += results.skipped;
      totalErrors += results.errors;
      totalIngredients += results.ingredientsAdded;
      
      if (i < this.categories.length - 1) {
        console.log(`   ⏳ Waiting ${delayBetweenCategories}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenCategories));
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✨ Import Complete!');
    console.log('='.repeat(70));
    console.log(`📦 Products Imported: ${totalImported}`);
    console.log(`🧪 Ingredients Added: ${totalIngredients}`);
    console.log(`⏭️  Products Skipped: ${totalSkipped}`);
    console.log(`❌ Errors: ${totalErrors}`);
    console.log('='.repeat(70) + '\n');
  }

  async importSpecific(categoryIds: string[], delayBetweenCategories = 3000, withIngredients = true) {
    const configsToImport = this.categories.filter(
      c => categoryIds.includes(c.sephoraCategoryId)
    );

    if (configsToImport.length === 0) {
      console.log('❌ No matching categories found!');
      return;
    }

    console.log(`🚀 Starting selective import...`);
    console.log(`📋 Categories: ${configsToImport.length}`);
    console.log(`🧪 Import ingredients: ${withIngredients ? 'YES' : 'NO'}\n`);

    let totalImported = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let totalIngredients = 0;

    for (let i = 0; i < configsToImport.length; i++) {
      const config = configsToImport[i];
      const results = await this.importCategory(config, withIngredients);
      
      totalImported += results.imported;
      totalSkipped += results.skipped;
      totalErrors += results.errors;
      totalIngredients += results.ingredientsAdded;
      
      if (i < configsToImport.length - 1) {
        console.log(`   ⏳ Waiting ${delayBetweenCategories}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenCategories));
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✨ Import Complete!');
    console.log('='.repeat(70));
    console.log(`📦 Products Imported: ${totalImported}`);
    console.log(`🧪 Ingredients Added: ${totalIngredients}`);
    console.log(`⏭️  Products Skipped: ${totalSkipped}`);
    console.log(`❌ Errors: ${totalErrors}`);
    console.log('='.repeat(70) + '\n');
  }

  listCategories() {
    console.log('\n📋 Available Categories:\n');
    this.categories.forEach(cat => {
      console.log(`   ${cat.sephoraCategoryId}: ${cat.displayName} (${cat.category} - ${cat.bodyPart})`);
    });
    console.log('');
  }
}

export default SephoraImporterWithIngredients;

// CLI runner
if (require.main === module) {
  const importer = new SephoraImporterWithIngredients();
  const args = process.argv.slice(2);
  
  const withIngredients = !args.includes('--no-ingredients');
  const filteredArgs = args.filter(arg => arg !== '--no-ingredients');
  
  if (filteredArgs[0] === 'list') {
    importer.listCategories();
    process.exit(0);
  } else if (filteredArgs[0] === 'specific' && filteredArgs.length > 1) {
    const categoryIds = filteredArgs.slice(1);
    importer.importSpecific(categoryIds, 3000, withIngredients)
      .then(() => process.exit(0))
      .catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
      });
  } else {
    importer.importAll(3000, withIngredients)
      .then(() => process.exit(0))
      .catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
      });
  }
}