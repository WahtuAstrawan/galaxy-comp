import express from 'express';
import {viewTransaction, addTransaction, destroyTransaction} from '../controllers/TransactionController.js';

const TransactionRouter = express.Router();

TransactionRouter.get("/", viewTransaction);
TransactionRouter.post("/add", addTransaction);
TransactionRouter.delete("/delete/:id", destroyTransaction);

export default TransactionRouter;