import "dotenv/config"

import express from 'express';

import { userRouter } from './routers/userRouter';
// import { userSkinTypeRouter } from './routers/userSkinTypeRouter';
import { skinTypeRouter } from './routers/skinTypeRouter';
import { registerRouter } from './routers/registerRouter';

const app = express()

app.use(express.json())

app.use('/users', userRouter)
app.use('/skinType', skinTypeRouter)
app.use('/register', registerRouter)

// app.use('/userSkinType', userSkinTypeRouter)

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
})