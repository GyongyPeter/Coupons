import express from 'express';
const companyRouter = express.Router();
import { getCompanies, createCompany, updateCompany, deleteCompany, findCouponByCompany } from '../controllers/companyController.js';
companyRouter.get('/', getCompanies);
companyRouter.post('/', createCompany);
companyRouter.patch('/:id', updateCompany);
companyRouter.delete('/:id', deleteCompany);
companyRouter.get('/findCoupon/:id', findCouponByCompany);
export default companyRouter;