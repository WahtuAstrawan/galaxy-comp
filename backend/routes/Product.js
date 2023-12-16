import express from 'express';
import { viewProduct, addProduct, editProduct, destroyProduct, filterProduct} from '../controllers/ProductController.js';
import { verifyAuth, isAdmin } from '../controllers/LoginController.js';

const ProductRouter = express.Router();

ProductRouter.get("/", verifyAuth, viewProduct);
ProductRouter.get("/filter", verifyAuth, filterProduct);
ProductRouter.post("/add", verifyAuth, isAdmin, addProduct);
ProductRouter.put("/edit/:id", verifyAuth, isAdmin, editProduct);
ProductRouter.delete("/delete/:id", verifyAuth, isAdmin, destroyProduct);

export default ProductRouter;