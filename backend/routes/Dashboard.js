import express from 'express';
import { viewTrend } from '../controllers/DashboardController.js';
import { filterProduct, viewProduct } from '../controllers/ProductController.js';

const DashboardRouter = express.Router();

DashboardRouter.get("/trend", viewTrend);
DashboardRouter.get("/all", viewProduct);
DashboardRouter.get("/filter", filterProduct);

export default DashboardRouter;