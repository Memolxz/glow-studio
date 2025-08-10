import { db } from "../db/db";

// dsp ver bien tdo

export async function deleteUsers(days: number = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const result = await db.users.deleteMany({
    where: {
      deletedAt: {
        not: null,
        lt: cutoffDate
      }
    }
  });

  console.log(`Se eliminaron ${result.count} usuarios`);
}
