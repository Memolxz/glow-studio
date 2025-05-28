import { Router } from "express"

import { createUser } from "../controllers/register-controller";

export const registerRouter = Router();

registerRouter.post('/', createUser);
