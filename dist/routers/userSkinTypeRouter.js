"use strict";
// import { Router } from "express"
// import { UserSkinTypeService } from "../services/userSkinTypeService"
// const userSkinTypeService = new UserSkinTypeService();
// export const userSkinTypeRouter = Router()
// userSkinTypeRouter.get('/', async (_, res) => {
//   try {
//     const userSkinTypes = await userSkinTypeService.getAllUserSkinTypes();
//     res.status(200).json({ ok: true, data: userSkinTypes })
//   } catch (error) {
//     res.status(500).json({ ok: false, error: (error as any).message })
//   }
// })
// userSkinTypeRouter.get('/:id', async (req, res) => {
//   try {
//     const userSkinTypeIdToGet = parseInt(req.params.id);
//     const userSkinType = await userSkinTypeService.getUserSkinTypeById(userSkinTypeIdToGet);
//     res.status(200).json({ ok: true, data: userSkinType })
//   } catch (error) {
//     res.status(500).json({ ok: false, error: (error as any).message })
//   }
// })
// userSkinTypeRouter.post('/', async (req, res) => {
//   try {
//     const userSkinTypeFromRequest = req.body;
//     const userSkinTypeCreated = await userSkinTypeService.createUserSkinType(userSkinTypeFromRequest);
//     res.status(201).json({ ok: true, data: userSkinTypeCreated });
//   } catch (error) {
//     res.status(500).json({ ok: false, error: (error as any).message })
//   }
// })
// userSkinTypeRouter.put('/:id', async (req, res) => {
//   try {
//     const userSkinTypeIdToModify = req.params.id;
//     const userSkinTypeBody = req.body;
//     const userSkinTypeModified = await userSkinTypeService.updateUserSkinType({ id: userSkinTypeIdToModify, ...userSkinTypeBody });
//     res.status(200).json({ ok: true, data: userSkinTypeModified });
//   } catch (error) {
//     res.status(500).json({ ok: false, error: (error as any).message })
//   }
// })
// userSkinTypeRouter.patch('/:id', async (req, res) => {
//   try {
//     const userSkinTypeIdToModify = parseInt(req.params.id);
//     const userSkinTypeBody = req.body;
//     const fullUserSkinType = await userSkinTypeService.getUserSkinTypeById(userSkinTypeIdToModify);
//     const fullUserSkinTypeBody = { ...fullUserSkinType, ...userSkinTypeBody }
//     const userSkinTypeModified = await userSkinTypeService.updateUserSkinType(fullUserSkinTypeBody);
//     res.status(200).json({ ok: true, data: userSkinTypeModified });
//   } catch (error) {
//     res.status(500).json({ ok: false, error: (error as any).message })
//   }
// })
