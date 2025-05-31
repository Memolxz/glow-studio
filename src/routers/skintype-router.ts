import { Router } from "express"

import { getAllSkinTypes, createSkinType, updateSkinType, patchSkinType, deleteSkinType } from "../controllers/skintype-controller";

export const skinTypeRouter = Router();

skinTypeRouter.get("/", getAllSkinTypes);
skinTypeRouter.post('/', createSkinType);
skinTypeRouter.put('/:id', updateSkinType);
skinTypeRouter.patch('/:id', patchSkinType);
skinTypeRouter.delete('/:id', deleteSkinType);

