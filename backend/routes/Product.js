import express from 'express';
import { viewProduct, addProduct, editProduct, destroyProduct, filterProduct} from '../controllers/ProductController.js';

const ProductRouter = express.Router();

ProductRouter.get("/", viewProduct);
ProductRouter.get("/filter", filterProduct);
ProductRouter.post("/add", addProduct);
ProductRouter.put("/edit/:id", editProduct);
ProductRouter.delete("/delete/:id", destroyProduct);

export default ProductRouter;