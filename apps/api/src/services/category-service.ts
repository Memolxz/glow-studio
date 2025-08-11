import { db } from '../db/db';
import { productCategory, productCategoryType } from '.prisma/client';

interface CreateCategoryDTO {
  name: productCategoryType;
}

interface UpdateCategoryDTO {
  name?: productCategoryType;
}

export class CategoryService {
  async getAllCategories(): Promise<productCategory[]> {
    try {
      const categories = await db.productCategory.findMany({
        include: { products: true }
      });

      return categories;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener categorías");
    }
  }

  async createCategory(data: CreateCategoryDTO) {
    try {
      if (!Object.values(productCategoryType).includes(data.name)) {
        throw new Error("Tipo de categoría inválido");
      }

      const newCategory = await db.productCategory.create({
        data: {
          name: data.name,
        }
      });

      return newCategory;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al crear la categoría");
    }
  }

  async updateCategory(categoryId: number, data: UpdateCategoryDTO) {
    try {
      if (data.name && !Object.values(productCategoryType).includes(data.name)) {
        throw new Error("Tipo de categoría inválido");
      }

      const updatedCategory = await db.productCategory.update({
        where: { id: categoryId },
        data: {
          ...(data.name && { name: data.name })
        }
      });

      return updatedCategory;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al actualizar la categoría");
    }
  }

  async deleteCategory(categoryId: number) {
    try {
      const category = await db.productCategory.findUnique({
        where: { id: categoryId },
        include: {
          products: {
            select: { id: true }
          }
        }
      });

      if (category?.products.length) {
        throw new Error("No se puede eliminar una categoría con productos asociados");
      }

      await db.productCategory.delete({ where: { id: categoryId } });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al eliminar la categoría");
    }
  }
}
