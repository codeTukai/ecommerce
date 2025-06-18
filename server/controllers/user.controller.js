import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
// import bcrypt from 'bcrypt';
import bcrypt from "bcrypt";

import jwt from 'jsonwebtoken';
import sendEmailFun from "../config/sendEmail.js"; // ✅ correct for default export

import verificationEmail from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import { v2 as cloudinary }  from 'cloudinary';

import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key:process.env.cloudinary_Config_api_key, 
  api_secret:process.env.cloudinary_Config_api_secret, 
  secure : true,
});



// ✅ Exported controller with correct params




export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    // ✅ Input validation
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Please provide name, email, and password",
        error: true,
        success: false,
      });
    }

    // ✅ Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return response.status(409).json({
        message: "User already registered with this email",
        error: true,
        success: false,
      });
    }

    // ✅ Generate OTP
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // ✅ Save user
    let newUser;
    try {
      newUser = new UserModel({
        name,
        email,
        password: hashPassword,
        otp: verifyCode,
        otpExpire: Date.now() + 10 * 60 * 1000, // 10 minutes
      });

      await newUser.save();
      console.log("✅ User saved successfully:", newUser.email);
    } catch (dbError) {
      console.error("❌ DB Save Error:", dbError.message);
      return response.status(500).json({
        message: "Failed to register user. Please try again later.",
        error: true,
        success: false,
      });
    }

    // ✅ Send verification email
    try {
     await sendEmailFun(email, "Verify your email", "", verificationEmail(name, verifyCode)); // wrong usage

      console.log("📧 Verification email sent to:", email);
    } catch (emailError) {
      console.error("❌ Email Sending Error:", emailError.message);
      // You might still let user proceed to verify
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY,
      { expiresIn: "10m" }
    );

    return response.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully. Please verify your email.",
      token,
    });

  } catch (error) {
    console.error("❌ Unexpected Server Error:", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
}






export async function verifyEmailController(request, response) {
  try {
    const { email, otp } = request.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    console.log("Received OTP:", otp);
    console.log("User OTP:", user.otp);
    console.log("OTP Expire:", user.otpExpire);

    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otpExpire && user.otpExpire > Date.now();

    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpire = null;
      await user.save();

      return response.status(200).json({
        error: false,
        success: true,
        message: "Email verified successfully"
      });
    }

    if (!isCodeValid) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "Invalid OTP"
      });
    }

    return response.status(400).json({
      error: true,
      success: false,
      message: "OTP expired"
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false
    });
  }
}



export async function loginUserController(request, response) {
  try {
    const { email, password } = request.body;

    // 🔍 Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // 🚫 Block unverified users
    if (!user.verify_email) {
      return response.status(403).json({
        message: "Your email is not verified. Please verify it first.",
        error: true,
        success: false,
      });
    }

    // 🔐 Compare passwords
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return response.status(400).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }

    // 🧾 Generate tokens
    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    // 💾 Save tokens and login time
    await UserModel.findByIdAndUpdate(user._id, {
      access_token: accesstoken,
      refresh_token: refreshToken,
      last_login_date: new Date(),
    });

    // 🍪 Set cookies
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // Optional: 7 days
    };

    response.cookie("accessToken", accesstoken, cookieOptions);
    response.cookie("refreshToken", refreshToken, cookieOptions);

    return response.status(200).json({
      message: "Login successful",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

  

 // Corrected logoutController.js



export async function logoutController(request, response) {
  try {
    const userId = request.userId;

    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    // ✅ Fixed function name: `clearCookie` (not `clearCookies`)
    response.clearCookie("accessToken", cookiesOptions);
    response.clearCookie("refreshToken", cookiesOptions);

    // ✅ Remove refresh_token from DB
    await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return response.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Logout failed",
      error: true,
      success: false,
    });
  }
}




var imagesArr = [];
export async function userAvatarController(request, response) {
  try {
    imagesArr = []; 

    const userId = request.userId; // set by auth middleware
    const image = request.files;
    



  const user = await UserModel.findOne({ _id: userId});


   if (!user) {
     return response.status(500).json({
      message: "User not found",
      error: true,
      success: false,
    });
  }
  
  const imgUrl = user.avatar;

  const urlArr = imgUrl.split("/");
  const avatar_image = urlArr[urlArr.length - 1];

  const imageName = avatar_image.split(".")[0];

  if (imageName) {
    const res = await cloudinary.uploader.destroy(
      imageName,
      (error, result)=>{

      }
    );
    
  }







  const userAvater = user.avatar;
  if (!user) {
     return response.status(500).json({
      message: "User not found",
      error: true,
      success: false,
    });
  }
  


    const options ={
      use_filename: true,
      unique: true,
      overwrite: false
    };

    for (let i = 0; i < image?.length; i++) {

      
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function(error, result){
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);

        
          
        }
      );
      
    }

    user.avatar = imagesArr[0];
    await user.save();

    return response.status(200).json({
      _id: userId,
      avtar: imagesArr[0] //
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}




export async function removeImageFromCloudinary(request, response) {
  try {
    const imgUrl = request.query.img;

    if (!imgUrl) {
      return response.status(400).json({
        message: "Image URL is required",
        error: true,
        success: false,
      });
    }

    const urlParts = imgUrl.split("/");
    const imageNameWithExt = urlParts[urlParts.length - 1]; // e.g. "filename_xyz.jpg"
    const publicId = imageNameWithExt.split(".")[0]; // remove extension

   

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return response.status(200).json({
        message: "Image deleted successfully",
        result,
        error: false,
        success: true,
      });
    } else {
      return response.status(404).json({
        message: "Image not found or already deleted",
        result,
        error: true,
        success: false,
      });
    }
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}





//update user


export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId; // From auth middleware
    const { name, email, mobile, password } = request.body;

    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      return response.status(400).json({
        message: "User not found. Update failed.",
        error: true,
        success: false,
      });
    }

    let verifyCode = "";
    let newEmail = userExist.email;
    let verifyEmail = userExist.verify_email;

    // 📨 If email is changed, set OTP and mark email as unverified
    if (email && email !== userExist.email) {
      verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      newEmail = email;
      verifyEmail = false;
    }

    // 🔐 If password provided, hash it
    let hashedPassword = userExist.password;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashedPassword = await bcryptjs.hash(password, salt);
    }

    // 🔄 Update user
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name || userExist.name,
        mobile: mobile || userExist.mobile,
        email: newEmail,
        password: hashedPassword,
        verify_email: verifyEmail,
        otp: verifyCode || null,
        otpExpire: verifyCode ? Date.now() + 10 * 60 * 1000 : null,
      },
      { new: true }
    );

    // 📧 Send OTP email if email was updated
    if (verifyCode) {
      await sendEmailFun(
        newEmail,
        "Verify your email - Ecommerce App",
        "",
        verificationEmail(name || userExist.name, verifyCode)
      );
    }

    return response.json({
      message: "User updated successfully",
      error: false,
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}



//forgot password

export async function forgotPasswordController (request, response) {
  try {
  const { email } = request.body
  
  const user = await UserModel.findOne({ email:email })

  if(!user) {
    return response.status(400).json({
        message: "Email not available please check your mail and put the right mail id",
        error: true,
        success: false

      })
    }

    else{
         let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

         user.otp = verifyCode;
         user.otpExpires = Date.now() + 600000;

         await user.save(0);

    await sendEmailFun({
          sendTo: email,
          subject: "Verify email from Ecommerce App",
          text: "",
          html: verificationEmail(user.name, verifyCode)
        })

        return response.json({
        message: "check your email",
        error: false,
        success: true,
      })
 
    }


  }  catch (error) {
    return response.status(500).json({
        message: error.message || "Internal server error",
        error: true,
        success: false 
    })

}
}



//otp send to mail and verify
export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;

    // Check for required fields
    if (!email || !otp) {
      return response.status(400).json({
        message: "Provide required fields: email, otp.",
        error: true,
        success: false
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.status(400).json({
        message: "User not found",
        error: true,
        success: false
      });
    }

    // Check OTP match
    if (user.otp !== otp) {
      return response.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false
      });
    }

    // Check OTP expiry
    const now = Date.now(); // in ms
    const expiresAt = new Date(user.otpExpires).getTime(); // convert to ms

    if (expiresAt < now) {
      return response.status(400).json({
        message: "OTP is expired",
        error: true,
        success: false
      });
    }

    // Mark OTP as used
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    return response.status(200).json({
      message: "OTP verified successfully",
      error: false,
      success: true
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false
    });
  }
}


//reset password





export async function resetPasswordController(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Step 1: Check all required fields
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Provide required fields email, newPassword, confirmPassword",
        error: true,
        success: false,
      });
    }

    // Step 2: Passwords must match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        error: true,
        success: false,
      });
    }

    // Step 3: Password validation (optional)
    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        error: true,
        success: false,
      });
    }

    // Step 4: Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Step 5: Hash password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP info for security
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
}

//refresh token




export async function refreshToken(request, response) {
  try {
    // Try getting the token from cookies or Authorization header
    const cookieToken = request.cookies?.refreshToken;
    const authHeader = request.headers?.authorization;
    const headerToken = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const refreshToken = cookieToken || headerToken;

    if (!refreshToken) {
      return response.status(401).json({
        message: "Invalid or missing refresh token",
        error: true,
        success: false
      });
    }

    // Verify the refresh token
    const verifyToken = jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
    if (!verifyToken) {
      return response.status(401).json({
        message: "Token is expired or invalid",
        error: true,
        success: false
      });
    }

    const userId = verifyToken._id;
    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    };

    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.json({
      message: "New access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken
      }
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false
    });
  }
}

//get login user details


export async function userDetails(request, response){
    try{
        const userId = request.userId
        const user = await UserModel.findById(userId).select('-password -refresh_token')
        
        return response.json({
            message: 'user details',
            data: user,
            error: false,
            success: true
        })

    } catch(error) {
          return response.status(500).json({
          message: "Something is wrong",
          error: true,
          success: false
        })
      }
    }
