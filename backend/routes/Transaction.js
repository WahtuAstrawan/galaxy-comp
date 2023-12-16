import express from 'express';
import {viewTransaction, addTransaction, destroyTransaction, filterTransaction} from '../controllers/TransactionController.js';
import { verifyAuth } from '../controllers/LoginController.js';

const TransactionRouter = express.Router();

TransactionRouter.get("/", verifyAuth, viewTransaction);
TransactionRouter.get("/filter", verifyAuth, filterTransaction);
TransactionRouter.post("/add", verifyAuth, addTransaction);
TransactionRouter.delete("/delete/:id", verifyAuth, destroyTransaction);

export default TransactionRouter;