import { hash, compare } from 'bcrypt'
import { users } from '@prisma/client'

import { db } from "../db/db";

interface CreateUserBody {
  name: string,
  email: string,
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
      throw new Error("Error al obtener usuarios")
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
        throw new Error(`usuario no existe`)
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener usuario`)
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await db.users.findFirst({
        where: {
          email,
          deletedAt: null
        }
      })

      if (!user) {
        throw new Error(`usuario no existe`)
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener usuario`)
    }
  }

  async getDeletedUser(email: string) {
    try {
      const user = await db.users.findFirst({
        where: {
          email,
          deletedAt: {not: null}
        }
      })

      if (!user) {
        throw new Error(`usuario no existe`)
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener usuario`)
    }
  }

  async createUser(body: CreateUserBody) {
    try {
      const existingUser = await db.users.findUnique({
        where: { email: body.email }
        });

      if (existingUser) {
        throw new Error(`usuario ya esta registrado`)
      }

      const user = await db.users.create({
        data: {
          ...body,
          password: await hash(body.password, 10)
        }
      })

      return user;
    } catch (error) {
      console.error("Error al crear usuario: ", body)
      console.error(error);
      throw new Error("Error al crear usuario")
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
        throw new Error(`usuario no existe`)
      }

      const updatedUser = await db.users.update({
        where: { id: body.id},
        data: body
      })

      return updatedUser
    } catch (error) {
      console.error("Error actualizando usuario: ", body)
      console.error(error);
      throw new Error(`Error al actualizar el usuario`)
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
        throw new Error(`usuario no existe`)
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
      throw new Error(`Error al eliminar el usuario`)
    }
  }

  async restoreUser(userId: number) {
    try {
      const deletedUser = await db.users.findFirst({
        where: {
          deletedAt: {not: null}
        }
      });

      if (!deletedUser) {
        throw new Error(`usuario eliminado no existe`);
      }

      return await db.users.update({
        where: { id: userId },
        data: { 
          deletedAt: null 
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error(`Error al restaurar el usuario`);
    }
  }

  async assignSkinType(userId: number, skinTypeId: number) {
    try {
      const userSkinType = await db.userSkinType.create({
        data: { userId, skinTypeId }
      })

      return userSkinType;
    } catch (error) {
      console.error(error);
      throw new Error('')
    }
  }

  async removeSkinType(userId: number, skinTypeId: number) {
    try{
      const removedSkinType = await db.userSkinType.deleteMany({
        where: { userId, skinTypeId }
      });

      return removedSkinType;
    }
    catch(error){
      console.error(error);
      throw new Error(`Error al eliminar descartar tipo de piel`);
    }
  }

  async updateSkinTypes(userId: number, skinTypeIds: number[]) {
    try {
      const currentSkinTypes = await db.userSkinType.findMany({
        where: { userId },
        select: { skinTypeId: true },
      });
      
      const currentSkinTypeIds = currentSkinTypes.map(s => s.skinTypeId);
      const toAdd = skinTypeIds.filter(id => !currentSkinTypeIds.includes(id));
      const toRemove = currentSkinTypeIds.filter(id => !skinTypeIds.includes(id));

      await db.userSkinType.deleteMany({
        where: {
          userId,
          skinTypeId: { in: toRemove },
        },
      });
      const created = await Promise.all(toAdd.map(id => 
        db.userSkinType.create({
          data: { userId, skinTypeId: id },
        })
      ));
      await db.recommendation.deleteMany({
        where: { userId }
      });

      return created;
    } 
    catch (error) {
      console.error(error);
      throw new Error(`Error al actualizar tipos de piel`);
    }
  }

  async getUserSkinTypes(userId: number) {
    const relations = await db.userSkinType.findMany({
      where: { userId },
      include: { skinType: true },
    });
    return relations;
  }
}