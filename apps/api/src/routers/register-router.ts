import { Router, Request, Response } from "express"
import { UserService } from "../services/user-service";

const userService = new UserService();

export const registerRouter = Router();

registerRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userFromRequest = req.body;
    const userCreated = await userService.createUser(userFromRequest);
    res.status(201).json({ data: userCreated });
  } catch (error) {
    res.status(500).json({ error: (error as any).message })
  }
});
