import { SkinType } from "@prisma/client";

import { db } from "../db/db";

interface CreateSkinTypeBody {
  name: string
}

export class SkinTypeService {
  async getAllSkinTypes() {
    try {
      const skinType = await db.skinType.findMany({
      })

      return skinType;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener tipos de piel. Mira los logs para más información.")
    }
  }

  async getSkinTypeById(skinTypeId: number) {
    try {
      const skinType = await db.skinType.findFirst({
        where: {
          id: skinTypeId,
        }
      })

      if (!skinType) {
        throw new Error(`No se encontró el tipo de piel con id ${skinTypeId}`)
      }

      return skinType;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al obtener el tipo de piel con id ${skinTypeId}. Mira los logs para más información.`)
    }
  }

  async createSkinType(body: CreateSkinTypeBody) {
    try {
      const skinType = await db.skinType.create({
        data: body
      })

      return skinType;
    } catch (error) {
      console.error("Error creando tipo de piel: ", body)
      console.error(error);
      throw new Error("Error al crear tipo de piel. Mira los logs para más información.")
    }
  }

  async updateSkinType(body: SkinType) {
    try {
      const existingSkinType = await db.skinType.findFirst({
        where: {
          id: body.id,
        }
      })

      if (!existingSkinType) {
        throw new Error(`No se encontró el tipo de piel con id ${body.id}`)
      }

      const updatedSkinType = await db.skinType.update({
        where: { id: body.id},
        data: body
      })

      return updatedSkinType
    } catch (error) {
      console.error("Error actualizando tipo de piel: ", body)
      console.error(error);
      throw new Error(`Error al actualizar el tipo de piel con id ${body.id}. Mira los logs para más información.`)
    }
  }

  async deleteSkinType(skinTypeId: number) {
    try {
      const deletedSkinType = await db.skinType.delete({
        where: {
          id: skinTypeId
        }
      })

      return deletedSkinType;
    } catch (error) {
      console.error(error);
      throw new Error(`Error al eliminar el tipo de piel con id ${skinTypeId}. Mira los logs para más información.`)
    }
  } 
}