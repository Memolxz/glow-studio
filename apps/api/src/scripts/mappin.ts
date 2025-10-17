// apps/api/src/services/sephora-mapping-service.ts

import { ProductCategoryType, BodyPart } from '@prisma/client';

interface SephoraCategoryMapping {
  bodyPart: BodyPart;
  category: ProductCategoryType;
}

export class SephoraMappingService {
  // Map Sephora categories to your schema
  private categoryMappings: Record<string, SephoraCategoryMapping> = {
    // Face products
    'Face Serums': { bodyPart: 'FACE', category: 'SERUM' },
    'Face Creams': { bodyPart: 'FACE', category: 'MOISTURIZER' },
    'Night Creams': { bodyPart: 'FACE', category: 'MOISTURIZER' },
    'Face Oils': { bodyPart: 'FACE', category: 'FACIAL_OIL' },
    'Face Wash & Cleansers': { bodyPart: 'FACE', category: 'CLEANSER' },
    'Exfoliators': { bodyPart: 'FACE', category: 'EXFOLIANT' },
    'Toners': { bodyPart: 'FACE', category: 'TONER' },
    'Face Sunscreen': { bodyPart: 'FACE', category: 'SUNSCREEN' },
    'Face Masks': { bodyPart: 'FACE', category: 'MASK' },
    'Sheet Masks': { bodyPart: 'FACE', category: 'MASK' },
    'Mists & Essences': { bodyPart: 'FACE', category: 'MIST' },
    'Facial Peels': { bodyPart: 'FACE', category: 'TREATMENT' },
    'Acne & Blemish Treatments': { bodyPart: 'FACE', category: 'TREATMENT' },
    
    // Eye products
    'Eye Creams & Treatments': { bodyPart: 'EYES', category: 'EYE_CREAM' },
    'Eye Masks': { bodyPart: 'EYES', category: 'MASK' },
    
    // Lip products
    'Lip Balms & Treatments': { bodyPart: 'LIPS', category: 'LIP_BALM' },
    
    // Body products
    'Body Sunscreen': { bodyPart: 'BODY', category: 'SUNSCREEN' },
  };

  mapSephoraProduct(sephoraCategory: string): SephoraCategoryMapping | null {
    // Direct mapping
    if (this.categoryMappings[sephoraCategory]) {
      return this.categoryMappings[sephoraCategory];
    }

    // Fuzzy matching for variations
    const lowerCategory = sephoraCategory.toLowerCase();
    
    if (lowerCategory.includes('serum')) {
      return { bodyPart: 'FACE', category: 'SERUM' };
    }
    if (lowerCategory.includes('cleanser') || lowerCategory.includes('wash')) {
      return { bodyPart: 'FACE', category: 'CLEANSER' };
    }
    if (lowerCategory.includes('moisturizer') || lowerCategory.includes('cream')) {
      return { bodyPart: 'FACE', category: 'MOISTURIZER' };
    }
    if (lowerCategory.includes('toner')) {
      return { bodyPart: 'FACE', category: 'TONER' };
    }
    if (lowerCategory.includes('sunscreen') || lowerCategory.includes('spf')) {
      return { bodyPart: lowerCategory.includes('body') ? 'BODY' : 'FACE', category: 'SUNSCREEN' };
    }
    if (lowerCategory.includes('mask')) {
      return { bodyPart: 'FACE', category: 'MASK' };
    }
    if (lowerCategory.includes('exfoliant') || lowerCategory.includes('scrub')) {
      return { bodyPart: 'FACE', category: 'EXFOLIANT' };
    }
    if (lowerCategory.includes('treatment') || lowerCategory.includes('acne')) {
      return { bodyPart: 'FACE', category: 'TREATMENT' };
    }
    if (lowerCategory.includes('eye')) {
      return { bodyPart: 'EYES', category: 'EYE_CREAM' };
    }
    if (lowerCategory.includes('lip')) {
      return { bodyPart: 'LIPS', category: 'LIP_BALM' };
    }

    // Default fallback
    console.warn(`Unknown category: ${sephoraCategory}, defaulting to TREATMENT/FACE`);
    return { bodyPart: 'FACE', category: 'TREATMENT' };
  }

  // Helper to determine if a product should be imported
  shouldImportProduct(sephoraCategory: string): boolean {
    const mapping = this.mapSephoraProduct(sephoraCategory);
    return mapping !== null;
  }
}