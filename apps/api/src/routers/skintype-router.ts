import { Router, Request, Response } from "express"
import { SkinTypeService } from "../services/skintype-service";

const skinTypeService = new SkinTypeService();

export const skinTypeRouter = Router();

skinTypeRouter.get("/", async (_: Request, res: Response) => {
  try {
    const skinTypes = await skinTypeService.getAllSkinTypes();
    res.status(200).json({ ok: true, data: skinTypes });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

skinTypeRouter.post('/', async (req: Request, res: Response) => {
  try {
    const skinTypeFromRequest = req.body;
    const skinTypeCreated = await skinTypeService.createSkinType(skinTypeFromRequest);
    res.status(201).json({ ok: true, data: skinTypeCreated });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

skinTypeRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const skinTypeIdToModify = parseInt(req.params.id);
    const skinTypeBody = req.body;

    const skinTypeModified = await skinTypeService.updateSkinType({id: skinTypeIdToModify, ...skinTypeBody });

    res.status(200).json({ ok: true, data: skinTypeModified });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

skinTypeRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const skinTypeIdToModify = parseInt(req.params.id);
    const skinTypeBody = req.body;

    const fullSkinType = await skinTypeService.getSkinTypeById(skinTypeIdToModify);

    const fullSkinTypeBody = { ...fullSkinType, ...skinTypeBody };

    const skinTypeModified = await skinTypeService.updateSkinType(fullSkinTypeBody);

    res.status(200).json({ ok: true, data: skinTypeModified });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

skinTypeRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const skinTypeIdToDelete = parseInt(req.params.id);
    
    await skinTypeService.deleteSkinType(skinTypeIdToDelete);
    
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

