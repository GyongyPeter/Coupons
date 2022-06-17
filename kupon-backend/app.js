import express from 'express';
const app = express();

import cors from 'cors';
app.use(express.json());
app.use(cors());

import couponRoutes from './routes/couponRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import './db/db.js';

app.use('/coupon', couponRoutes)
app.use('/company', companyRoutes)
app.listen(8000, () => {
    console.log(`App listening on port 8000`);
  })