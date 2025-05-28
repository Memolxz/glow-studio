import { Request, Response } from "express";

import { UserService } from "../services/user-service";

const userService = new UserService();

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ ok: true, data: users });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userIdToGet = parseInt(req.params.id);
    const user = await userService.getUserById(userIdToGet);
    res.status(200).json({ ok: true, data: user })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userIdToModify = req.params.id;
    const userBody = req.body;

    const userModified = await userService.updateUser({ id: userIdToModify, ...userBody });
  
    res.status(200).json({ ok: true, data: userModified });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
}

export const patchUser = async (req: Request, res: Response) => {
  try {
    const userIdToModify = parseInt(req.params.id);
    const userBody = req.body;
    
    const fullUser = await userService.getUserById(userIdToModify);
    
    // Primero desestructuro todo el fullUser, luego desestructuro los atributos que me
    // hayan pasado en el body para sobrescribir los primeros
    const fullUserBody = { ...fullUser, ...userBody }
    
    const userModified = await userService.updateUser(fullUserBody);
    
    res.status(200).json({ ok: true, data: userModified });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userIdToDelete = parseInt(req.params.id);
    
    await userService.deleteUser(userIdToDelete)
    
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
}

export const restoreUser = async (req: Request, res: Response) => {
  try {
    const userIdToRestore = parseInt(req.params.id);
    
    await userService.restoreUser(userIdToRestore)
    
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
}