import { Request, Response } from "express";

import { UserService } from "../services/userService";

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  try {
    const userFromRequest = req.body;
    const userCreated = await userService.createUser(userFromRequest);
    res.status(201).json({ ok: true, data: userCreated });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
}