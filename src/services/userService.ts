import { users } from "@prisma/client";

import { db } from "../db/db";

interface CreateUserBody {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class UserService {
  async getAllUsers() {
    try {
      const users = await db.users.findMany({
        where: {
          deletedAt: null
        }
      })

      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await db.users.findFirst({
        where: {
          id: userId,
          deletedAt: null
        }
      })

      if (!user) {
        throw new Error(`No se encontró el usuario con id ${userId}`)
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener usuario con id ${userId}. Mira los logs para más información.`)
    }
  }

  async createUser(body: CreateUserBody) {
    try {
      const user = await db.users.create({
        data: body
      })

      return user;
    } catch (error) {
      console.error("Error creando usuario: ", body)
      console.error(error);
      throw new Error("Error al crear usuario. Mira los logs para más información.")
    }
  }

  async updateUser(body: users) {
    try {

      const existingUser = await db.users.findFirst({
        where: {
          id: body.id,
          deletedAt: null
        }
      })

      if (!existingUser) {
        throw new Error(`No se encontró el usuario con id ${body.id}`)
      }

      const updatedUser = await db.users.update({
        where: { id: body.id},
        data: body
      })

      return updatedUser
    } catch (error) {
      console.error("Error actualizando usuario: ", body)
      console.error(error);
      throw new Error(`Error al actualizar el usuario con id ${body.id}. Mira los logs para más información.`)
    }
  }

  async deleteUser(userId: number) {
    try {
      const existingUser = await db.users.findFirst({
        where: {
          id: userId,
          deletedAt: null
        }
      })

      if (!existingUser) {
        throw new Error(`No se encontró el usuario con id ${userId}`)
      }



      const deletedUser = await db.users.update({
        where: { id: userId },
        data: {
          deletedAt: new Date()
        }
      })

      return deletedUser;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar el usuario con id ${userId}. Mira los logs para más información.`)
    }
  }

  async getDeletedUsers() {
    try {
      const users = await db.users.findMany({
        where: {
          deletedAt: {not: null}
        }
      })

      return users;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener usuarios. Mira los logs para más información.")
    }
  }

  async assignSkinType(userId: number, skinTypeId: number) {
    return await db.userSkinType.create({
      data: { userId, skinTypeId }
    });
  }

  async removeSkinType(userId: number, skinTypeId: number) {
    return await db.userSkinType.deleteMany({
      where: { userId, skinTypeId }
    });
  }

  async getUserSkinTypes(userId: number) {
    return await db.userSkinType.findMany({
      where: { userId }
      // include: { skinType: true }
    });
    //  return relations.map(rel => rel.skinType);
  }
}