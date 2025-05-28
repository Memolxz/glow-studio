// import { userSkinType } from "@prisma/client";

// import { db } from "../db/db";

// interface CreateUserSkinTypeBody {
//   id: number
//   userId: number
//   skinTypeId: number
// }

// export class UserSkinTypeService {
//   async getAllUserSkinTypes() {
//     try {
//       const userSkinType = await db.userSkinType.findMany({
//       })

//       return userSkinType;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Error al obtener tipos de piel del usuario. Mira los logs para más información.")
//     }
//   }

//   async getUserSkinTypeById(userSkinTypeId: number) {
//     try {
//       const userSkinType = await db.userSkinType.findFirst({
//         where: {
//           id: userSkinTypeId,
//         }
//       })

//       if (!userSkinType) {
//         throw new Error(`No se encontró el tipo de piel del usuario con id ${userSkinTypeId}`)
//       }

//       return userSkinType;
//     } catch (error) {
//       console.error(error);
//       throw new Error(`Error al obtener el tipo de piel del usuario con id ${userSkinTypeId}. Mira los logs para más información.`)
//     }
//   }

//   async createUserSkinType(body: CreateUserSkinTypeBody) {
//     try {
//       const userSkinType = await db.userSkinType.create({
//         data: body
//       })

//       return userSkinType;
//     } catch (error) {
//       console.error("Error creando tipo de piel del usuario: ", body)
//       console.error(error);
//       throw new Error("Error al crear tipo de piel del usuario. Mira los logs para más información.")
//     }
//   }

//   async updateUserSkinType(body: userSkinType) {
//     try {

//       const existingUserSkinType = await db.userSkinType.findFirst({
//         where: {
//           id: body.id,
//         }
//       })

//       if (!existingUserSkinType) {
//         throw new Error(`No se encontró tipo de piel del usuario con id ${body.id}`)
//       }

//       const updatedUserSkinType = await db.userSkinType.update({
//         where: { id: body.id},
//         data: body
//       })

//       return updatedUserSkinType
//     } catch (error) {
//       console.error("Error actualizando tipo de piel del usuario: ", body)
//       console.error(error);
//       throw new Error(`Error al actualizar el tipo de piel del usuario con id ${body.id}. Mira los logs para más información.`)
//     }
//   }
// }