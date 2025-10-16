import { Router, Request, Response } from "express";
import { isAdminMiddleware } from "../middleware/auth-middleware";
import { AdminService } from "../services/admin-service";
import { UserService } from "../services/user-service";
import { ErrorWithMessage } from "../type";

const adminService = new AdminService();
const userService = new UserService();

export const adminRouter = Router();

adminRouter.use(isAdminMiddleware);

// GET dashboard overview - all stats in one call
adminRouter.get("/dashboard", async (req: Request, res: Response) => {
  try {
    const overview = await adminService.getDashboardOverview();
    res.status(200).json({ ok: true, data: overview });
  } catch (error) {
    const err = error as ErrorWithMessage;
    console.error(err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET user statistics
adminRouter.get("/stats/users", async (req: Request, res: Response) => {
  try {
    const stats = await adminService.getUserStats();
    res.status(200).json({ ok: true, data: stats });
  } catch (error) {
    const err = error as ErrorWithMessage;
    console.error(err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET most used skin types
adminRouter.get("/stats/skin-types",async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const skinTypes = await adminService.getMostUsedSkinTypes(limit);
      res.status(200).json({ ok: true, data: skinTypes });
    } catch (error) {
      const err = error as ErrorWithMessage;
      console.error(err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  }
);

// GET most recommended products
adminRouter.get("/stats/products-recommended",async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
      const products = await adminService.getMostRecommendedProducts(limit);
      res.status(200).json({ ok: true, data: products });
    } catch (error) {
      const err = error as ErrorWithMessage;
      console.error(err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  }
);

// GET recommendations by category
adminRouter.get("/stats/recommendations-category",async (req: Request, res: Response) => {
    try {
      const data = await adminService.getRecommendationsByCategory();
      res.status(200).json({ ok: true, data });
    } catch (error) {
      const err = error as ErrorWithMessage;
      console.error(err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  }
);

// GET user registration trend (for line chart)
adminRouter.get("/stats/registration-trend",async (req: Request, res: Response) => {
    try {
      const days = req.query.days ? parseInt(req.query.days as string) : 30;
      const trend = await adminService.getUserRegistrationTrend(days);
      res.status(200).json({ ok: true, data: trend });
    } catch (error) {
      const err = error as ErrorWithMessage;
      console.error(err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  }
);

// GET product ratings distribution
adminRouter.get("/stats/ratings-distribution",async (req: Request, res: Response) => {
    try {
      const distribution = await adminService.getProductRatingsDistribution();
      res.status(200).json({ ok: true, data: distribution });
    } catch (error) {
      const err = error as ErrorWithMessage;
      console.error(err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  }
);

// GET deleted users (soft deleted)
adminRouter.get("/users-deleted", async (req: Request, res: Response) => {
  try {
    const deletedUsers = await adminService.getDeletableUsers();
    res.status(200).json({ ok: true, data: deletedUsers });
  } catch (error) {
    const err = error as ErrorWithMessage;
    console.error(err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// PATCH restore deleted user by ID
adminRouter.patch("/users-deleted/restore/:id",async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      await userService.restoreUser(userId);
      res
        .status(200)
        .json({
          ok: true,
          message: `Usuario ${userId} restaurado exitosamente`,
        });
    } catch (error) {
      const err = error as ErrorWithMessage;
      console.error(err.message);
      res.status(500).json({ ok: false, error: err.message });
    }
  }
);

export default adminRouter;