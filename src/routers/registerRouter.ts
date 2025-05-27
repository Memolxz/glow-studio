import { Router } from "express"

import { createUser } from "../controllers/registerController";

export const registerRouter = Router();

registerRouter.post('/', createUser);
