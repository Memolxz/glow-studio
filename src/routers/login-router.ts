import { Router, Request, Response } from 'express';
import { UserService } from '../services/user-service';

const userService = new UserService();

export const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ mensaje: 'email y contraseña son requeridos' });
    }

    const credencialesValidas = await userService.checkPassword(email, password);

    if (!credencialesValidas) {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
      
    res.status(201).json({mensaje: 'Login sucsessful'})

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor al procesar el login' });
  }
}
);

export default loginRouter;