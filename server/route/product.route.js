import { Router } from 'express'

import upload from '../middlewares/multer.js';

import auth from '../middlewares/auth.middleware.js';
import {
  createProduct,
  createProductRAMS,
  createProductSize,
  createProductWeight,
  deleteMultipleProducts,
  deleteProduct,
  deleteProductRAMS,
  deleteProductSize,
  deleteProductWeight,
  getAllFeaturedProducts,
  getAllProducts,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsByPrice,
  getAllProductsByRating,
  getAllProductsBySubCatId,
  getAllProductsBySubCatName,
  getAllProductsByThirdCatName,
  getAllProductsByThirdLevelCatId,
  getProduct,
  getProductRAMS,
  getProductRamsById,
  getProductsCount,
  getProductSize,
  getProductSizeById,
  getProductWeight,
  getProductWeightById,
  removeImageFromCloudinary,
  updateProduct,
  updateProductRAMS,
  updateProductSize,
  updateProductWeight,
  uploadBannerImages,
  uploadImages
} from '../controllers/product.controller.js';


const productRouter = Router();

productRouter.post('/uploadImages',auth,upload.array('images'), uploadImages);
productRouter.post('/uploadBannerImages',auth,upload.array('bannerImagesArr'), uploadBannerImages);
productRouter.post('/create',auth,createProduct);
productRouter.get('/getAllProducts',getAllProducts);
productRouter.get('/getAllProductsByCatId/:id',getAllProductsByCatId);
productRouter.get('/getAllProductsBySubCatId/:id',getAllProductsBySubCatId);
productRouter.get('/getAllProductsByCatName', getAllProductsByCatName);
productRouter.get('/getAllProductsBySubCatName', getAllProductsBySubCatName);
productRouter.get('/getAllProductsByThirdLavelCat/:id',getAllProductsByThirdLevelCatId);
productRouter.get('/getAllProductsByThirdLavelCatName',getAllProductsByThirdCatName);
productRouter.get('/getAllProductsByPrice',getAllProductsByPrice);
productRouter.get('/getAllProductsByRating',getAllProductsByRating);
productRouter.get('/getAllProductsCount',getProductsCount);
productRouter.get('/getAllFeaturedProducts',getAllFeaturedProducts);
productRouter.delete('/deleteMultiple', deleteMultipleProducts);
productRouter.delete('/:id',deleteProduct);

productRouter.get('/:id',getProduct);
productRouter.delete('/deleteImage',auth,removeImageFromCloudinary);
productRouter.put('/updateProduct/:id',auth,updateProduct);

productRouter.post('/ProductRAMS/create',auth,createProductRAMS);
productRouter.delete('/ProductRAMS/:id',deleteProductRAMS);
productRouter.put('/updateProductRAMS/:id',auth,updateProductRAMS);
productRouter.get('/productRAMS/get',getProductRAMS);
productRouter.get('/productRAMS/:id',getProductRamsById);


productRouter.post('/productWeight/create',auth,createProductWeight);
productRouter.put('/updateProductWeight/:id',auth,updateProductWeight);
productRouter.delete('/productWeight/:id',deleteProductWeight);
productRouter.get('/productWeight/get',getProductWeight);
productRouter.get('/productWeight/:id',getProductWeightById);

productRouter.post('/productSize/create',auth,createProductSize);
productRouter.delete('/productSize/:id',deleteProductSize);
productRouter.put('/updateProductSize/:id',auth,updateProductSize);
productRouter.get('/productSize/get',getProductSize);
productRouter.get("/productSize/:id", getProductSizeById);







export default productRouter;