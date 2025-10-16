import { Router, Request, Response } from "express"
import { jwtAuthMiddleware, isAdminMiddleware } from '../middleware/auth-middleware';
import { ProductService } from '../services/product-service';
import { RecommendationService } from '../services/recommendation-service';
import { ErrorWithMessage } from '../type';
import { db } from '../db/db';

const productService = new ProductService();
const recommendationService = new RecommendationService();

export const productRouter = Router();

// Get recommendations for user
productRouter.get('/recommendations', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!req.user){
      throw new Error('Not logged in');
    }
    
    const userId = req.user.id;

    if (req.user.id !== userId) {
      throw new Error('Access denied');
    }

    const recommendations = await recommendationService.getRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    const err = error as ErrorWithMessage;
    if (err.message === 'Access denied') {
      res.status(403).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to get recommendations' });
    }
  }
});

// Get top rated products
productRouter.get('/top-rated', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
    const products = await productService.getBestRatedProducts(limit);
    res.json({ ok: true, data: products });
  } catch (error) {
    const err = error as ErrorWithMessage;
    console.error(err.message);
    res.status(500).json({ 
      ok: false,
      error: 'Failed to fetch top rated products' 
    });
  }
});

// Filter products with all options
productRouter.get('/filter', async (req, res) => {
  try {
    const { 
      categories,
      minRating,
      maxRating,
      minPrice,
      maxPrice,
      skinTypes,
      skip,
      take
    } = req.query;

    const filters: any = {};

    if (categories) {
      const categoryArray = Array.isArray(categories) 
        ? categories.map((c: any) => (c as string).toUpperCase())
        : [(categories as string).toUpperCase()];
      filters.categories = categoryArray;
    }

    if (minRating !== undefined) {
      filters.minRating = parseFloat(minRating as string);
    }

    if (maxRating !== undefined) {
      filters.maxRating = parseFloat(maxRating as string);
    }

    if (minPrice !== undefined) {
      filters.minPrice = parseFloat(minPrice as string);
    }

    if (maxPrice !== undefined) {
      filters.maxPrice = parseFloat(maxPrice as string);
    }

    if (skinTypes) {
      const skinTypeArray = Array.isArray(skinTypes) 
        ? skinTypes.map(Number)
        : [Number(skinTypes)];
      filters.skinTypeIds = skinTypeArray;
    }

    if (skip !== undefined) {
      filters.skip = parseInt(skip as string);
    }

    if (take !== undefined) {
      filters.take = parseInt(take as string);
    }

    const products = await productService.filterProducts(filters);
    
    res.json({
      ok: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    const err = error as ErrorWithMessage;
    console.error(err.message);
    res.status(500).json({ 
      ok: false,
      error: 'Failed to filter products' 
    });
  }
});

// Get all products
productRouter.get('/', async (_, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by category
productRouter.get('/category/:category', async (req, res) => {
  try {
    const products = await productService.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

// Get product by ID
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(parseInt(req.params.id));
    res.json(product);
  } catch (error) {
    const err = error as ErrorWithMessage;
    if (err.message === 'Product not found') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }
});

// Add comment/review to product
productRouter.post('/:id/comments', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { content, rating } = req.body;
    const productId = parseInt(req.params.id);

    if (!content || rating === undefined) {
      return res.status(400).json({ error: 'Content and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const comment = await db.productComment.create({
      data: {
        productId,
        userId: req.user.id,
        content,
        rating,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    // Update product average rating
    const comments = await db.productComment.findMany({
      where: { productId },
      select: { rating: true }
    });

    const avgRating = comments.reduce((sum, c) => sum + c.rating, 0) / comments.length;
    
    await db.product.update({
      where: { id: productId },
      data: { rating: avgRating }
    });

    res.status(201).json({ ok: true, data: comment });
  } catch (error) {
    const err = error as ErrorWithMessage;
    console.error(err.message);
    res.status(500).json({ ok: false, error: 'Failed to add comment' });
  }
});

// Get comments for product
productRouter.get('/:id/comments', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const comments = await db.productComment.findMany({
      where: { productId },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ ok: true, data: comments });
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Failed to fetch comments' });
  }
});

productRouter.delete('/comments/:commentId', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const commentId = parseInt(req.params.commentId);

    const comment = await db.productComment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    const productId = comment.productId;

    await db.productComment.delete({
      where: { id: commentId }
    });

    // Recalculate product average rating
    const remainingComments = await db.productComment.findMany({
      where: { productId },
      select: { rating: true }
    });

    if (remainingComments.length > 0) {
      const avgRating = remainingComments.reduce((sum, c) => sum + c.rating, 0) / remainingComments.length;
      await db.product.update({
        where: { id: productId },
        data: { rating: avgRating }
      });
    } else {
      await db.product.update({
        where: { id: productId },
        data: { rating: null }
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// Create product (admin only)
productRouter.post('/', isAdminMiddleware, async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    const err = error as ErrorWithMessage;
    if (err.message === 'Admin access required') {
      res.status(403).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
});

// Update product (admin only)
productRouter.put('/:id', isAdminMiddleware, async (req, res) => {
  try {
    const product = await productService.updateProduct(
      parseInt(req.params.id),
      req.body
    );
    res.json(product);
  } catch (error) {
    const err = error as ErrorWithMessage;
    if (err.message === 'Admin access required') {
      res.status(403).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
});

// Delete product (admin only)
productRouter.delete('/:id', isAdminMiddleware, async (req, res) => {
  try {
    await productService.deleteProduct(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    const err = error as ErrorWithMessage;
    if (err.message === 'Admin access required') {
      res.status(403).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
});