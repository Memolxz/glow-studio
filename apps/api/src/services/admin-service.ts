// apps/api/src/services/admin-service.ts
import { db } from "../db/db";

export class AdminService {
  // Get most used skin types
  async getMostUsedSkinTypes(limit: number = 5) {
    try {
      const result = await db.userSkinType.groupBy({
        by: ["skinTypeId"],
        _count: {
          userId: true,
        },
        orderBy: {
          _count: {
            userId: "desc",
          },
        },
        take: limit,
      });

      const skinTypesWithNames = await Promise.all(
        result.map(async (item) => {
          const skinType = await db.skinType.findUnique({
            where: { id: item.skinTypeId },
          });
          return {
            id: item.skinTypeId,
            name: skinType?.name || "Unknown",
            count: item._count.userId,
          };
        })
      );

      return skinTypesWithNames;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener tipos de piel más usados");
    }
  }

  // Get most recommended products
  async getMostRecommendedProducts(limit: number = 5) {
    try {
      const result = await db.recommendation.groupBy({
        by: ["productId"],
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: "desc",
          },
        },
        take: limit,
      });

      const productsWithDetails = await Promise.all(
        result.map(async (item) => {
          const product = await db.product.findUnique({
            where: { id: item.productId },
          });
          return {
            id: item.productId,
            name: product?.name || "Unknown",
            brand: product?.brand || "Unknown",
            category: product?.category || "Unknown",
            count: item._count.id,
          };
        })
      );

      return productsWithDetails;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener productos más recomendados");
    }
  }

  // Get product recommendations by category
  async getRecommendationsByCategory() {
    try {
      const result = await db.recommendation.groupBy({
        by: ["productId"],
      });

      // Get product details for each recommendation
      const productCategories = await db.product.findMany({
        where: {
          id: { in: result.map((r) => r.productId) },
        },
        select: { id: true, category: true },
      });

      // Count recommendations by category
      const categoryCount = result.reduce(
        (acc, rec) => {
          const product = productCategories.find((p) => p.id === rec.productId);
          if (product) {
            const category = product.category;
            acc[category] = (acc[category] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>
      );

      return Object.entries(categoryCount)
        .map(([category, count]) => ({
          category,
          count,
        }))
        .sort((a, b) => b.count - a.count);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener recomendaciones por categoría");
    }
  }

  // Get user registration statistics
  async getUserStats() {
    try {
      const totalUsers = await db.users.count();
      const activeUsers = await db.users.count({
        where: { deletedAt: null },
      });
      const deletedUsers = await db.users.count({
        where: { deletedAt: { not: null } },
      });

      return {
        totalUsers,
        activeUsers,
        deletedUsers,
        deletionRate:
          totalUsers > 0 ? ((deletedUsers / totalUsers) * 100).toFixed(2) : "0",
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener estadísticas de usuarios");
    }
  }

  // Get all deletable users (soft deleted but not hard deleted)
  async getDeletableUsers() {
    try {
      const users = await db.users.findMany({
        where: {
          deletedAt: { not: null },
        },
        select: {
          id: true,
          name: true,
          email: true,
          deletedAt: true,
          isAdmin: false,
        },
        orderBy: {
          deletedAt: "desc",
        },
      });

      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios eliminados");
    }
  }

  // Get dashboard overview stats
  async getDashboardOverview() {
    try {
      const userStats = await this.getUserStats();
      const mostUsedSkinTypes = await this.getMostUsedSkinTypes(5);
      const mostRecommendedProducts = await this.getMostRecommendedProducts(5);
      const recommendationsByCategory =
        await this.getRecommendationsByCategory();

      const totalRecommendations = await db.recommendation.count();
      const totalProducts = await db.product.count();

      return {
        userStats,
        mostUsedSkinTypes,
        mostRecommendedProducts,
        recommendationsByCategory,
        totalRecommendations,
        totalProducts,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener resumen del dashboard");
    }
  }

  // Get users registered in time period (for charts)
  async getUserRegistrationTrend(days: number = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const result = await db.users.findMany({
        where: {
          createdAt: { gte: startDate },
        },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      // Group by date
      const grouped = result.reduce(
        (acc, user) => {
          const date = user.createdAt.toISOString().split("T")[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      return Object.entries(grouped).map(([date, count]) => ({
        date,
        registrations: count,
      }));
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener tendencia de registros");
    }
  }

  // Get product ratings distribution
  async getProductRatingsDistribution() {
    try {
      const products = await db.product.findMany({
        where: {
          rating: { not: null },
        },
        select: {
          rating: true,
        },
      });

      // Group into buckets (1-2, 2-3, 3-4, 4-5)
      const distribution = {
        "1-2": 0,
        "2-3": 0,
        "3-4": 0,
        "4-5": 0,
      };

      products.forEach((p) => {
        if (p.rating !== null) {
          if (p.rating <= 2) distribution["1-2"]++;
          else if (p.rating <= 3) distribution["2-3"]++;
          else if (p.rating <= 4) distribution["3-4"]++;
          else distribution["4-5"]++;
        }
      });

      return distribution;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener distribución de calificaciones");
    }
  }
}