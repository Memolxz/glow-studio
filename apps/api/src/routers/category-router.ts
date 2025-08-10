import express, { Response, Request, RequestHandler } from 'express';
import { CategoryService } from '../services/category-service';
import { jwtAuthMiddleware, isAdminMiddleware } from '../middleware/auth-middleware';

const router = express.Router();
const categoryService = new CategoryService();

// Get all categories
router.get('/',(async (_: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
}) as RequestHandler);

// Create new category
router.post('/', isAdminMiddleware, (async (req, res: Response) => {
  try {
    const { name } = req.body;

    if (!req.user){
      throw new Error('Not logged in');
    }
    
    // Validate that name is a valid category type
    const newCategory = await categoryService.createCategory(name);
    res.status(201).json(newCategory);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2002') {
      res.status(400).json({ error: "Esta categoría ya existe" });
    } else if (error.message === "Acceso de administrador requerido") {
      res.status(403).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al crear la categoría" });
    }
  }
}) as RequestHandler);

// Update category
router.put('/:id', isAdminMiddleware, (async (req, res: Response) => {
  try {
    const { name } = req.body;
    const categoryId = parseInt(req.params.id);

    const updatedCategory = await categoryService.updateCategory(categoryId,name);
    res.json(updatedCategory);
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2002') {
      res.status(400).json({ error: "Esta categoría ya existe" });
    } else if (error.message === "Acceso de administrador requerido") {
      res.status(403).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al actualizar la categoría" });
    }
  }
}) as RequestHandler);

// Delete category
router.delete('/:id', isAdminMiddleware, (async (req, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);
    await categoryService.deleteCategory(categoryId);
    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    if (error.message === "Acceso de administrador requerido") {
      res.status(403).json({ error: error.message });
    } else if (error.message === "No se puede eliminar una categoría con productos asociados") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error al eliminar la categoría" });
    }
  }
}) as RequestHandler);

export default router; 