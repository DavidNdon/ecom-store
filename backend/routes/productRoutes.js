import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';

export const router = express.Router();

router.get('/getproducts', getProducts );
router.get('/:id', getProduct );
router.post('/createproduct', createProduct );
router.put('/:id', updateProduct );
router.delete('/:id', deleteProduct);