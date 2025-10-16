import { db } from '../db/db';
import { ProductCategoryType } from '@prisma/client';

interface ProductFilter {
  categories?: ProductCategoryType[];
  minRating?: number;
  maxRating?: number;
  minPrice?: number;
  maxPrice?: number;
  skinTypeIds?: number[];
  skip?: number;
  take?: number;
}

export class ProductService {
  async getAllProducts() {
    try {
      const products = await db.product.findMany({
        include: {
          productIngredients: { 
            include: { 
              ingredient: true 
            } 
          },
          productComments: true
        }
      });

      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener productos");
    }
  }

  async filterProducts(filters: ProductFilter) {
    try {
      const where: any = {};

      // Filter by categories
      if (filters.categories && filters.categories.length > 0) {
        where.category = { in: filters.categories };
      }

      // Filter by rating range
      if (filters.minRating !== undefined || filters.maxRating !== undefined) {
        where.rating = {};
        if (filters.minRating !== undefined) where.rating.gte = filters.minRating;
        if (filters.maxRating !== undefined) where.rating.lte = filters.maxRating;
      }

      // Filter by price range
      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        where.price = {};
        if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
        if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
      }

      let products = await db.product.findMany({
        where,
        include: {
          productIngredients: { 
            include: { 
              ingredient: {
                include: {
                  ingredientEffect: true
                }
              }
            } 
          },
          productComments: true
        },
        skip: filters.skip || 0,
        take: filters.take || 50,
        orderBy: { createdAt: 'desc' }
      });

      // Filter by skin types (if product ingredients are good for those skin types)
      if (filters.skinTypeIds && filters.skinTypeIds.length > 0) {
        products = products.filter(product => {
          // Check if product has ingredients with GOOD effects for the selected skin types
          const hasGoodIngredientsForSkinType = product.productIngredients.some(pi => {
            return pi.ingredient.ingredientEffect.some(effect => 
              effect.Effect === 'GOOD' && 
              filters.skinTypeIds!.includes(effect.skinTypeId)
            );
          });

          // Check if product has NO BAD ingredients for the selected skin types
          const hasBadIngredientsForSkinType = product.productIngredients.some(pi => {
            return pi.ingredient.ingredientEffect.some(effect => 
              effect.Effect === 'BAD' && 
              filters.skinTypeIds!.includes(effect.skinTypeId)
            );
          });

          return hasGoodIngredientsForSkinType && !hasBadIngredientsForSkinType;
        });
      }

      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Error al filtrar productos");
    }
  }

  async getProductById(id: number) {
    try {
      const product = await db.product.findUnique({
        where: { id },
        include: {
          productIngredients: { 
            include: { 
              ingredient: true 
            } 
          },
          productComments: true
        }
      });

      if (!product) throw new Error("Producto no encontrado");

      return product;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el producto");
    }
  }

  async getProductsByCategory(category: string) {
    try {
      const categoryEnum = category.toUpperCase() as ProductCategoryType;

      if (!Object.values(ProductCategoryType).includes(categoryEnum)) {
        throw new Error("Categoría inválida");
      }

      const products = await db.product.findMany({
        where: { category: categoryEnum },
        include: {
          productIngredients: { 
            include: { 
              ingredient: true 
            } 
          },
          productComments: true
        }
      });

      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener productos por categoría");
    }
  }

  async createProduct(data: any) {
    try {
      const newProduct = await db.product.create({
        data: {
          name: data.name,
          brand: data.brand,
          description: data.description,
          officialUrl: data.officialUrl,
          imageUrl: data.imageUrl,
          price: data.price,
          category: data.category,
          productIngredients: {
            create: data.ingredients.map((ing: any) => ({
              ingredientId: ing.ingredientId,
            }))
          }
        },
        include: {
          productIngredients: { 
            include: { 
              ingredient: true 
            } 
          },
          productComments: true
        }
      });

      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el producto");
    }
  }

  async updateProduct(productId: number, data: any) {
    try {
      const updatedProduct = await db.product.update({
        where: { id: productId },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.brand && { brand: data.brand }),
          ...(data.description && { description: data.description }),
          ...(data.rating !== undefined && { rating: data.rating }),
          ...(data.officialUrl && { officialUrl: data.officialUrl }),
          ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
          ...(data.price !== undefined && { price: data.price }),
          ...(data.category && { category: data.category }),
        },
        include: {
          productIngredients: { 
            include: { 
              ingredient: true 
            } 
          },
          productComments: true
        }
      });

      if (data.ingredients) {
        await db.productIngredient.deleteMany({ where: { productId } });
        await db.productIngredient.createMany({
          data: data.ingredients.map((ing: any) => ({
            productId,
            ingredientId: ing.ingredientId,
          }))
        });
      }

      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el producto");
    }
  }

  async deleteProduct(productId: number) {
    try {
      await db.product.delete({ where: { id: productId } });
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el producto");
    }
  }

  async getBestRatedProducts(limit: number) {
    try {
      const products = await db.product.findMany({ 
        orderBy: { rating: 'desc' },
        take: limit,
        include: { 
          productIngredients: { 
            include: { 
              ingredient: true
            } 
          },
          productComments: true 
        }
      }); 
      
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los productos mejor valorados");
    }
  }
}