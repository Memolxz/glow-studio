import { product, Prisma } from '.prisma/client';
import { db } from '../db/db';

interface CreateProductDTO {
  name: string;
  brand: string;
  description: string;
  officialUrl: string;
  imageUrl?: string;
  price?: number;
  categoryId: number;
  ingredients: Array<{
    ingredientId: number;
    concentration?: number;
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
          category: true,
          productIngredients: { include: { ingredient: true } }
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
          category: true,
          productIngredients: { include: { ingredient: true } }
        }
      });

      if (!product) throw new Error("Producto no encontrado");

      return product;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el producto");
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
          price: data.price ? new Prisma.Decimal(data.price) : null,
          categoryId: data.categoryId,
          productIngredients: {
            create: data.ingredients.map(ing => ({
              ingredientId: ing.ingredientId,
            }))
          }
        }
      });

      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el producto");
    }
  }

  // chequear
  async updateProduct(productId: number, data: UpdateProductDTO) {
    try {
      const updatedProduct = await db.product.update({
        where: { id: productId },
        data: {
          ...(data.name && { name: data.name }),
          ...(data.brand && { brand: data.brand }),
          ...(data.description && { description: data.description }),
          ...(data.officialUrl && { officialUrl: data.officialUrl }),
          ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
          ...(data.price !== undefined && { price: data.price ? new Prisma.Decimal(data.price) : null }),
          ...(data.categoryId && { categoryId: data.categoryId }),
          ...(data.active !== undefined && { active: data.active }),
        }
      });

      if (data.ingredients) {
        await db.productIngredient.deleteMany({ where: { productId } });
        await db.productIngredient.createMany({
          data: data.ingredients.map(ing => ({
            productId,
            ingredientId: ing.ingredientId,
            concentration: ing.concentration ? new Prisma.Decimal(ing.concentration) : null
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