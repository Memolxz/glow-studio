import { db } from '../db/db';
import { product, skinType } from '.prisma/client';

interface UserSkinType {
  skinTypeId: number;
}

type ProductWithRelations = product & {
  productIngredients: Array<{
    ingredient: {
      ingredientEffect: Array<{
        Effect: "GOOD" | "BAD" | null;
      }>;
    };
  }>;
};

export class RecommendationService {
  private async calculateRecommendations(userId: number): Promise<product[]> {
    const skinTypes: UserSkinType[] = await db.userSkinType.findMany({
      where: { userId },
      select: { skinTypeId: true },
    });

    if (skinTypes.length === 0) {
      throw new Error("El usuario no tiene tipos de piel asignados.");
    }

    const skinTypeIds = skinTypes.map(s => s.skinTypeId);

    const products: ProductWithRelations[] = await db.product.findMany({
      include: {
        productIngredients: {
          include: {
            ingredient: {
              include: {
                ingredientEffect: {
                  where: { skinTypeId: { in: skinTypeIds } },
                },
              },
            },
          },
        },
      },
    });

    return products.filter((product: ProductWithRelations) => {
      let hasGood = false;
      let hasBad = false;

      for (const pi of product.productIngredients) {
        for (const effect of pi.ingredient.ingredientEffect) {
          if (effect.Effect === "BAD") hasBad = true;
          else if (effect.Effect === "GOOD") hasGood = true;
        }
      }

      return !hasBad && hasGood;
    });
  }


  async getRecommendations(userId: number) {
    const existing = await db.recommendation.findMany({
      where: { userId },
      include: { product: true },
    });

    if (existing.length > 0) {
      return existing;
    }

    return await this.refreshRecommendations(userId);
  }


  async refreshRecommendations(userId: number) {
    await db.recommendation.deleteMany({
      where: { userId },
    });

    const recommendedProducts = await this.calculateRecommendations(userId);

    const saved = await Promise.all(
      recommendedProducts.map(product =>
        db.recommendation.create({
          data: {
            userId,
            productId: product.id,
          },
          include: { product: true },
        })
      )
    );

    return saved;
  }
}