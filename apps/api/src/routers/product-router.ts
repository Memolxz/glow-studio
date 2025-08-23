import express from 'express';
import { jwtAuthMiddleware, isAdminMiddleware } from '../middleware/auth-middleware';
import { ProductService } from '../services/product-service';
import { RecommendationService } from '../services/recommendation-service';
import { ErrorWithMessage } from '../type';

const router = express.Router();
const productService = new ProductService();
const recommendationService = new RecommendationService();

// Get all products (with optional filters)
router.get('/', async (_, res) => {
  try {
    const products = await productService.getAllProducts();
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
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

// Get product by category
router.get('/:category', async (req, res) => {
  try {
    const products = await productService.getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

// Create product (admin only)
router.post('/', isAdminMiddleware, async (req, res) => {
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
router.put('/:id', isAdminMiddleware, async (req, res) => {
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
router.delete('/:id', isAdminMiddleware, async (req, res) => {
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

// Get recommendations for user
router.get('/recommendations', jwtAuthMiddleware, async (req, res) => {
  try {
    if (!req.user){
      throw new Error('Not logged in');
    }
    
    const userId = req.user.id;

    // Users can only get their own recommendations
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

export default router;