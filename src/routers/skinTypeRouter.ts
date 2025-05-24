import { Router } from "express"

import { SkinTypeService } from "../services/skinTypeService"

const skinTypeService = new SkinTypeService();

export const skinTypeRouter = Router()


skinTypeRouter.get('/', async (_, res) => {
  try {
    const skinTypes = await skinTypeService.getAllSkinTypes();
    res.status(200).json({ ok: true, data: skinTypes })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

skinTypeRouter.get('/:id', async (req, res) => {
  try {
    const skinTypeIdToGet = parseInt(req.params.id);
    const skinType = await skinTypeService.getSkinTypeById(skinTypeIdToGet);
    res.status(200).json({ ok: true, data: skinType })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

skinTypeRouter.post('/', async (req, res) => {
  try {
    const skinTypeFromRequest = req.body;
    const skinTypeCreated = await skinTypeService.createSkinType(skinTypeFromRequest);
    res.status(201).json({ ok: true, data: skinTypeCreated });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

skinTypeRouter.put('/:id', async (req, res) => {
  try {
    const skinTypeIdToModify = req.params.id;
    const skinTypeBody = req.body;

    const skinTypeModified = await skinTypeService.updateSkinType({ id: skinTypeIdToModify, ...skinTypeBody });

    res.status(200).json({ ok: true, data: skinTypeModified });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})

skinTypeRouter.patch('/:id', async (req, res) => {
  try {
    const skinTypeIdToModify = parseInt(req.params.id);
    const skinTypeBody = req.body;

    const fullSkinType = await skinTypeService.getSkinTypeById(skinTypeIdToModify);

    const fullSkinTypeBody = { ...fullSkinType, ...skinTypeBody }

    const skinTypeModified = await skinTypeService.updateSkinType(fullSkinTypeBody);

    res.status(200).json({ ok: true, data: skinTypeModified });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
})