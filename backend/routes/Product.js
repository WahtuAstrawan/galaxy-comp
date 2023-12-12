import express from 'express';
import { viewProduct, addProduct, editProduct, destroyProduct} from '../controllers/ProductController.js';

const ProductRouter = express.Router();

ProductRouter.get("/", viewProduct);
ProductRouter.post("/add", addProduct);
ProductRouter.put("/edit/:id", editProduct);
ProductRouter.delete("/delete/:id", destroyProduct);

export default ProductRouter;