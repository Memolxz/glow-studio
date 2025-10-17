// Use this in your frontend components
export const categoryDisplayNames: Record<string, string> = {
  // Moisturizers
  FACE_CREAM: "Crema Facial",
  MIST_ESSENCE: "Bruma y Esencia",
  NIGHT_CREAM: "Crema Nocturna",
  NECK_CREAM: "Crema para Cuello",
  BB_CC_CREAM: "BB/CC Cream",
  FACE_OIL: "Aceite Facial",
  
  // Cleansers
  CLEANSER: "Limpiador",
  EXFOLIANT: "Exfoliante",
  MAKEUP_REMOVER: "Desmaquillante",
  FACE_WIPE: "Toallitas",
  TONER: "Tónico",
  
  // Treatments
  SERUM: "Sérum",
  ACNE_TREATMENT: "Tratamiento para Acné",
  FACIAL_PEEL: "Peeling Facial",
  
  // Masks
  FACE_MASK: "Mascarilla Facial",
  SHEET_MASK: "Mascarilla de Tela",
  EYE_MASK: "Mascarilla para Ojos",
  
  // Eye Care
  EYE_CREAM: "Crema para Ojos",
  
  // Sunscreen
  FACE_SUNSCREEN: "Protector Solar Facial",
  BODY_SUNSCREEN: "Protector Solar Corporal",
};

export const bodyPartDisplayNames: Record<string, string> = {
  FACE: "Rostro",
  EYES: "Ojos",
  NECK: "Cuello",
  BODY: "Cuerpo",
};

// Helper function to get display name with fallback
export function getCategoryDisplayName(category: string): string {
  return categoryDisplayNames[category] || category;
}

export function getBodyPartDisplayName(bodyPart: string): string {
  return bodyPartDisplayNames[bodyPart] || bodyPart;
}