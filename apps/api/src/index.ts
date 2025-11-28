import "dotenv/config"
import cors from 'cors';
import express from 'express';

import { userRouter } from './routers/user-router';
import { skinTypeRouter } from './routers/skintype-router';
import { registerRouter } from './routers/register-router';
import { loginRouter } from './routers/login-router';
import { productRouter } from './routers/product-router';
import { adminRouter } from './routers/admin-router';
import "./cron/delete-user-cron";

const app = express()

// CORS configuration
app.use(cors({
  origin: process.env.VERCEL_UI_URL || 'http://localhost:5173', // React app URL
  credentials: true
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Glow Studio API',
    version: '1.0.0',
    status: 'running'
  });
});

app.use('/users', userRouter);
app.use('/skintype', skinTypeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
});