import { Router, Request, Response } from 'express';

import { AuthService } from "../services/auth-service";
import { JwtService } from "../services/jwt-service";
import { ErrorWithMessage } from '../type';

const authService = new AuthService();
const jwtService = new JwtService();

export const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ mensaje: 'email y contraseña son requeridos' });
    }

    const user = await authService.verifyLogin(email, password);

    const accessToken = await jwtService.generateJsonWebAccessToken(user);
    const refreshToken = await jwtService.generateJsonWebRefreshToken(user);
    res.status(201).json({ ok: true, data: { accessToken, refreshToken } }); 

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor al procesar el login' });
  }
});

loginRouter.post('/refresh-token', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Refresh token es requerido' 
      });
    }

    const result = await jwtService.generateJsonWebAccessTokenFromRefreshToken(refreshToken);
    
    res.status(200).json({ 
      ok: true, 
      data: { 
        accessToken: result.accessToken 
      } 
    });

  } catch (error) {
    const err = error as ErrorWithMessage;
    console.error('Error al refrescar token:', err);
    res.status(401).json({ 
      ok: false, 
      error: err.message || 'Error al refrescar token' 
    });
  }
});
export default loginRouter;