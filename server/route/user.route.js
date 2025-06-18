import { Router } from 'express';
import {
    forgotPasswordController,
  loginUserController,
  logoutController,
  refreshToken,
  registerUserController,
  removeImageFromCloudinary,
 
  resetPasswordController,
  updateUserDetails,
  userAvatarController,
  userDetails,
  verifyEmailController,
  verifyForgotPasswordOtp,
} from '../controllers/user.controller.js';

import upload from '../middlewares/multer.js';
import auth from '../middlewares/auth.middleware.js';


const userRouter = Router();

// User registration
userRouter.post('/register', registerUserController);

// Email verification
userRouter.post('/verifyEmail', verifyEmailController);

// User login
userRouter.post('/login', loginUserController);

// User logout (protected route)
userRouter.get('/logout', auth, logoutController);

// Upload user avatar (protected + multipart file upload)
userRouter.put('/user-avatar', auth, upload.array('avatar'), userAvatarController);
userRouter.delete('/deleteImage', auth,removeImageFromCloudinary);
userRouter.put('/:id', auth,updateUserDetails);
userRouter.post('/forgot-password',forgotPasswordController);
userRouter.post('/verify-forgot-password-otp',verifyForgotPasswordOtp);
userRouter.post('/reset-password',resetPasswordController);
userRouter.post('/refresh-token',refreshToken);
userRouter.get('/user-details',auth,userDetails);



export default userRouter;
