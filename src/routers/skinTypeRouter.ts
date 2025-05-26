import { Router } from "express"

import { getAllSkinTypes, getSkinTypeById, createSkinType, updateSkinType, patchSkinType, deleteSkinType } from "../controllers/skinTypeController";

export const skinTypeRouter = Router();

skinTypeRouter.get("/", getAllSkinTypes);
skinTypeRouter.get('/:id', getSkinTypeById);
skinTypeRouter.post('/', createSkinType);
skinTypeRouter.put('/:id', updateSkinType);
skinTypeRouter.patch('/:id', patchSkinType);
skinTypeRouter.delete('/:id', deleteSkinType);
