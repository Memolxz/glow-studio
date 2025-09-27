import { Router, Request, Response } from "express"
import { UserService } from "../services/user-service";
import { isAdminMiddleware } from "../middleware/auth-middleware";

const userService = new UserService();

export const userRouter = Router();

userRouter.get("/",isAdminMiddleware, async (_: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ ok: true, data: users });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

userRouter.get('/:mail',isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const userMailToGet = req.params.mail;
    const user = await userService.getUserByEmail(userMailToGet);
    res.status(200).json({ ok: true, data: user })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
});

userRouter.get('/deleted/:mail',isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const userMailToGet = req.params.mail;
    const user = await userService.getDeletedUser(userMailToGet);
    res.status(200).json({ ok: true, data: user })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
});

userRouter.put('/:id',isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const userIdToModify = req.params.id;
    const userBody = req.body;

    const userModified = await userService.updateUser({ id: userIdToModify, ...userBody });
  
    res.status(200).json({ ok: true, data: userModified });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
});

userRouter.patch('/:id',isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const userIdToModify = parseInt(req.params.id);
    const userBody = req.body;
    
    const fullUser = await userService.getUserById(userIdToModify);
    
    const fullUserBody = { ...fullUser, ...userBody }
    
    const userModified = await userService.updateUser(fullUserBody);
    
    res.status(200).json({ ok: true, data: userModified });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
});

userRouter.delete('/:id',isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const userIdToDelete = parseInt(req.params.id);
    
    await userService.deleteUser(userIdToDelete)
    
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
});

userRouter.patch('/restore/:id',isAdminMiddleware, async (req: Request, res: Response) => {
  try {
    const userIdToRestore = parseInt(req.params.id);
    
    await userService.restoreUser(userIdToRestore)
    
    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
});

userRouter.post('/skintype/:id', async (req: Request, res: Response) => {
  try {
    const userIdToGet = parseInt(req.params.id);
    const { skinTypeId } = req.body;

    await userService.assignSkinType(userIdToGet, skinTypeId);

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message });
  }
});

userRouter.get('/skintype/:id', async (req: Request, res: Response) => {
  try {
    const userIdToGet = parseInt(req.params.id);
    const user = await userService.getUserSkinTypes(userIdToGet);
    res.status(200).json({ ok: true, data: user })
  } catch (error) {
    res.status(500).json({ ok: false, error: (error as any).message })
  }
});