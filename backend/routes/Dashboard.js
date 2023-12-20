import express from 'express';
import { viewIncome, viewTrend } from '../controllers/DashboardController.js';
import { filterProduct, viewProduct } from '../controllers/ProductController.js';
import { isAdmin, verifyAuth } from '../controllers/LoginController.js';

const DashboardRouter = express.Router();

DashboardRouter.get("/trend", viewTrend);
DashboardRouter.get("/all", viewProduct);
DashboardRouter.get("/filter", filterProduct);
DashboardRouter.get("/income", verifyAuth, viewIncome);

export default DashboardRouter;