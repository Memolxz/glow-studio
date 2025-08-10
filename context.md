# Glow Studio - Context for Development

## 📋 Project Overview

**Glow Studio** is a skincare recommendation web application that provides personalized product suggestions based on user's skin type analysis. The platform connects users with real skincare products through API integration and guides them to official purchase pages.

### Core Concept
- Users create accounts and specify their skin types (atopic, acne-prone, etc.)
- System analyzes user's skin profile and recommends suitable products
- Products are categorized (serums, creams, facial cleansers, etc.)
- Each recommendation includes explanation of why it was selected and usage instructions
- Users can click products to be redirected to official purchase pages

## 🏗️ Current Architecture

### Backend (Node.js + Express + TypeScript)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with access/refresh tokens
- **Password Security**: bcrypt for hashing
- **Task Scheduling**: node-cron for automated cleanup

### Database Schema (Prisma)
```
Users
├── id, name, email, password, isAdmin, deletedAt

SkinType
├── id, name

UserSkinType (Many-to-Many)
├── userId, skinTypeId

Ingredients
├── id, name

IngredientEffect
├── ingredientId, skinTypeId, Effect (GOOD/BAD)
```

### Current API Endpoints

#### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /login/refresh-token` - Refresh access token

#### Users
- `GET /users` - Get all users
- `GET /users/:mail` - Get user by email
- `GET /users/deleted/:mail` - Get deleted user
- `PUT /users/:id` - Update user (full)
- `PATCH /users/:id` - Update user (partial)
- `DELETE /users/:id` - Soft delete user
- `PATCH /users/restore/:id` - Restore deleted user
- `POST /users/skintype/:id` - Assign skin type to user
- `GET /users/skintype/:id` - Get user's skin types

#### Skin Types
- `GET /skintype` - Get all skin types
- `POST /skintype` - Create skin type
- `PUT /skintype/:id` - Update skin type (full)
- `PATCH /skintype/:id` - Update skin type (partial)
- `DELETE /skintype/:id` - Delete skin type

### Middleware
- **JWT Authentication**: `jwtAuthMiddleware`
- **Admin Authorization**: `isAdminMiddleware`

## 🎯 What's Missing / Next Steps

### 1. Product Management System
```typescript
// Suggested models to add:

model ProductCategory {
  id Int @id @default(autoincrement())
  name String // "serums", "cremas", "limpieza facial", etc.
  products Product[]
}

model Product {
  id Int @id @default(autoincrement())
  name String
  brand String
  description String
  official_url String
  image_url String?
  price Decimal?
  categoryId Int
  
  category ProductCategory @relation(fields: [categoryId], references: [id])
  productIngredients ProductIngredient[]
  recommendations Recommendation[]
}

model ProductIngredient {
  productId Int
  ingredientId Int
  
  product Product @relation(fields: [productId], references: [id])
  ingredient Ingredient @relation(fields: [ingredientId], references: [id])
  
  @@id([productId, ingredientId])
}

model Recommendation {
  id Int @id @default(autoincrement())
  userId Int
  productId Int
  reason String // Why this product was recommended
  created_at DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
  product Product @relation(fields: [productId], references: [id])
}
```

### 2. Recommendation Service
Create a service that analyzes user skin types against product ingredients:

```typescript
// services/recommendation-service.ts
class RecommendationService {
  async getRecommendationsForUser(userId: number): Promise<ProductRecommendation[]>
  async analyzeProductSuitability(productId: number, userSkinTypes: SkinType[]): Promise<SuitabilityScore>
  async explainRecommendation(productId: number, userId: number): Promise<string>
}
```

### 3. Product API Routes
```typescript
// routers/product-router.ts
- GET /products - Get all products (with filters)
- GET /products/:id - Get product details
- POST /products - Create product (admin only)
- PUT /products/:id - Update product (admin only)
- DELETE /products/:id - Delete product (admin only)
- GET /products/recommendations/:userId - Get recommendations for user

// routers/category-router.ts
- GET /categories - Get all categories
- POST /categories - Create category (admin only)
```

### 4. Frontend Requirements
The current project is backend-only. You'll need:
- **Frontend Framework**: React/Vue/Angular
- **Authentication**: JWT token management
- **User Interface**: 
  - Registration/Login forms
  - Product catalog with filters
  - User profile with skin type selection
  - Product detail pages
  - Recommendation explanations

### 5. External API Integration
For real products, consider integrating with:
- Beauty APIs (Sephora, Ulta, etc.)
- Product databases
- Ingredient analysis services

## 🔧 Development Setup

### Environment Variables Needed
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
```

### Key Scripts
```bash
pnpm run dev          # Development server
pnpm run build        # Build for production
pnpm run db:migrate   # Run database migrations
pnpm run db:generate  # Generate Prisma client
```

## 🚀 Immediate Next Actions

1. **Complete the recommendation algorithm**
   - Implement product-ingredient analysis
   - Create scoring system based on skin type compatibility

2. **Add product management**
   - Create product CRUD operations
   - Implement category system
   - Add admin interfaces for product management

3. **Build recommendation engine**
   - Algorithm to match users with products
   - Explanation generation for recommendations

4. **Frontend development**
   - User authentication flows
   - Product browsing and filtering
   - User profile management

5. **API integration**
   - Connect to external product databases
   - Real-time product data updates

## 🏗️ Architecture Considerations

### Scalability
- The current architecture supports horizontal scaling
- Consider Redis for caching recommendations
- Database indexing on frequently queried fields

### Security
- JWT tokens properly implemented
- Password hashing with bcrypt
- Input validation needed on all endpoints
- Rate limiting recommended

### Future Expansion
- Microservices architecture for different domains
- Machine learning for better recommendations
- Real-time user behavior tracking
- Integration with e-commerce platforms

## 📝 Notes from Developer
- Admin users can create other users and admins
- Soft delete implemented for users (deletedAt field)
- Automated cleanup of deleted users after 30 days
- Single login page for both users and admins
- Frontend will handle role-based UI differences
- Icons available from Lucide (https://lucide.dev/)

## 🔗 Key Dependencies
- `@prisma/client` - Database ORM
- `express` - Web framework
- `jsonwebtoken` - JWT authentication
- `bcrypt` - Password hashing
- `node-cron` - Task scheduling
- `typescript` - Type safety

This project is designed to be expandable and maintainable for future growth into a comprehensive skincare recommendation platform.