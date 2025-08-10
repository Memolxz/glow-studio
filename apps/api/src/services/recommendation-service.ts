import { db } from '../db/db';
import { product, skinType } from '.prisma/client';

interface ProductRecommendation {
  product: product;
  reason: string;
}

interface SuitabilityScore {
  score: number;
  explanation: string[];
}

export class RecommendationService {
  async getRecommendationsForUser(userId: number): Promise<ProductRecommendation[]> {
    try {
      const userSkinTypes = await db.userSkinType.findMany({
        where: { userId },
        include: { skinType: true }
      });

      if (!userSkinTypes.length) {
        throw new Error('El usuario no tiene tipos de piel definidos');
      }

      const products = await db.product.findMany({
        include: {
          productIngredients: { include: { ingredient: true } }
        }
      });

      const recommendations: ProductRecommendation[] = [];

      for (const product of products) {
        const suitability = await this.analyzeProductSuitability(
          product.id,
          userSkinTypes.map(ust => ust.skinType)
        );

        if (suitability.score > 0.6) {
          recommendations.push({
            product,
            reason: suitability.explanation.join(' ')
          });
        }
      }

      await Promise.all(
        recommendations.map(rec =>
          db.recommendation.create({
            data: {
              userId,
              productId: rec.product.id,
              reason: rec.reason,
            }
          })
        )
      );

      return recommendations;
    } catch (error) {
      console.error(error);
      throw new Error("Error al generar recomendaciones");
    }
  }

  async analyzeProductSuitability(
    productId: number,
    userSkinTypes: skinType[]
  ): Promise<SuitabilityScore> {
    try {
      const product = await db.product.findUnique({
        where: { id: productId },
        include: {
          productIngredients: { include: { ingredient: true } }
        }
      });

      if (!product) {
        throw new Error('Producto no encontrado');
      }

      let totalScore = 0;
      const explanations: string[] = [];

      for (const pi of product.productIngredients) {
        const effects = await db.ingredientEffect.findMany({
          where: {
            ingredientId: pi.ingredientId,
            skinTypeId: { in: userSkinTypes.map(st => st.id) }
          }
        });

        for (const effect of effects) {
          const effectScore = effect.Effect === 'GOOD' ? 1 : -1;
          totalScore += effectScore;

          const skinType = userSkinTypes.find(st => st.id === effect.skinTypeId);
          const effectText = effect.Effect === 'GOOD' ? 'beneficioso para' : 'puede irritar a';
          explanations.push(`${pi.ingredient.name} es ${effectText} piel ${skinType?.name}.`);
        }
      }

      const normalizedScore = Math.max(0, Math.min(1, (totalScore + 10) / 20));

      return {
        score: normalizedScore,
        explanation: explanations
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error al analizar la compatibilidad del producto");
    }
  }

  async explainRecommendation(productId: number, userId: number): Promise<string> {
    try {
      const recommendation = await db.recommendation.findFirst({
        where: { productId, userId },
        orderBy: { createdAt: 'desc' }
      });

      if (!recommendation) {
        throw new Error('No se encontró una recomendación para este producto y usuario');
      }

      return recommendation.reason;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener explicación de la recomendación");
    }
  }
}
