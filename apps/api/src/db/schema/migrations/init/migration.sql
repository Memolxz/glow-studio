
[+] Added enums
  - Effects
  - ProductCategoryType
  - BodyPart

[+] Added tables
  - IngredientEffect
  - Ingredients
  - Product
  - ProductIngredient
  - ProductComment
  - Recommendation
  - RecommendationIngredient
  - SkinType
  - Users
  - UserSkinType

[*] Changed the `IngredientEffect` table
  [+] Added foreign key on columns (ingredientId)
  [+] Added foreign key on columns (skinTypeId)

[*] Changed the `ProductComment` table
  [+] Added index on columns (productId)
  [+] Added index on columns (userId)
  [+] Added foreign key on columns (productId)
  [+] Added foreign key on columns (userId)

[*] Changed the `ProductIngredient` table
  [+] Added index on columns (ingredientId)
  [+] Added foreign key on columns (ingredientId)
  [+] Added foreign key on columns (productId)

[*] Changed the `Recommendation` table
  [+] Added index on columns (userId)
  [+] Added index on columns (productId)
  [+] Added foreign key on columns (productId)
  [+] Added foreign key on columns (userId)

[*] Changed the `RecommendationIngredient` table
  [+] Added index on columns (recommendationId)
  [+] Added index on columns (ingredientId)
  [+] Added foreign key on columns (ingredientId)
  [+] Added foreign key on columns (recommendationId)

[*] Changed the `UserSkinType` table
  [+] Added foreign key on columns (skinTypeId)
  [+] Added foreign key on columns (userId)

[*] Changed the `Users` table
  [+] Added unique index on columns (email)

