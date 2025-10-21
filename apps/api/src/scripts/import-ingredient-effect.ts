import fs from "fs";
import path from "path";
import { db } from "../db/db";

async function main() {
  const jsonPath = path.resolve(__dirname, "IngredientEffects_prisma.json");

  if (!fs.existsSync(jsonPath)) {
    console.error("❌ No se encontró IngredientEffects_prisma.json en", jsonPath);
    process.exit(1);
  }

  console.log("📖 Leyendo archivo:", jsonPath);
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data: { ingredientId: number; skinTypeId: number; Effect: "GOOD" | "BAD" }[] = JSON.parse(raw);

  console.log(`✅ ${data.length} registros listos para insertar`);

  const batchSize = 500;
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await db.ingredientEffect.createMany({
      data: batch,
      skipDuplicates: true,
    });
    console.log(`💾 Insertados ${i + batch.length}/${data.length}`);
  }

  console.log("🎉 Importación completada con éxito");
}

main()
  .catch((err) => {
    console.error("❌ Error durante la importación:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });