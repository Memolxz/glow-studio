import { sign, verify } from "jsonwebtoken";
import { users } from ".prisma/client";

import { db } from "../db/db";

export class JwtService {
  async generateJsonWebAccessToken(user: users) {
    try {
      const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1hr' })
      return token;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al generar token JWT. Mira los logs para más información.`)
    }
  }

  async generateJsonWebRefreshToken(user: users) {
    try {
      const token = sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
      return token;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al generar token JWT. Mira los logs para más información.`)
    }
  }

  async generateJsonWebAccessTokenFromRefreshToken(refreshToken: string) {
    try {
      const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET) as { id: number };
      
      const user = await db.users.findUnique({
        where: {
          id: decoded.id,
          deletedAt: null
        }
      });
      
      if (!user) {
        throw new Error('Usuario no encontrado o inválido');
      }
      
      const newAccessToken = await this.generateJsonWebAccessToken(user);

      return { accessToken: newAccessToken };
    } catch (error) {
      console.error(error);
      throw new Error(`Error al refrescar token JWT. Mira los logs para más información.`)
    }
  }
}