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
  origin: 'http://localhost:5173', // React app URL
  credentials: true
}));

app.use(express.json());

app.use('/users', userRouter);
app.use('/skintype', skinTypeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
});