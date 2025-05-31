import { Router } from "express"

import { getAllUsers, getUserByEmail, updateUser, patchUser, deleteUser, restoreUser } from "../controllers/user-controller";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get('/:mail', getUserByEmail);
userRouter.put('/:id', updateUser);
userRouter.patch('/:id', patchUser);
userRouter.delete('/:id', deleteUser);
userRouter.patch('/restore/:id', restoreUser);