import express from 'express';
import {viewTransaction, addTransaction, destroyTransaction, filterTransaction} from '../controllers/TransactionController.js';

const TransactionRouter = express.Router();

TransactionRouter.get("/", viewTransaction);
TransactionRouter.get("/filter", filterTransaction);
TransactionRouter.post("/add", addTransaction);
TransactionRouter.delete("/delete/:id", destroyTransaction);

export default TransactionRouter;