import { Router } from 'express'

// import upload from '../middlewares/multer.js';

import {  }  from '../controllers/product.controller.js';
import { addToCartItemController, deleteCartItemQtyController, getCartItemController, updateCartItemQtyController } from '../controllers/cart.controller.js';
import auth from '../middlewares/auth.middleware.js';

const cartRouter = Router();

cartRouter.post('/add',auth,addToCartItemController);
cartRouter.get('/get',auth,getCartItemController);
cartRouter.put('/update-qty',auth,updateCartItemQtyController);
cartRouter.delete('/delete-cart-item',auth,deleteCartItemQtyController);

export default cartRouter