import { Request, Response } from 'express';
import { UserService } from '../services/user-service';

const userService = new UserService();

export async function login(req: Request, res: Response) {
  try {
    const { email: email, password: password } = req.body;

    if (!email || !password) {
      res.status(400).json({ mensaje: 'email y contraseña son requeridos' });
    }

      const usuario = await userService.getUserByEmail(email);

      if (!usuario) {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      if (password !== usuario.password) {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }
      
      // Autenticación
    //   req.session.user = {
    //     id: usuario.id,
    //     rol: usuario.rol
    //   }

      res.status(201).json({mensaje: 'Login sucsessful'})

  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor al procesar el login' });
  }
}
