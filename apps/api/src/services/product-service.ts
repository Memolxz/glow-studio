import { db } from '../db/db';
import { ProductCategoryType } from '@prisma/client';

interface CreateProductDTO {
  name: string;
  brand: string;
  description: string;
  rating?: number;
  officialUrl: string;
  imageUrl?: string;
  price?: number;
  category: ProductCategoryType;
  ingredients: Array<{
    ingredientId: number;
    concentration?: number;
  }>;
  comments?: Array<{
    userId: number;
    content: string;
    rating: number;
  }>;
}

interface UpdateProductDTO extends Partial<CreateProductDTO> {
  active?: boolean;
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
      // Convert string to ProductCategoryType enum
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

  async createProduct(data: CreateProductDTO) {
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
            create: data.ingredients.map(ing => ({
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

  async updateProduct(productId: number, data: UpdateProductDTO) {
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
          ...(data.category && { category: data.category }), // Fixed: use category instead of categoryId
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

      // Handle ingredients update
      if (data.ingredients) {
        await db.productIngredient.deleteMany({ where: { productId } });
        await db.productIngredient.createMany({
          data: data.ingredients.map(ing => ({
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
}