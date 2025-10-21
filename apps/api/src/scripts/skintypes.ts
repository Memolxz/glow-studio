import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

interface SkinTypeData {
  id?: number;
  name: string;
  description: string;
}

async function main() {
  const data: SkinTypeData[] = JSON.parse(
    fs.readFileSync("./SkinType.json", "utf-8")
  );

  // Borra los registros anteriores (opcional)
  await prisma.skinType.deleteMany();

  // Inserta todos los registros del JSON
  await prisma.skinType.createMany({
    data: data.map(({ id, ...rest }) => rest), // ignoramos el id porque es autoincremental
  });

  console.log("✅ Datos importados correctamente en SkinType");
}

main()
  .catch((e) => {
    console.error("❌ Error al importar datos:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
