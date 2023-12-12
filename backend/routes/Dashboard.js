import express from 'express';
import { viewTrend } from '../controllers/DashboardController.js';

const DashboardRouter = express.Router();

DashboardRouter.get("/trend", viewTrend);

export default DashboardRouter;