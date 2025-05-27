import { Router } from "express"

import { getAllUsers, getUserById, updateUser, patchUser, deleteUser } from "../controllers/userController";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.patch('/:id', patchUser);
userRouter.delete('/:id', deleteUser);