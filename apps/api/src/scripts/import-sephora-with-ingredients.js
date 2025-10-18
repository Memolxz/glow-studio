// apps/api/src/scripts/import-sephora-fixed.js

const { PrismaClient } = require('@prisma/client');
const https = require('https');

const db = new PrismaClient();

class SephoraImporter {
  constructor() {
    this.categories = [
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

    this.apiKey = process.env.RAPIDAPI_KEY;
    this.apiHost = 'real-time-sephora-api.p.rapidapi.com';

    if (!this.apiKey) {
      console.error('❌ ERROR: RAPIDAPI_KEY no encontrado en variables de entorno');
      console.log('   Por favor configura RAPIDAPI_KEY en tu archivo .env');
      process.exit(1);
    }
  }

  makeRequest(path) {
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

      console.log(`   🔍 Requesting: ${path}`);

      const req = https.request(options, (res) => {
        const chunks = [];

        res.on('data', (chunk) => {
          chunks.push(chunk);
        });

        res.on('end', () => {
          try {
            const body = Buffer.concat(chunks);
            const data = JSON.parse(body.toString());
            
            if (!data.success) {
              console.log(`   ⚠️  API returned success: false`);
              console.log(`   Response:`, JSON.stringify(data, null, 2));
            }
            
            resolve(data);
          } catch (error) {
            console.error(`   ❌ Error parsing response:`, error.message);
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        console.error(`   ❌ Request error:`, error.message);
        reject(error);
      });

      req.end();
    });
  }

  async fetchProducts(categoryId, pageSize = 10) {
    try {
      const path = `/search-by-category?categoryId=${categoryId}&sortBy=BEST_SELLING&pageSize=${pageSize}&currentPage=1&minPrice=0&maxPrice=100000000`;
      const response = await this.makeRequest(path);
      
      if (!response.success) {
        console.log(`   ⚠️  No success flag in response`);
        return [];
      }

      const products = response.data?.products || [];
      console.log(`   📦 Found ${products.length} products in response`);
      
      // Limit to first 10 products
      return products.slice(0, 10);
    } catch (error) {
      console.error(`   ❌ Error fetching ${categoryId}:`, error.message);
      return [];
    }
  }

  async fetchProductDetails(productId) {
    try {
      const path = `/product-details?productId=${productId}&language=en-US`;
      const response = await this.makeRequest(path);
      return response;
    } catch (error) {
      console.error(`   ⚠️  Could not fetch details for ${productId}:`, error.message);
      return null;
    }
  }

  parsePrice(priceString) {
    try {
      if (!priceString) return null;
      
      // Handle range prices like "$25.00 - $45.00"
      const match = priceString.match(/\$([0-9.]+)/);
      if (match) return parseFloat(match[1]);
      
      return null;
    } catch {
      return null;
    }
  }

  stripHtmlTags(html) {
    if (!html) return '';
    
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&mdash;/g, '—')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();
  }

  extractIngredients(ingredientDesc) {
    if (!ingredientDesc) return [];

    try {
      // Remove HTML tags
      let cleaned = this.stripHtmlTags(ingredientDesc);
      
      // Find the main ingredient list (usually after the highlighted ingredients section)
      // Split by common separators
      const parts = cleaned.split(/\n|<br>|<br\/>|<br \/>/gi);
      
      // Find the longest part (usually the full ingredient list)
      let ingredientList = parts.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
      }, '');
      
      // Remove disclaimers and notes
      ingredientList = ingredientList
        .split(/subject to change|may contain|disclaimer|ingredient callouts|what else you need to know/gi)[0]
        .trim();
      
      // Split by comma and clean up
      const ingredients = ingredientList
        .split(',')
        .map(ing => ing.trim())
        .filter(ing => {
          // Filter out empty, too long (descriptions), or too short strings
          return ing.length > 2 && ing.length < 100 && !ing.includes('http');
        })
        .map(ing => {
          // Remove parenthetical notes
          return ing.replace(/\([^)]*\)/g, '').trim();
        })
        .filter(ing => ing.length > 0);
      
      console.log(`   🧪 Extracted ${ingredients.length} ingredients`);
      return ingredients.slice(0, 50); // Limit to first 50
      
    } catch (error) {
      console.error(`   ⚠️  Error extracting ingredients:`, error.message);
      return [];
    }
  }

  async findOrCreateIngredient(ingredientName) {
    try {
      // Check if ingredient exists (case-insensitive)
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
        console.log(`      ➕ Created ingredient: ${ingredientName}`);
      }

      return ingredient.id;
    } catch (error) {
      console.error(`      ⚠️  Error with ingredient "${ingredientName}":`, error.message);
      return null;
    }
  }

  async importCategory(config, withIngredients = true) {
    console.log(`\n📦 Importing ${config.displayName} (${config.sephoraCategoryId})...`);
    console.log(`   🧪 Import ingredients: ${withIngredients ? 'YES' : 'NO'}`);
    
    const products = await this.fetchProducts(config.sephoraCategoryId);
    
    if (products.length === 0) {
      console.log(`   ⚠️  No products found`);
      return { imported: 0, skipped: 0, errors: 0, ingredientsAdded: 0 };
    }

    console.log(`   📝 Processing ${products.length} products...`);

    let imported = 0;
    let skipped = 0;
    let errors = 0;
    let ingredientsAdded = 0;

    for (const product of products) {
      try {
        console.log(`\n   → Processing: ${product.displayName || product.productName}`);
        
        // Check if product exists
        const existing = await db.product.findFirst({
          where: {
            OR: [
              { officialUrl: product.targetUrl || product.fullSiteProductUrl },
              { sephoraCategoryId: product.productId }
            ]
          }
        });

        if (existing) {
          console.log(`     ⏭️  Already exists, skipping`);
          skipped++;
          continue;
        }

        // Fetch full details (needed for ingredients and description)
        console.log(`     🔍 Fetching details...`);
        const details = await this.fetchProductDetails(product.productId);
        
        if (!details || !details.currentSku) {
          console.log(`     ⚠️  No details available, skipping`);
          errors++;
          continue;
        }

        // Get description
        const description = details.productDetails?.shortDescription 
          ? this.stripHtmlTags(details.productDetails.shortDescription).substring(0, 500)
          : details.productDetails?.longDescription
          ? this.stripHtmlTags(details.productDetails.longDescription).substring(0, 500)
          : `${product.displayName} by ${product.brandName}`;

        // Get image URL
        const imageUrl = details.currentSku.skuImages?.imageUrl || product.heroImage;

        // Get price
        const price = this.parsePrice(details.currentSku.listPrice || product.currentSku?.listPrice);

        // Get rating
        const rating = details.productDetails?.rating || product.rating || null;

        console.log(`     💾 Creating product in database...`);

        // Create product
        const createdProduct = await db.product.create({
          data: {
            name: product.displayName || product.productName,
            brand: product.brandName,
            description: description,
            officialUrl: details.fullSiteProductUrl || product.targetUrl,
            imageUrl: imageUrl,
            price: price,
            rating: rating ? parseFloat(rating) : null,
            category: config.category,
            bodyPart: config.bodyPart,
            sephoraCategoryId: product.productId,
          }
        });

        console.log(`     ✅ Product created with ID: ${createdProduct.id}`);

        // Extract and link ingredients
        if (withIngredients && details.currentSku.ingredientDesc) {
          console.log(`     🧪 Processing ingredients...`);
          const ingredients = this.extractIngredients(details.currentSku.ingredientDesc);
          
          for (const ingredientName of ingredients) {
            try {
              const ingredientId = await this.findOrCreateIngredient(ingredientName);
              
              if (ingredientId) {
                await db.productIngredient.create({
                  data: {
                    productId: createdProduct.id,
                    ingredientId: ingredientId
                  }
                });
                
                ingredientsAdded++;
              }
            } catch (err) {
              // Ingredient might already be linked or other constraint error
              console.log(`      ⏭️  Skipped duplicate ingredient link`);
            }
          }
          console.log(`     ✅ Linked ${ingredients.length} ingredients`);
        }

        imported++;
        console.log(`   ✅ Successfully imported: ${product.displayName}`);
        
        // Delay to respect rate limits (500ms between requests)
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`   ❌ Error importing ${product.displayName}:`, error.message);
        errors++;
      }
    }

    console.log(`\n   📊 Results: ${imported} imported, ${ingredientsAdded} ingredients added, ${skipped} skipped, ${errors} errors`);
    return { imported, skipped, errors, ingredientsAdded };
  }

  async importAll(delayBetweenCategories = 3000, withIngredients = true) {
    console.log('🚀 Starting Sephora product import...');
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
        console.log(`\n   ⏳ Waiting ${delayBetweenCategories}ms before next category...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenCategories));
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✨ Import Complete!');
    console.log('='.repeat(70));
    console.log(`📦 Products Imported: ${totalImported}`);
    console.log(`🧪 Ingredients Added: ${totalIngredients}`);
    console.log(`⭐️ Products Skipped: ${totalSkipped}`);
    console.log(`❌ Errors: ${totalErrors}`);
    console.log('='.repeat(70) + '\n');
    
    await db.$disconnect();
  }

  async importSpecific(categoryIds, delayBetweenCategories = 3000, withIngredients = true) {
    const configsToImport = this.categories.filter(
      c => categoryIds.includes(c.sephoraCategoryId)
    );

    if (configsToImport.length === 0) {
      console.log('❌ No matching categories found!');
      console.log('Available categories:');
      this.listCategories();
      await db.$disconnect();
      return;
    }

    console.log(`🚀 Starting selective import...`);
    console.log(`📋 Categories to import: ${configsToImport.length}`);
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
        console.log(`\n   ⏳ Waiting ${delayBetweenCategories}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenCategories));
      }
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✨ Import Complete!');
    console.log('='.repeat(70));
    console.log(`📦 Products Imported: ${totalImported}`);
    console.log(`🧪 Ingredients Added: ${totalIngredients}`);
    console.log(`⭐️ Products Skipped: ${totalSkipped}`);
    console.log(`❌ Errors: ${totalErrors}`);
    console.log('='.repeat(70) + '\n');
    
    await db.$disconnect();
  }

  listCategories() {
    console.log('\n📋 Available Categories:\n');
    this.categories.forEach(cat => {
      console.log(`   ${cat.sephoraCategoryId}: ${cat.displayName} (${cat.category} - ${cat.bodyPart})`);
    });
    console.log('');
  }
}

module.exports = SephoraImporter;

// CLI runner
if (require.main === module) {
  const importer = new SephoraImporter();
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
        console.error('💥 Fatal error:', error);
        process.exit(1);
      });
  } else {
    importer.importAll(3000, withIngredients)
      .then(() => process.exit(0))
      .catch((error) => {
        console.error('💥 Fatal error:', error);
        process.exit(1);
      });
  }
}