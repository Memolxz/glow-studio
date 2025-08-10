import "dotenv/config"

import express from 'express';

import { userRouter } from './routers/user-router';
import { skinTypeRouter } from './routers/skintype-router';
import { registerRouter } from './routers/register-router';
import { loginRouter } from './routers/login-router';
import productRouter from './routers/product-router';
import categoryRouter from './routers/category-router';

const app = express()
app.use(express.json());

app.use('/users', userRouter);
app.use('/skintype', skinTypeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
});