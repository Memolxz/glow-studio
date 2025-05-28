import { Router } from "express"

import { getAllUsers, getUserById, updateUser, patchUser, deleteUser } from "../controllers/user-controller";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.patch('/:id', patchUser);
userRouter.delete('/:id', deleteUser);