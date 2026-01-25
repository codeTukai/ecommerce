import { Router } from 'express';

import auth from '../middlewares/auth.middleware.js';

import upload from '../middlewares/multer.js';
import { addHomeSlider, deleteHomeSlider, deleteMultipleSlides, getHomeSlider, getSlides, removeImageFromCloudinary, updatedHomeSlider, uploadImages } from '../controllers/homeSlider.controller.js';

const homeSliderRouter = Router();

homeSliderRouter.post('/uploadImages', auth, upload.array('images'), uploadImages);
homeSliderRouter.post('/add', auth, addHomeSlider);
homeSliderRouter.get('/', getHomeSlider);
homeSliderRouter.get('/:id',  getSlides);
homeSliderRouter.delete('/deleteImage', auth,removeImageFromCloudinary);
homeSliderRouter.delete('/:id', auth,deleteMultipleSlides);
homeSliderRouter.delete('/:id', auth,deleteHomeSlider);
homeSliderRouter.put('/:id',auth,updatedHomeSlider);




export default homeSliderRouter;




