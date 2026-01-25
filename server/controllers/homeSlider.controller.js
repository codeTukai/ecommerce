import homeSliderModel from "../models/homeSlider.model.js";

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// utils/cloudinary.js

import dotenv from "dotenv";
import { error } from "console";
import HomeSliderModel from "../models/homeSlider.model.js";

dotenv.config(); // Load .env

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key:process.env.cloudinary_Config_api_key, 
  api_secret:process.env.cloudinary_Config_api_secret, 
  secure : true,
});


export async function uploadImages(req, res) {
  try {
    const images = req.files;
    let imageUrls = [];

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (const file of images) {
      const result = await cloudinary.uploader.upload(file.path, options);
      imageUrls.push(result.secure_url);
      fs.unlinkSync(file.path); // remove temp file
    }

    return res.status(200).json({
      images: imageUrls,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Image upload failed",
      error: true,
      success: false,
    });
  }
}


export async function addHomeSlider(req, res) {
  try {
    const { images, bannerTitleName } = req.body;

    // Validate images
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        message: "Images must be a non-empty array.",
        error: true,
        success: false,
      });
    }

    // Validate bannerTitleName
    if (!bannerTitleName || bannerTitleName.trim() === "") {
      return res.status(400).json({
        message: "bannerTitleName is required.",
        error: true,
        success: false,
      });
    }

    // Create new slider
    const newSlider = new HomeSliderModel({
      images,
      bannerTitleName,
    });

    console.log("req.body =>", req.body);

    const saved = await newSlider.save();

    return res.status(201).json({
      message: "Slider created successfully",
      success: true,
      slider: saved,
    });
  } catch (error) {
    console.error("Error in addHomeSlider:", error);
    return res.status(500).json({
      message: error.message || "Slider creation failed",
      error: true,
      success: false,
    });
  }
}



export async function getHomeSlider(request, response) {
    try {

        const slides = await homeSliderModel.find();
        if (!slides) {
            return response.status(404).json({
                message: "slides not found",
                error: true,
                success: false
        })
            
        
        }

         return response.status(200).json({
                error: false,
                success: true,
                data: slides
        })
            
        
    } catch (error) {
         return res.status(500).json({
      message: error.message || "Slider creation failed",
      error: true,
      success: false,
    });
    }
}



export async function getSlides(request, response) {
    try {
        const slides = await homeSliderModel.find();
        const slideMap = {};

        slides.forEach(cat => {
            slideMap [cat._id] = { ...cat._doc, children: [] };
        });

        const rootSlides = [];

        categories.forEach(cat => {
            if (cat.parentId) {
                slideMap[cat.parentId].children.push(slideMap[cat._id]);
            } else {
                rootSlides.push(slideMap[cat._id]);
            }
            });

        return response.status(200).json({
            error: false,
            success: true,
            data: rootSlides
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
    })
        
    }

}

export async function removeImageFromCloudinary(request, response) {
  const imgUrl = request.query.img;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];
  const imageName = image.split(".")[0];

  if(imageName){
    const res = await cloudinary.uploader.destroy(
    imageName,
    (error, result) => {
        // console.log(error, res)
    }
  );

  if (res) {
    response.status(200).send(res);
  }

  }

  
}


export async function deleteHomeSlider(request, response) {
  try {
    const slide = await homeSliderModel.findById(request.params.id);

    if (!slide) {
      return response.status(404).json({
        message: "Slide not found!",
        success: false,
        error: true
      });
    }

    // Remove all images from Cloudinary
    for (const imgUrl of slide.images) {
      const urlArr = imgUrl.split("/");
      const image = urlArr[urlArr.length - 1];
      const imageName = image.split(".")[0];

      if (imageName) {
        await cloudinary.uploader.destroy(imageName);
      }
    }

    // Delete from DB
    const deletedSlide = await homeSliderModel.findByIdAndDelete(request.params.id);

    return response.status(200).json({
      success: true,
      error: false,
      message: "Slide deleted successfully!",
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "An error occurred while deleting the slide.",
      success: false,
      error: true
    });
  }
}


export async function updatedHomeSlider(req, res) {
  try {
    const { images = [] } = req.body;

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        message: "Images must be a non-empty array.",
        success: false,
        error: true,
      });
    }

    const updated = await homeSliderModel.findByIdAndUpdate(
      req.params.id,
      { images },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Slider not found or update failed.",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Slider updated successfully.",
      success: true,
      error: false,
      slider: updated,
    });

  } catch (error) {
    console.error("Update Slider Error:", error.message);
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
      error: true,
    });
  }
}




export async function deleteMultipleSlides(req, res) {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      message: "Invalid request. 'ids' must be a non-empty array.",
      error: true,
      success: false,
    });
  }

  try {
    // Fetch all matching slides
    const slides = await homeSliderModel.find({ _id: { $in: ids } });

    const deleteImagePromises = [];

    for (const slide of slides) {
      if (!slide || !Array.isArray(slide.images)) continue;

      for (const imgUrl of slide.images) {
        try {
          // Extract Cloudinary public_id
          const parts = imgUrl.split("/");
          const image = parts[parts.length - 1];
          const publicId = image.split(".")[0]; // Remove extension

          if (publicId) {
            deleteImagePromises.push(cloudinary.uploader.destroy(publicId));
          }
        } catch (err) {
          console.warn("Image deletion error (ignored):", imgUrl, err.message);
        }
      }
    }

    // Wait for all Cloudinary deletions to complete
    await Promise.all(deleteImagePromises);

    // Remove slide entries from DB
    await homeSliderModel.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: "Slides deleted successfully.",
      success: true,
      error: false,
    });

  } catch (err) {
    console.error("Delete Slides Error:", err);
    return res.status(500).json({
      message: err.message || "Server error during deletion.",
      success: false,
      error: true,
    });
  }
}
